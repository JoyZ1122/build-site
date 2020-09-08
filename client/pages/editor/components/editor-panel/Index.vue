<template>
  <div class="editor-pane" @click="handleClickCanvas" @keyup.esc="handleKeyup">
    <div class="editor-pane-inner" @scroll="editorPaneScroll">
		<!-- transform: 'scale('+scale+')', -->
      <div
        ref="editMain"
        class="editor-main"
        :style="{ width: projectData.width + 'px', height: projectData.height + 'px'}"
      >
        <div
          class="page-preview-wrapper"
          ref="canvas-panel"
          id="canvas-panel"
          :style="getCommonStyle(activePage.commonStyle)"
          @drop="dropAddElement"
          @dragover.prevent="dropChangeElement"
        >
          <!--页面组件列表展示-->
          <edit-shape
            v-for="item in activePage.elements"
            :key="item.uuid"
            :uuid="item.uuid"
            :defaultStyle="item.commonStyle"
            :style="getCommonStyle(item.commonStyle)"
            @handleElementClick="handleElementClick(item.uuid)"
            @resize="handleElementResize"
            :active="item.uuid === activeElementUUID"

          >
            <component
            @positionchange="positionchange"

              :is="item.elName"
              class="element-on-edit-pane"
              v-bind="{...item.propsValue, value: item.value}"
            />
          </edit-shape>
          <div class="fixedCon">
            <qk-date></qk-date>
            <qk-city></qk-city>
            <qk-submitsuccess></qk-submitsuccess>
          </div>
        </div>

        <div
          class="page-wrapper-menu-operation menu-item-on-edit-panel"
          :style="{transform: 'scale('+(1/scale)+')',right:topcropRight+'px'}"
          :class="{active: activeElementUUID}"
        >
          <el-tooltip
            v-for="(item, index) in menuOptions"
            :key="index"
            effect="dark"
            :content="item.title"
            placement="right"
          >
            <div
              class="menu-item menu-item-on-edit-panel"
              @click="handleElementCommand(item.value)"
            >
              <i class="menu-item-on-edit-panel" :class="[item.icon]"></i>
            </div>
          </el-tooltip>
        </div>
        <div class="page-wrapper-mask"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { _qk_register_components_object } from "@client/plugins/index";
import editShape from "@/components/edit-shape";
import editorProjectConfig from "@client/pages/editor/DataModel";
import { mapState, mapGetters } from "vuex";
import html2canvas from "html2canvas";
import vueobj from '@client/common/js/vueobj.js'


// todo 测试用
window._qk_register_components_object = _qk_register_components_object;
export default {
  props: {
    // canvas画板缩放
    scale: {
      type: Number,
      default: 1,
    },
  },
  components: {
    // 批量注册qk组件
    ..._qk_register_components_object,
    // 画板组件
    [editShape.name]: editShape,
  },
  data() {
    return {
      editorPaneScrollTop: 0,
      dragoverTop: 0,
      getCommonStyle: editorProjectConfig.getCommonStyle,
      topcropRight:null,
      menuOptions: [
        {
          title: "复制",
          icon: "iconfont iconfuzhi",
          value: "copy",
        },
        {
          title: "删除",
          icon: "iconfont iconshanchu",
          value: "delete",
        },
        {
          title: "字体放大",
          icon: "iconfont iconzitifangda",
          value: "fontA+",
        },
        {
          title: "字体缩小",
          icon: "iconfont iconzitisuoxiao",
          value: "fontA-",
        },
        {
          title: "字体加粗",
          icon: "iconfont iconzitijiacu",
          value: "fontB",
        },
        {
          title: "图层上移",
          icon: "iconfont iconziyuan1",
          value: "layerUp",
        },
        {
          title: "图层下移",
          icon: "iconfont iconxiayiyiceng",
          value: "layerDown",
        },
        {
          title: "图层置顶",
          icon: "iconfont iconcontrol-top",
          value: "layerTop",
        },
        {
          title: "图层置底",
          icon: "iconfont iconcontrol-bottom",
          value: "layerBottom",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      projectData: (state) => state.editor.projectData,
      activePageUUID: (state) => state.editor.activePageUUID,
      activeElementUUID: (state) => state.editor.activeElementUUID,
    }),
    ...mapGetters([
      "currentPageIndex",
      "activeElementIndex",
      "activeElement",
      "activePage",
	]),
  },
  mounted() {
    sessionStorage.setItem('iseditFlag',1);
    vueobj.$on('activeHeight',(val)=>{
      this.projectData.pages[this.currentPageIndex].elements[
        this.activeElementIndex
      ].commonStyle.height = val
    })
    this.topcropRight = this.gettopcropRight();
    window.addEventListener('resize',()=>{
      this.topcropRight = this.gettopcropRight();
    })
  },
  methods: {
    gettopcropRight(){
      let windowWidth = document.body.clientWidth;
      let right = (windowWidth - this.projectData.width)/2 -20;
      return right;
    },
    /**
     * 元素被点击
     * @param uuid
     */
    handleElementClick(uuid) {
      this.$store.dispatch("setActiveElementUUID", uuid);
    },
    //固定元素不能移动
    positionchange(val,height){
      if(!this.projectData.pages[this.currentPageIndex].elements[
        this.activeElementIndex
      ])return;
      let elem =this.projectData.pages[this.currentPageIndex].elements[
        this.activeElementIndex
      ].commonStyle;
      elem.height = height
      if(val=='上'){
        delete (elem.bottom);
        this.$set(elem,'top',0)
      }
      if(val=='下'){
        delete (elem.top)
        this.$set(elem,'bottom',0)
      }
    },
    /**
     * 移动改变元素大小定位
     * @param pos 当pos有值表示移动中需要实时同步样式变化，pos为undefind时则表示移动结束，记一次历史纪录
     * 鼠标移动完成时才记入历史纪录
     */
    handleElementResize(pos) {
      let elem =this.projectData.pages[this.currentPageIndex].elements[
        this.activeElementIndex
      ];
      if (!pos) {
        this.$store.dispatch("addHistoryCache");
        return;
      }
      this.projectData.pages[this.currentPageIndex].elements[
        this.activeElementIndex
      ].commonStyle.left = pos.left;
      this.projectData.pages[this.currentPageIndex].elements[
        this.activeElementIndex
      ].commonStyle.width = pos.width;
      if(elem.elName=='qk-popbutton')return;

      // 更新元素commonStyle
      this.projectData.pages[this.currentPageIndex].elements[
        this.activeElementIndex
      ].commonStyle = {
        ...pos,
      };
    },
    handleClickCanvas(e) {
      if (
        !e.target.classList.contains("element-on-edit-pane") &&
        !e.target.classList.contains("menu-item-on-edit-panel")
      ) {
        this.$store.dispatch("setActiveElementUUID", "");
      }
    },
    /**
     * 对元素进行操作命令
     */
    handleElementCommand(command) {
      this.$store.dispatch("elementCommand", command);
    },
    /**
     * 监听键盘事件
     * @param e
     */
    handleKeyup(e) {
    },
    /**
     * 提供截屏作为项目主图
     */
    screenshots() {
      const el = document.querySelector("#canvas-panel");
      html2canvas(el, {
        width: 375,
        height: 667,
        proxy: "/htmltocanvas/corsproxy", // 设置跨域接口
      }).then((canvas) => {
        let url = canvas.toDataURL("image/jpeg");
        this.$store.commit("updateCoverImage", url);
      });
    },
    dropAddElement(evenet){
      let element = this.projectData.pages[this.currentPageIndex].elements;

      var props=evenet.dataTransfer.getData("Object");
      props = JSON.parse(props);
      var item = evenet.dataTransfer.getData("item");
      item = JSON.parse(item);
      this.$store.dispatch('addElement', {...item, needProps: props})
      element[this.activeElementIndex].commonStyle.position= 'absolute'
      if(element.elName ==='qk-popbutton'){
        element[this.activeElementIndex].commonStyle.position= 'fixed'
        element[this.activeElementIndex].commonStyle.zIndex= 999

      }
     element[this.activeElementIndex].commonStyle.top = this.dragoverTop + this.editorPaneScrollTop - 110;
    },
    dropChangeElement(e){
      this.dragoverTop = e.clientY
    },
    editorPaneScroll(e){
      this.editorPaneScrollTop = e.target.scrollTop
    }
  },
};
</script>

<style lang="scss" scoped>
.editor-pane {
  height: 100%;
  width: 100%;
  border: 1px solid #f5f5f5;
  border-width: 0 1px;
  background-image: linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    ),
    linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    );
  background-position: 0 0, 13px 13px;
  background-size: 26px 26px;
  display: flex;
  justify-content: center;
}

.editor-pane-inner {
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 20px;
}

.editor-main {
  border-radius: 3px;
  box-shadow: 0 3px 10px #dcdcdc;
  margin: 25px auto;
  position: relative;
  background: white;
  transform-origin: center top;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==");
}

.page-preview-wrapper {
  height: 100%;
  position: relative;
  transform: scale(1);
}

.page-wrapper-mask {
  height: 100%;
  width: 100%;
  z-index: 1000;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  outline: rgba(236, 238, 240, 0.77) solid 10000px;
}

.element-on-edit-pane {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.page-wrapper-menu-operation {
  position: fixed;
  top: 20%;
  width: 0;
  background: #f4f4f4;
  color: #333;
  text-align: center;
  z-index: 1002;
  border-radius: 4px;
  display: none;
  transition: all 0.28s;
  opacity: 0;
  transform-origin: center top;
  .menu-item {
    padding: 10px;
    cursor: pointer;
    &.i {
      font-size: 24px;
      line-height: 30px;
    }
    &:hover {
      background: rgba(37, 165, 137, 0.09);
      color: $primary;
      &.i {
        font-weight: bold;
        font-size: 26px;
      }
    }
  }
  &.active {
    display: block;
    width: 60px;
    opacity: 1;
  }
}
</style>
