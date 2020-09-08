<!--test.vue-->
<template>
  <div class="qk-video" style="width:100%;height:100%;background:#000;">
    <video
      style="width:100%;height:100%;"
      controls
      ref="videoPlay"
      playsinline="true"
      x-webkit-airplay="true"
      x5-playsinline
      webkit-playsinline="true"
      :poster="videodata.videoImage"
      :src="videodata.videoUrl"
    ></video>
  </div>
</template>

<script>
export default {
  name: "QkVideo", // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  props: {
    videodata: {
      type: Object,
      default() {
        return {
          videoUrl: null,
          videoImage: null
        };
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>
