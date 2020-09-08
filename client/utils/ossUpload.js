import OSS from 'ali-oss'
import SaasLocalStorage from './localStoage'
import axios from 'axios'
async function getOssAccesstoken() {
  let data = await axios.get('//test-saas-apis.mumway.com/api/utils/v1/oss_accesstoken/');
  SaasLocalStorage.set('ossAccesstoken', data.data)
  return data.data
}

async function OssAccesstoken() {
  if (SaasLocalStorage.get('ossAccesstoken')) {
    const time = new Date().getTime()
    const objJson = SaasLocalStorage.get('ossAccesstoken')
    return objJson.time && (time - objJson.time) < (1000 * 60 * 60) ? objJson.data : await getOssAccesstoken()
  } else {
    return await getOssAccesstoken()
  }
}

async function getConfig(bucketType) {
  const qurey = await OssAccesstoken()
  let bucketName = 'mum-landingpage'
  return {
    region: "oss-cn-zhangjiakou",
    accessKeyId: qurey.AccessKeyId,
    accessKeySecret: qurey.AccessKeySecret,
    bucket: bucketName,
    stsToken: qurey.SecurityToken
  }
}

function error(name, val) {
  if (!val) {
    Promise.reject(new Error(`${name} Can not be empty`))
    return true
  }
  return false
}

export async function ossUpload({
  bucketType = 1,
  moduleName,
  type,
  fileName,
  file,
  progress
}) {

  // if (error('moduleName', moduleName)) return
  if (error('type', type)) return
  if (error('fileName', fileName)) return
  if (error('file', file)) return
  let data =await getConfig(bucketType);
  const client = new OSS(data)
  const day = new Date()
  return await client.multipartUpload(`${moduleName}/${type}/${day.getFullYear()}${('0' + (day.getMonth() + 1)).slice(-2)}/${day.getTime()+ fileName}`, file, {
    progress: p => {
      if (progress) {
        progress(Math.ceil(p * 100))
      }
    }
  })
}

export async function ossDelete({
  bucketType = 1,
  fileName
}) {
  if (error('fileName', fileName)) return
  const client = new OSS(await getConfig(bucketType))
  return await client.delete(fileName)
}

export async function ossGetUrl({
  bucketType = 2,
  fileName,
  expires
}) {
  if (error('fileName', fileName)) return
  const client = new OSS(await getConfig(bucketType))
  const config = {}
  if (expires) {
    config.expires = expires
  }
  return client.signatureUrl(fileName, config)
}