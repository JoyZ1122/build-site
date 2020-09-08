<template>
  <el-form-item label="请输入表单字段名称：">
    <el-select size="mini" v-model="tempText" placeholder="请选择输入框类型">
		<el-option
		v-for="item in options"
		:key="item.key"
		:label="item.name"
		:value="item.key">
		</el-option>
	</el-select>
  </el-form-item>
</template>

<script>
	export default {
		name: "attr-qk-fieldname",
		props: {
			fieldname: String
		},
		data() {
			return {
				tempText:'name',
				options:[
					{
						key:'name',
						name:'姓名'
					},
					{
						key:'sex',
						name:'性别'
					},
					{
						key:'phone',
						name:'电话'
					},
					{
						key:'code',
						name:'验证码'
					},
					{
						key:'work_type',
						name:'工种类型'
					},
					{
						key:'f_company',
						name:'公司名称'
					},
					{
						key:'city',
						name:'城市选择'
					},
					{
						key:'expected_date',
						name:'日期'
					},
					{
						key:'submitbtn',
						name:'提交按钮'
					},
					{
						key:'custome',
						name:'自定义类型'
					}
				]
			}
		},
		mounted() {
			this.tempText = this.fieldname;
		},
		watch: {
			fieldname() {
				this.tempText = this.fieldname;
			},
			tempText() {
				this.$emit('update:fieldname', this.tempText)
			}
		}
	}
</script>

<style scoped>

</style>
