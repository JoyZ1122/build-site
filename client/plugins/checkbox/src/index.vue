<!--test.vue-->
<template>
  <div class="qk-checkbox">
      <van-checkbox-group v-model="radioChoice" direction="horizontal">
        <van-checkbox :icon-size="radioWidth" :checked-color="radioColor" v-for="(item,index) in datalist" :name="item" :key="index">{{item}}</van-checkbox>
      </van-checkbox-group>
  </div>
</template>

<script>
	export default {
		name: 'QkCheckbox', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
		props: {
			datalist:{
                type: Array,
                default:()=>{
                    return ['月子餐','小儿推拿']
                }
            },
            radioColor:{
                default:'#FF667F'
            },
            radioWidth:{
                default:18
            }
        },
        data() {
            return {
                radioChoice:[],
            }
        },
        methods:{
        }
	}
</script>

<style lang="scss" scoped>
.qk-checkbox{
    ul{
        display: flex;
        flex-wrap: wrap;
        li{
            margin-right: 10px;
            line-height: 100%;
            cursor: pointer;
            border-radius:20px;
        }
    }
}
</style>
