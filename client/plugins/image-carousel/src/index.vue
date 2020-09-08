<!--test.vue-->
<template>
  <div class="qk-image-carsousel" style="height:100%;">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange" v-if="isreload">
      <van-swipe-item v-for="(item,index) in imageSrcList" :key="index">
        <img class="image-carsousel-image"  :src="item" alt />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator" :style="{bottom:indicatorset.bottom+'px',right:indicatorset.right+'px'}">
          <ul>
            <li :style="{background:current==index?indicatorset.color:'#ccc',width:indicatorset.width+'px',height:indicatorset.width+'px',}" v-for="(item,index) in imageSrcList" :key="index+'diro'"></li>
          </ul>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "QkImageCarousel", // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  props: {
    indicatorset:{
      type:Object,
      default(){
        return {
          width: 8,
          bottom: 10,
          right: 10,
          color: "#f755ad",
        }
      }
    },
    imageSrcList: {
      type: Array,
      default: () => {
        return [
          "//static-mumway.oss-cn-zhangjiakou.aliyuncs.com/NetworkFrontEnd/ljs/bbs/banner1_1.png",
          "//static-mumway.oss-cn-zhangjiakou.aliyuncs.com/NetworkFrontEnd/ljs/bbs/banner1_2.png"
        ];
      }
    },
    interval: {
      type: Number,
      default: 2500
    }
  },
  watch: {
    imageSrcList: {
      handler(newdata) {
        this.isreload = false;
        this.$nextTick(() => {
          this.isreload = true;
        });
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      isreload: true,
      current:0
    };
  },
  methods: {
    onChange(index){
      this.current = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-indicator{
  // width: 100%;
  position: absolute;
  bottom:10px;
  z-index: 1;
  ul{
    // width: 100%;
    align-items: center;
    // justify-content: center;
    display: flex;
    li{
      width: 8px;
      height: 8px;
      border-radius: 50% 50%;
      background: #ccc;
      margin-left: 5px;
    }
  }
}
.my-swipe{
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .van-swipe-item{
    flex:1;
    display:flex;
    align-items: center;
  }
}
</style>
