<template>
<div>
  <el-form-item label="文字列表：">

    <div class="attr-edit">
      <div class="attr-edit-wrapper" v-for="(item, index) in tempValue" :key="index">
        <textSelect :text.sync="item" :index="index" @change="change"/>
        <div class="attr-edit-btn-wrapper">
          <span class="imageSelect-btn" @click="add(index)">
            <i class="el-icon-circle-plus-outline"></i>
          </span>
          <span class="imageSelect-btn error" @click="del(index)" v-show="tempValue.length > 1">
            <i class="el-icon-remove-outline"></i>
          </span>
        </div>
      </div>
    </div>
  </el-form-item>
  <el-form-item label="单页数据条数">
    <el-input-number size="mini"
                        v-model="textNumber"
                        controls-position="right" :min="1"/>
  </el-form-item>
  </div>
</template>

<script>
	import textSelect from '@client/components/text-select'

	export default {
		name: "attr-qk-textSrcList",
		props: {
			textSrcList: {
				type: Object,
				default: () => {
          return {
            textArr:[],
            textNum:1
          }
        }
			}
		},
		components: {
			textSelect
		},
		data() {
			return {
        tempValue: [],
        textNumber:1
			}
		},
		created() {
			this.initData()
		},
		watch: {
      textNumber(){
        let obj={
          textArr:this.getResultTextSrcList(),
          textNum:this.textNumber
        }
        this.$emit('update:textSrcList', obj);
      },
      textSrcList:{
        handler(newdata){
          if(!(newdata.textArr&&newdata.textArr.length===0)){
            this.tempValue = newdata.textArr
            this.textNumber = newdata.textNum;
          }
          
        },
        deep:true,
        immediate:true
      }
		},
		methods: {
			initData() {
        let list = [];
        if(!this.textSrcList.textArr)return;
				this.textSrcList.textArr.forEach(item => {
					list.push(item)
				})
        this.tempValue = list;
			},
			getResultTextSrcList() {
        let list = [];
        let len = this.tempValue.length
				for (let i = 0;i < len; i++) {
					list.push(this.tempValue[i])
				}
				return list
			},
			change(i,val) {
          this.tempValue[i] = val;
          let obj={
            textArr:this.getResultTextSrcList(),
            textNum:this.textNumber
          }
          this.$emit('update:textSrcList', obj);
			},
			add(index) {
				this.tempValue.splice(index+1, 0,'')
			},
			del(index) {
				this.tempValue.splice(index, 1)
			}
		}
	}
</script>

<style lang="scss" scoped>
.el-form-item{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  /deep/ .el-form-item__label{
    text-align: left;
  }
}
.attr-edit{
  display: block;
    width: 100%;
}
  .attr-edit-wrapper {
    display: block;
    width: 100%;
    position: relative;
    margin-bottom: 10px;
  }

  .attr-edit-btn-wrapper {
    position: absolute;
    bottom: 0;
    right: 8px;
    .imageSelect-btn {
      margin-left: 8px;
      font-size: 24px;
      cursor: pointer;
      &:hover {
        color: $primary;
      }
      &.error {
        color: inherit;
        &:hover {
          color: $error;
        }
      }
    }
  }
</style>
