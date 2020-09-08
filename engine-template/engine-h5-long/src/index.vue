<template>
  <div class="engine-template-wrapper" id="mainPageContent">
    <div
      class="relative"
      v-for="(page, i) in pageData.pages"
      :key="i"
      :style="getCommonStyle(page.commonStyle)"
    >
      <!--页面内容区域-->
      <div
        class="quark-page-wrapper"
        :style="getCommonStyle({...page.commonStyle, top: pageTop, height: pageData.height, width: pageData.width, position: 'relative'}, scalingRatio)"
      >
        <componentsTemplate
          v-for="(item, index) in page.elements"
          :key="index"
          @handleElementClick="handleElementClick"
          :element="item"
          :style="getCommonStyle(item.commonStyle, scalingRatio,item.elName)"
        ></componentsTemplate>
        <div class="fixedCon">
          <qk-date></qk-date>
          <qk-city></qk-city>
          <qk-submitsuccess></qk-submitsuccess>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import editorProjectConfig from "@client/pages/editor/DataModel";
import componentsTemplate from "../../components/components-template";
import $config from "@client/config";
import elementEvents from "@client/mixins/elementEvents";
import vueobj from "@client/common/js/vueobj.js";
import { WxShare } from "@common/wxSdk";
export default {
  name: "engineH5Long",
  components: {
    componentsTemplate
  },
  mixins: [elementEvents],
  data() {
    return {
      getCommonStyle: editorProjectConfig.getCommonStyle,
      scalingRatio: 1,
      pageData: {
        pages: []
      },
      pageTop: 0
    };
  },
  created() {
    sessionStorage.setItem("iseditFlag", 3);
    let pageData = window._pageData;
    this.pageData = pageData;
    this.scalingRatio = document.body.clientWidth / $config.canvasH5Width;
    this.pageTop =
    
      (document.documentElement.clientHeight -
        this.pageData.height * this.scalingRatio) /
      2;
    this.pageTop = Math.max(this.pageTop, 0);
    WxShare();
    //埋点
    vueobj.$on("ismStatistics", id => {
      const { type } = this.pageData.count;

      if (+type === 1) {
        if (id)
          window._agl && window._agl.push(["track", ["success", { t: id }]]);
      } else if (+type === 2) {
        window._czc && window._czc.push(["_trackEvent", '提交成功', "提交"]);
      } else if (+type === 3) {
        if (id)
          window.meteor && window.meteor.track("form", { convert_id: id });
      }
    });
  },
  methods: {
    /**
     * 按钮点击事件
     * @param eventsData
     */
    async handleElementClick(eventsData, element) {
      for (let i = 0, len = eventsData.length; i < len; i++) {
        if (this["_event_" + eventsData[i].type]) {
          await this["_event_" + eventsData[i].type](
            eventsData[i],
            element,
            this.pageData
          );
        }
      }
    }
  }
};
</script>

<style scoped>
.engine-template-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  /* overflow-x: hidden; */
}

.relative {
  position: relative;
}

.hidden {
  overflow: hidden;
}
</style>
