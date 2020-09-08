<template>
<div>
  <el-form-item label="选择固定位置：">
    <el-radio-group v-model="Data.istop">
      <el-radio label="上"></el-radio>
      <el-radio label="下"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="按钮文字：">
      <el-input v-model="Data.text"/>
    </el-form-item>
	<!-- <el-form-item label="按钮字体颜色：">
      <el-color-picker show-alpha size="mini"  v-model="Data.textColor"></el-color-picker>
    </el-form-item> -->
	<el-form-item label="按钮高度：">
    <el-input-number size="mini" v-model="Data.height" controls-position="right" :min="0" />
  </el-form-item>
  <el-form-item  label="按钮背景颜色：">
      <el-color-picker show-alpha size="mini"  v-model="Data.backColor"></el-color-picker>
    </el-form-item>
  <!-- <el-form-item label="按钮边框大小：">
    <el-input-number size="mini" v-model="Data.borderWidth" controls-position="right" :min="0" />
  </el-form-item>
  <el-form-item  label="按钮边框颜色：">
      <el-color-picker show-alpha size="mini"  v-model="Data.borderColor"></el-color-picker>
    </el-form-item>
	<el-form-item label="按钮圆角：">
      <el-input-number size="mini" v-model="Data.borderRadius" controls-position="right" :min="0" />
    </el-form-item> -->
</div>
</template>

<script>
import fixedData from '@client/utils/popbtn'

	export default {
		name: "attr-qk-fixedposition",
		props: {
            fixedposition:{
                type:Object
            }
		},
		data() {
			return {
				Data:fixedData
			}
    },
    watch: {
			Data:{
				handler() {
					this.$emit("update:fixedposition", this.Data);
				},
				deep: true,
      },
      fixedposition:{
        handler(newdata) {
					this.Data = newdata;
				},
				deep: true,
      }
		},
	mounted(){
    this.Data = this.fixedposition;
	}
  }
</script>

<style scoped>

</style>
