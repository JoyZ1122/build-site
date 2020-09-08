<template>
<div class="qk-inputcity">
  <div class="address input-b" @click="showcityHandle">
      <input
        type="text"
        name="city"
        id="city"
        readonly="readonly"
        placeholder="选择所在城市"
        class="bac_img"
        v-model="activeCity"
      />
    </div>
  </div>
</template>
<script>
import vueobj from '@client/common/js/vueobj.js'

export default {
    name:'QkInputcity',
    data(){
        return{
          activeCity:null
        }
    },
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
        default:'city'
      }
    },
    watch:{
      activeCity(newData){
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
  mounted() {
    vueobj.$on("setCity", (val) => {
      this.activeCity = val;
    });
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
  },
  methods: {
    showcityHandle(){
      let isedit = sessionStorage.getItem("iseditFlag");
      if (isedit == 1) return;
      vueobj.$emit("cityPickershow");
    }
  },
};
</script>

<style scoped lang="scss">
.qk-inputcity{
  height: 100%;
  width: 100%;
  .address{
    height: 100%;
    width: 100%;
    input{
      height: 100%;
      width: 100%;
      border:none;
    }
  }
}
</style>