<template>
  <el-scrollbar class="components-attr-edit">
      <p class="page-title fontBold">统计例代配置</p>
    <div class="attr-item-edit-wrapper">
      <el-form ref="form" label-width="80px">
       <el-form-item label="服务商：">
          <el-select size="mini" v-model="projectData.count.type">
            <el-option label="百度统计" value="1">百度统计</el-option>
            <el-option label="友盟统计" value="2">友盟统计</el-option>
            <el-option label="抖音统计" value="3">抖音统计</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代码Id:">
          <el-input  size="mini" type="text" v-model="projectData.count.id" placeholder="请填写代码Id" />
        </el-form-item>
        <!-- <el-form-item label="埋点Id:">
          <el-input  size="mini" type="text" v-model="projectData.count.mid" placeholder="请填写提交埋点Id" />
        </el-form-item> -->
      </el-form>
        
      </div>



    <p class="page-title fontBold">当前页样式</p>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">背景颜色：</p>
      <div class="attr-item-edit-input no-top">
        <el-color-picker size="mini" :show-alpha="true"
                         v-model="activePage.commonStyle.backgroundColor"></el-color-picker>
      </div>
    </div>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">背景图片：</p>
      <div class="attr-item-edit-input">
        <imageSelect :url.sync="activePage.commonStyle.backgroundImage" />
      </div>
    </div>

    <div v-if="pageMode !== 'h5'">
      <p class="page-title fontBold">页面尺寸</p>
      <div class="attr-item-edit-wrapper">
        <p class="attr-item-title">尺寸：</p>
        <div class="col-2 attr-item-edit-input">
          <el-input-number size="mini"
                           v-model="projectData.width"
                           controls-position="right" :min="0"/>
          <div class="attr-item-edit-input-des">宽度</div>
        </div>
        <div class="col-2 attr-item-edit-input">
          <el-input-number size="mini"
                           v-model="projectData.height"
                           controls-position="right" :min="0"/>
          <div class="attr-item-edit-input-des">高度</div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
	import {mapState, mapGetters} from 'vuex'
	import imageSelect from '@client/components/image-select'
	export default {
    data(){
      return{
        testData:''
      }
    },
		components: {
			imageSelect
		},
		computed: {
			...mapState({
				projectData: state => state.editor.projectData,
				activePageUUID: state => state.editor.activePageUUID,
				activeElementUUID: state => state.editor.activeElementUUID
			}),
			...mapGetters([
				'currentPageIndex',
				'activeElementIndex',
				'activeElement',
        'activePage',
				'pageMode'
			])
		},
	}
</script>

<style lang="scss" scoped>
  .components-attr-edit {
    height: 100%;
  }

  .components-attr-animate-edit {
    position: relative;
  }

  .attr-title {
    font-weight: bold;
  }
  .attr-item-edit-wrapper {
    padding-left: 18px;
    display: flex;
    width: 100%;
    text-align: center;
    padding-bottom: 10px;
    .attr-item-title {
      text-align: left;
      min-width: 60px;
      line-height: 28px;
      font-size: 12px;
    }
    .attr-item-edit-input {
      &.col-2 {
        width: 90px;
        margin-left: 10px;
      }
      &.col-1 {
        width: 250px;
      }
      &.col-3 {
        width: 60px;
        margin-left: 10px;
      }
      &.col-4 {
        width: 50px;
        margin-left: 10px;
      }
      .attr-item-edit-input-des {
        text-align: center;
        line-height: 1;
        margin-top: 2px;
        font-size: 12px;
        color: $gray;
      }
    }
  }
</style>
