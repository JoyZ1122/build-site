<!--test.vue-->
<template>
  <div class="qk-radio">
    <van-radio-group v-model="radioChoice" direction="horizontal">
      <van-radio
        v-for="(radio,index) in datalist"
        :key="index+'radio'"
        :name="radio"
        :checked-color="radioColor"
        :icon-size="radioWidth"
      >{{radio}}</van-radio>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  name: "QkRadio", // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  props: {
    datalist: {
      type: Array,
      default: () => {
        return ["预产期", "预产期"];
      },
    },
    radioColor: {
      default: "#FF667F",
    },
    radioWidth: {
      default: 18,
    },
    formsign: {
      type: String,
      default: "form1",
    },
    fieldname: {
      type: String,
      default: "sex",
    },
  },
  watch: {
    radioChoice(newData) {
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
  mounted() {
    let obj = {
      formsign: this.formsign,
      fieldname: this.fieldname,
      value: null,
    };
    this.GLOBALFORM[this.formsign] = [obj];
  },
  data() {
    return {
      radioChoice: null,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
