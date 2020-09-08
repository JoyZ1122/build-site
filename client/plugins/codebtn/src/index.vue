<!--button.vue-->
<template>
  <div class="qk-button" @click="getCode">{{iscode}}</div>
</template>

<script>
import axios from "axios";
import vueobj from "@client/common/js/vueobj.js";
export default {
  name: "QkCodebutton", // 这个名字很重要，它就是未来的标签名
  data() {
    return {
      iscode: "获取验证码",
      time: null,
    };
  },
  props: {
    formsign: {
      type: String,
      default: "form1",
    },
  },
  methods: {
    async getCode() {
      let isedit = sessionStorage.getItem("iseditFlag");
      if (+isedit == 1) return;
      let query = {};
      let data = this.GLOBALFORM[this.formsign];
      data.forEach((vv) => {
        query[vv.fieldname] = vv.value;
      });
      console.log(query);
      if (!query.phone) {
        vant.Toast.fail("请填写手机号！");
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(query.phone)) {
        vant.Toast.fail("手机号码有误，请重填");
        return;
      }
      if (this.time > 0) return;
      let requesthttp =
        "https://saas-apis.mumway.com/hw/common/sms/send-code?phone=" +
        query.phone;
      let res = await axios.get(requesthttp);
      this.time = 60;
      this.iscode = this.time + "s";
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.time == 0) {
          this.iscode = "获取验证码";
          clearInterval(this.timer);
          return;
        }
        this.time--;
        this.iscode = this.time + "s";
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.qk-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
