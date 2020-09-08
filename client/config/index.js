/**
 * 公共配置文件
 */
import $config from '../../config'
let test = 'http://39.98.241.29:4000'

const configDict = {
  development: {
    baseURL: test,
  },
  production: {
    baseURL: process.env.VUE_APP_BASE_API,
  },
}

const currentConfigKey = process.env.NODE_ENV
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'development'

const configObj = {
  isDevelop: isDev || isTest,
  ...configDict[currentConfigKey],
  // h5模式宽高
  canvasH5Width: 375,
  canvasH5Height: 644,
}

export default configObj
