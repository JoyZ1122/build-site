<template>
  <div>
    <el-form-item label="请输入视频地址：" size="mini">
      <el-input type="text" v-model="videodata.videoUrl"></el-input>
    </el-form-item>
    <el-form-item label="请上传视频地址：" size="mini">
      <el-upload
        action="#"
        accept="mp4, ogg, flv"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :http-request="multipartUpload"
        ref="uploadone"
      >
        <el-button size="mini" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item >
    <el-form-item label="请上传视频封面：" size="mini">
      <el-upload
        ref="uploadtwo"
        action="#"
        accept="jpg, png, gif"
        :show-file-list="false"
        :before-upload="beforeUploadImage"
        :http-request="multipartUploadImage"
      >
        <el-button size="mini" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
  </div>
</template>

<script>
import { ossUpload } from "@client/utils/ossUpload";
import MD5 from "js-md5";
export default {
  name: "attr-qk-videodata",
  props: {
    videodata: {
      type: Object,
      default() {
        return {
          videoUrl: null,
          videoImage: null
        };
      },
    },
  },
  data() {
    return {
      video:{
        videoUrl: null,
        videoImage: null
      }
    };
  },
  watch:{
    video:{
      handler(newdat){
				this.$emit('update:videodata', newdat)
      }
    }
  },
  mounted() {
    this.video = this.videodata;
  },
  methods: {
    beforeUpload(file) {
      if (["video/mp4", "video/ogg", "video/flv"].indexOf(file.type) == -1) {
        this.$message.error("请上传正确的视频格式！");
        return false;
      }
    },
    async multipartUpload(file) {
      const httpUrl = "//mum-landingpage-oss.mumway.com/";
      let fileName = null;
      const pageId = this.$route.query.id;
      const loading = this.$loading({
        lock: true,
        text: "正在上传",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      const lastDian = file.file.name.lastIndexOf(".");
      const fName = file.file.name.substr(0, lastDian);
      const lName = file.file.name.substr(lastDian);
      const md5Name = `${MD5(`${pageId}${fName}`)}${lName}`;
      const res = await ossUpload({
        moduleName: pageId,
        bucketType: 2,
        type: "video",
        fileName: md5Name,
        file: file.file,
        progress: (num) => {
          loading.text = '正在上传('+num+'%)';
        },
      });
      fileName = httpUrl + res.name;
      this.video.videoUrl = fileName;
      let type = 'video';
      let imageName = '';
      this.saveImageList(pageId,fileName,type,imageName);
      loading.close();
      this.$refs.uploadone.close();
    },
    beforeUploadImage(file) {
      const isLt3M = file.size / 1024 / 1024 < 2;
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      return isLt3M;
    },
    async multipartUploadImage(file) {
      const httpUrl = "//mum-landingpage-oss.mumway.com/";
      let fileName = null;
        const pageId = this.$route.query.id;
      const loading = this.$loading({
        lock: true,
        text: "正在上传",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      const lastDian = file.file.name.lastIndexOf(".");
      const fName = file.file.name.substr(0, lastDian);
      const lName = file.file.name.substr(lastDian);
      const md5Name = `${MD5(`${pageId}${fName}`)}${lName}`;
      const res = await ossUpload({
        moduleName: pageId,
        bucketType: 2,
        type: "image",
        fileName: md5Name,
        file: file.file,
        progress: (num) => {
          loading.text = '正在上传('+num+'%)';
        },
      });
      fileName = httpUrl + res.name;
      this.video.videoImage = fileName;
      this.saveImageList(pageId,'','image',fileName);
      loading.close();
      this.$refs.uploadtwo.close();
    },
    saveImageList(data,videoName,type,imageName='') {
      let query = {
        page_id: data,
        url: videoName,
        type: type,
        coverimage: imageName
      };
      this.$axios.post("/person/updateImages", query).then((res) => {
        this.$message({
          message: '上传成功',
          type: 'success'
        });
      });
    },
  },
};
</script>

<style scoped>
</style>
