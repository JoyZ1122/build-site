<template>
  <el-form-item label="文本内容：">
    <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入文本内容"
            v-model="tempText">
    </el-input>
  </el-form-item>
</template>

<script>
	export default {
		name: "attr-qk-definedName",
		props: {
			definedName: String,
		},
		data() {
			return {
				tempText: ''
			}
		},
		mounted() {
			this.tempText = this.definedName;
		},
		watch: {
			definedName() {
				this.tempText = this.definedName;
			},
			tempText() {
				this.$emit('update:definedName', this.tempText)
			}
		}
	}
</script>

<style scoped>

</style>
