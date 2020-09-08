<!--test.vue-->
<template>
  <div class="qk-input">
    <input class="qk-input-item" v-model="value" :placeholder="placeholder" type="text">
  </div>
</template>

<script>
	export default {
		name: 'QkInput',
		props: {
			placeholder: {
				type: String,
        default: '请输入'
      },
      formsign: {
        type:String,
        default:'form1'
      },
      fieldname:{
        type:String,
        default:'name'
      }
		},
    data(){
			return {
        value:null
      }
    },
    watch:{
      value(newData){
        let flag = this.GLOBALFORM.hasOwnProperty(this.formsign);
        if(flag){
          let obj = {
            formsign:this.formsign,
            fieldname:this.fieldname,
            value:newData,
          }
          let flagname = false;
          this.GLOBALFORM[this.formsign].forEach((vv)=>{
            if(vv.fieldname==this.fieldname){
              vv.value = newData;
              flagname = true
            }
          })
          if(!flagname){
            this.GLOBALFORM[this.formsign].push(obj);
          }
        }else{
          let obj = {
            formsign:this.formsign,
            fieldname:this.fieldname,
            value:newData,
          }
          this.GLOBALFORM[this.formsign] = [obj]
        }
      }
    },
    mounted(){
      let obj = {
        formsign:this.formsign,
        fieldname:this.fieldname,
        value:null,
      }
      if(this.GLOBALFORM[this.formsign]&&this.GLOBALFORM[this.formsign].length>0){
        this.GLOBALFORM[this.formsign].push(obj)
      }else{
        this.GLOBALFORM[this.formsign] = [obj];
      }
    }
	}
</script>

<style lang="scss" scoped>
.qk-input{
  width: 100%;
  height: 100%;
  .qk-input-item{
    display: block;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
  }
}

</style>
