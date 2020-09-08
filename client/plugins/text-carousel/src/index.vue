<!--test.vue-->
<template>
  <div class="qk-image-carsousel">
    <van-swipe
      class="my-swipe"
      v-if="isreload"
      vertical
      :autoplay="autoplay"
      :show-indicators="false"
    >
      <van-swipe-item v-for="(item,index) in newDataArr" :key="index+'one'">
        <div v-for="(element,i) in item" :key="i+'two'">{{element}}</div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { chunk } from "lodash";
export default {
  name: "QkTextCarousel", // 这个名字很重要，它就是未来的标签名<qk-text-carousel></qk-text-carousel>
  components: {},
  props: {
    textSrcList: {
      type: Object,
      default: () => {
        return {
          textArr: ["136****2762 已报名参加", "136****2762   已报名参加"],
          textNum: 1
        };
      }
    },
    autoplay: {
      type: Number,
      default: 2500
    }
  },
  watch: {
    textSrcList: {
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
  computed: {
    newDataArr() {
      let newArr = chunk(this.textSrcList.textArr, this.textSrcList.textNum);
      return newArr;
    }
  },
  data() {
    return {
      isreload: true,
      direction: "vertical" // horizontal 水平
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.qk-image-carsousel{
	height: 100%;
}
.my-swipe {
  min-height: 50px;
  height: 100%;
     overflow: hidden;
}
.van-swipe-item{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>

