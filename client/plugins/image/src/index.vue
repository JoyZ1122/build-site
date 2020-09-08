<!--test.vue-->
<template>
  <div class="qk-image">
    <img ref="imageBox" :src="imageSrc" alt="">
  </div>
</template>

<script>
import vueobj from '@client/common/js/vueobj.js'
	export default {
		name: 'QkImage', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
		props: {
			imageSrc: {
				type: String,
        default: '//static-mumway.oss-cn-zhangjiakou.aliyuncs.com/NetworkFrontEnd/ljs/bbs/banner1_1.png'
      }
    },
    watch:{
      imageSrc(){
        this.$nextTick(()=>{
          let imageHeight = this.$refs.imageBox.offsetHeight;
          vueobj.$emit('activeHeight',imageHeight );
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
  .qk-image{
    width: 100%;
    height: 100%;
  }
  img{
    display: block;
    width: 100%;
    // height: 100%;
  }
</style>
