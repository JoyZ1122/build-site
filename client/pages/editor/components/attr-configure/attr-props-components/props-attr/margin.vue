<template>
  <el-form-item label="选择元素间距：">
    <el-input-number size="mini"
                        v-model="Width"
                        controls-position="right" :min="0"/>
  </el-form-item>
</template>

<script>
	export default {
		name: "attr-qk-marginval",
		props: {
            marginval:{
                default:10
            }
		},
		data() {
			return {
          Width:'10'
			}
    },
    watch: {
			marginval() {
				this.Width = this.marginval;
			},
			Width() {
				this.$emit('update:marginval', this.Width)
			}
		}
	}
</script>

<style scoped>

</style>
