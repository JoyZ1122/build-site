<template>
<div>
  <el-form-item label="请输入数据列表，以，号分割">
    <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入文本内容"
            v-model="tempText">
    </el-input>
  </el-form-item>
  </div>
</template>

<script>
	export default {
		name: "attr-qk-datalist",
		props: {
			datalist: {
                type:Array
            }
		},
		data() {
			return {
                tempText: '',
			}
        },
        watch: {
			datalist() {
				this.tempText = this.datalist.join('，');
			},
			tempText() {
				this.$emit('update:datalist', this.tempText.split('，'))
			}
		}
	}
</script>

<style scoped>

</style>
