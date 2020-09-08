<template>
  <el-form-item label="选择icon大小：">
    <el-input-number size="mini"
                        v-model="Width"
                        controls-position="right" :min="0"/>
  </el-form-item>
</template>

<script>
	export default {
		name: "attr-qk-radioWidth",
		props: {
            radioWidth:{
                default:18
            }
		},
		data() {
			return {
          Width:'16'
			}
    },
    watch: {
			radioWidth() {
				this.Width = this.radioWidth;
			},
			Width() {
				this.$emit('update:radioWidth', this.Width)
			}
		}
	}
</script>

<style scoped>

</style>
