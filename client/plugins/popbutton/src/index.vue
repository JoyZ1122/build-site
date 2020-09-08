<!--test.vue-->
<template>
  <div class="qk-popbutton">
    <div class="qk-popbutton-btn" :style="borderStyle">{{fixedposition.text}}</div>
  </div>
</template>

<script>
import fixedData from '@client/utils/popbtn'
	export default {
        name: 'QkPopbutton', 
        props:{
            fixedposition:{
                type:Object,
                default(){
                  return fixedData
                }
            },
            // imageSrc:{
            //   type:String
            // }
        },
        computed:{
          borderStyle(){
            return{
              // borderWidth:this.fixedposition.borderWidth+'px',
              // borderColor:this.fixedposition.borderColor,
              // borderStyle:'solid',
              // borderRadius:this.fixedposition.borderRadius+'px',
              // color:this.fixedposition.textColor,
              // backgroundImage:'url('+ this.imageSrc+')',
              // backgroundRepeat:'no-repeat',
              //  backgroundSize:'100% 100%',
               height:this.fixedposition.height+'px',
               backgroundColor:this.fixedposition.backColor
            }
          }
        },
        watch:{
          fixedposition:{
            handler(newdata){
              this.$emit('positionchange',newdata.istop,newdata.height);
            },
            deep:true,
            immediate:true
          } 
        }
	}
</script>

<style lang="scss" scoped>
.qk-popbutton{
  height: 100%;
}
.qk-popbutton-btn{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
