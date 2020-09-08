<template>
  <div class="success_pop" v-if="showSuccessPop">
    <div class="success-info">
      <img
        class="success-img"
        src="https://static-mumway.oss-cn-zhangjiakou.aliyuncs.com/NetworkFrontEnd/qhq/xiaoshiguaung/success.png"
        alt
      />
      <div class="title">提交成功</div>
      <div class="tip">稍后好孕顾问会与您电话沟通</div>
      <div class="know" @click="successHandle">我知道了</div>
    </div>
  </div>
</template>
<script>
import vueobj from '@client/common/js/vueobj.js'
export default {
  name:'QkSubmitsuccess',
  data(){
    return {
      showSuccessPop:false,
    }
  },
  mounted(){
    vueobj.$on('successPopSHow',()=>{
      this.showSuccessPop = true;
    });
  },
  methods:{
    successHandle(){
      this.showSuccessPop = false
    }
  }
}
</script>
<style scoped lang="scss">
.success_pop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;

  .success-info {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 10px;
    margin: auto;
    width: 5.33333rem;
    height: 5.33333rem;
    background-color: #fff;
    border-radius: 0.26667rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .success-img {
      max-width: 2rem;
      // height: 2rem;
      margin: 0.28rem auto 0.13333rem;
    }

    .title {
      font-size: 0.42667rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #ec576b;
      margin-bottom: 0.25333rem;
    }

    .tip {
      font-size: 0.34667rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #666666;
      margin-bottom: 0.38667rem;
    }

    .know {
      margin: 0 0.93333rem;
      text-align: center;
      width: 3.46667rem;
      height: 0.93333rem;
      line-height: 0.93333rem;
      font-size: 0.42667rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: white;
      background: linear-gradient(-2deg, #ee7354, #eb4e73);
      -webkit-box-shadow: 0.04rem 0.06667rem 0.21333rem 0
        rgba(235, 78, 115, 0.6);
      box-shadow: 0.04rem 0.06667rem 0.21333rem 0 rgba(235, 78, 115, 0.6);
      border-radius: 0.46667rem;
    }
  }
}
</style>