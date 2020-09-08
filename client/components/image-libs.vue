<template>
  <el-dialog
    class="components-image-libs-wrapper"
    title="我的图片"
    :visible.sync="dialogVisible"
    width="600px"
  >
    <div class="components-image-libs">
      <div class="image-lib-side-bar"></div>
      <div class="image-lib-inner">
        <div class="image-lib-btn">
          <el-upload
            action="#"
            :before-upload="beforeUpload"
            accept="jpg, png, gif"
            :show-file-list="false"
            :http-request="multipartUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip marginL20">只能上传jpg/png/gif文件，且不超过2M</span>
          </el-upload>
        </div>
        <ul class="image-list-wrapper" v-if="imageList.length">
          <li
            class="image-item"
            v-for="(item, index) in imageList"
            :key="index"
            @click="handleImageClick(item.url)"
          >
            <img :src="item.url" alt />
          </li>
        </ul>
        <div class="padding60 text-center gray" v-else>暂无数据</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import $bus from "@client/eventBus";
import { ossUpload } from "../utils/ossUpload";
import MD5 from "js-md5";
export default {
  name: "image-libs",
  data() {
    return {
      dialogVisible: false,
      uploading: false,
      hasLoadData: false,
      imageList: [],
      selectId: "",
    };
  },
  created() {
    $bus.$on("show-select-image", (selectId) => {
      this.dialogVisible = true;
      this.selectId = selectId;
    });
  },
  watch: {
    dialogVisible(val) {
      if (val && !this.uploading) {
      const pageId = this.$route.query.id;
        this.getMyImages(pageId);
      }
    },
  },
  methods: {
    beforeUpload(file) {
      const isLt3M = file.size / 1024 / 1024 < 2;
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      //   this.multipartUpload(file);
      return isLt3M;
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
        type: "image",
        fileName: md5Name,
        file: file.file,
        progress: (num) => {
          this.uploadSchedule = num;
        },
      });
      fileName = httpUrl + res.name;
      this.saveImageList(pageId,fileName);
      this.uploadSchedule = 0;
      loading.close();
    },
    saveImageList(data,fileName) {
      let query = {
        page_id: data,
        url: fileName,
        type: 'image'
      };
      this.$axios.post("/person/updateImages", query).then((res) => {
        this.$message({
          message: '上传成功',
          type: 'success'
        });
        this.getMyImages(data);
      });
    },
    getMyImages(val) {
      this.hasLoadData = true;   
      this.$axios.get(`/person/images?page_id=${val}&type=image`).then((res) => {
        this.imageList = res.body || [];
      });
    },
    /**
     * 点击图片
     * @param url
     */
    handleImageClick(url) {
      $bus.$emit("select-image", this.selectId, url);
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.image-list-wrapper {
  display: flex;
  height: 400px;
  padding-top: 20px;
      flex-wrap: wrap;
    overflow-y: auto;
    // background: #eee 50% / contain no-repeat;
  li {
    width: 120px;
    height: 120px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
    transition: all 0.28s;
    margin-bottom: 10px;
    border: 1px solid #eee;
    &:hover {
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.16);
      transform: translate3d(0, -2px, 0);
    }
    &:not(:nth-child(4n)){
      margin-right: 10px;
    }
    img {
      display: inline-block;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
<style lang="scss">
.components-image-libs-wrapper {
  .el-dialog__body {
    padding: 0 20px 20px;
  }
}
</style>
