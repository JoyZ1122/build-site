<template>
  <el-form-item label="请输入所属表单：">
	<el-select v-model="tempText" placeholder="请选择" size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
  </el-form-item>
</template>

<script>
	export default {
		name: "attr-qk-formsign",
		props: {
			formsign: String
		},
		data() {
			return {
				tempText: 'form1',
				options:[
					{label:'表单一',value:'form1'},
					{label:'表单二',value:'form2'},
					{label:'表单三',value:'form3'},
					{label:'表单四',value:'form4'},
					{label:'表单五',value:'form5'},
				]
			}
		},
		mounted() {
			this.tempText = this.formsign;
		},
		watch: {
			formsign() {
				this.tempText = this.formsign;
			},
			tempText() {
				this.$emit('update:formsign', this.tempText)
			}
		}
	}
</script>

<style scoped>

</style>
