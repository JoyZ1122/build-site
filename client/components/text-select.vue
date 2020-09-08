/**
切换图片，提供图片选择，图片上传等功能
*/
<template>
  <div class="text-select-wrapper">
   <!-- <div class="text-select-l">
        <p>输入文字</p>
    </div> -->
    <div class="text-select-r">
      <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="tempValue">
      </el-input>
    </div>
  </div>
</template>

<script>
	import $bus from '@client/eventBus'

	export default {
		props: {
      text: String,
      index:Number
		},
		data() {
			return {
				// 唯一得id用于选择图片后事件通知
				selectId: +new Date(),
				tempValue: ''
			}
		},
		created() {
			$bus.$on('select-text', this.changeText)
			this.tempValue = this.text;
		},
		watch: {
			text(val) {
        this.tempValue = val;
        // this.$emit('change', val)
			},
			tempValue(val) {
				this.changeText(this.selectId, val);
			}
		},
		methods: {
			changeText(id, text) {
				if (id !== this.selectId) {
					return;
        }
				this.$emit('update:text', text)
				this.$emit('change',this.index, text)
			},
			/**
       * 点击弹出选择图片弹窗
			 */
			// handleClick(){
			// 	$bus.$emit('show-select-text', this.selectId)
      // }
		}
	}
</script>

<style lang="scss" scoped>
  .component-text-select {
    width: 100px;
    height: 100px;
    border: 1px dashed $primary;
    border-radius: 3px;
    margin-bottom: 18px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.28s;
    position: relative;
    background: #eee 50%/contain no-repeat;
    justify-content:center;
    align-items:center;
    display: flex;
    &:hover {
      color: $primary;
    }
    img{
      display: inline-block;
      max-width: 100%;
      max-height: 100%;
    }
    p{
      line-height: 1;
      padding-bottom: 10px;
    }
  }

  .text-preview-null {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding-top: 25px;
    background: rgba(0, 0, 0, 0.2);
  }

  .text-select-wrapper{
    display: flex;
    .text-select-l{
      width: 108px;
    }
    .text-select-r{
      flex: 1;
    }
  }
</style>
