<template>
  <el-form-item label="选择页边距大小：">
    <el-input-number size="mini"
                        v-model="Width"
                        controls-position="right" :min="0"/>
  </el-form-item>
</template>

<script>
	export default {
		name: "attr-qk-padding",
		props: {
            padding:{
                default:18
            }
		},
		data() {
			return {
          Width:'16'
			}
    },
    watch: {
			padding() {
				this.Width = this.padding;
			},
			Width() {
				this.$emit('update:padding', this.Width)
			}
		}
	}
</script>

<style scoped>

</style>
