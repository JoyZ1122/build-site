<template>
  <el-form-item label="选择圆角大小：">
    <el-input-number size="mini"
                        v-model="Width"
                        controls-position="right" :min="0"/>
  </el-form-item>
</template>

<script>
	export default {
		name: "attr-qk-border",
		props: {
            border:{
                default:10
            }
		},
		data() {
			return {
          Width:'16'
			}
    },
    watch: {
			border() {
				this.Width = this.border;
			},
			Width() {
				this.$emit('update:border', this.Width)
			}
		}
	}
</script>

<style scoped>

</style>
