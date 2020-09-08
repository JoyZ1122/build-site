<template>
<div>
  <el-form-item label="选择元素颜色：">
    <div class="attr-item-edit-input">
        <el-color-picker size="mini" v-model="color"></el-color-picker>
    </div>
  </el-form-item>
  </div>
</template>

<script>
	export default {
		name: "attr-qk-radioColor",
		props: {
			radioColor: {
                default:'#FF667F'
            }
		},
		data() {
			return {
                color: '#FF667F',
                radioWidth:'16'
			}
        },
        watch: {
			radioColor() {
				this.color = this.radioColor;
			},
			color() {
				this.$emit('update:radioColor', this.color)
			}
		}
	}
</script>

<style scoped>

</style>
