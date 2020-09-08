<!--test.vue-->
<template>
  <div class="qk-inputdate">
    <div class="address input-b" @click="showdate">
      <input
        type="text"
        name="date"
        readonly="readonly"
        :placeholder="placeholder"
        v-model="expected_date"
      />
    </div>
  </div>
</template>

<script>
import vueobj from "@client/common/js/vueobj.js";
export default {
  name: "QkInputdate",
  props: {
    placeholder: {
      type: String,
      default: "选择日期",
    },
    formsign: {
      type: String,
      default: "form1",
    },
    fieldname: {
      type: String,
      default: "expected_date",
    },
  },
  data() {
    return {
      expected_date: null,
      show: false,
    };
  },
  mounted() {
    vueobj.$on("datePickerVal", (val) => {
      this.expected_date = val;
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
  watch: {
    expected_date(newData) {
      let flag = this.GLOBALFORM.hasOwnProperty(this.formsign);
      if (flag) {
        let obj = {
          formsign: this.formsign,
          fieldname: this.fieldname,
          value: newData,
        };
        let flagname = false;
        this.GLOBALFORM[this.formsign].forEach((vv) => {
          if (vv.fieldname == this.fieldname) {
            vv.value = newData;
            flagname = true;
          }
        });
        if (!flagname) {
          this.GLOBALFORM[this.formsign].push(obj);
        }
      } else {
        let obj = {
          formsign: this.formsign,
          fieldname: this.fieldname,
          value: newData,
        };
        this.GLOBALFORM[this.formsign] = [obj];
      }
    },
  },
  methods: {
    showdate() {
      let isedit = sessionStorage.getItem("iseditFlag");
      if (isedit == 1) return;
      vueobj.$emit("datepickershow");
    },
  },
};
</script>

<style lang="scss" scoped>
.qk-inputdate {
  height: 100%;
  .address {
    height: 100%;
    input {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
}
</style>
