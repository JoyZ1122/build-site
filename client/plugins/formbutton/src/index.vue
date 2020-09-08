<!--button.vue-->
<template>
  <div class="qk-button" @click="submitClick">{{text}}</div>
</template>

<script>
import axios from "axios";
import vueobj from "@client/common/js/vueobj.js";
export default {
  name: "QkFormbutton", // 这个名字很重要，它就是未来的标签名
  props: {
    text: {
      type: String,
      default: "按 钮",
    },
    formsign: {
      type: String,
      default: "form1",
    },
    submitbtndata: {
      type: Object,
      default() {
        return {
          tempText: "提交成功",
          interface: 1,
          mid: "",
        };
      },
    },
  },
  methods: {
    valideForm(query) {
      let flag = true;
      if (query && query.hasOwnProperty("work_type")) {
        if (!query.work_type) {
          vant.Toast.fail("请选择工种类型！");
          flag = false;
          return flag;
        }
      }
      if (query && query.hasOwnProperty("phone")) {
        if (!query.phone) {
          vant.Toast.fail("请填写手机号！");
          flag = false;
          return flag;
        }
        if (!/^1[3456789]\d{9}$/.test(query.phone)) {
          vant.Toast.fail("手机号码有误，请重填");
          flag = false;
          return flag;
        }
      }
      if (query && query.hasOwnProperty("code")) {
        if (!query.code) {
          vant.Toast.fail("请填写验证码！");
          flag = false;
          return flag;
        }
      }

      if (query && query.hasOwnProperty("expected_date")) {
        if (!query.expected_date) {
          vant.Toast.fail("请选择日期！");
          flag = false;
          return flag;
        }
      }
      if (query && query.hasOwnProperty("city")) {
        if (!query.city) {
          vant.Toast.fail("请选择地址！");
          flag = false;
          return flag;
        }
      }
      return flag;
    },
    async submitClick() {
      var isedit = sessionStorage.getItem("iseditFlag");
      let requestUrl = null;
      if (+this.submitbtndata.interface == 4) {
        requestUrl =
          "https://saas-apis.mumway.com/clue/external/insure/v1/add-reservation";
      } else if(+this.submitbtndata.interface == 5) {
        requestUrl =
          "https://saas-apis.mumway.com/vsapi/ecAddCustomer";
      }else{
        requestUrl = "http://dev.mumway.com/index/activity/addServiceOffers";
      }
      let query = {};
      var data = this.GLOBALFORM[this.formsign];
      data.forEach((vv) => {
        query[vv.fieldname] = vv.value;
      });
      if (!query.hasOwnProperty("work_type")) {
        query["work_type"] = '月嫂'
      }
      if (+isedit == 1) return;
      if (!this.valideForm(query)) return;
      if (+this.submitbtndata.interface == 5){
        for(let key in query){
          if(key=='city'){
            query['f_company_city'] = query[key];
            delete query[key];
          }
          if(key=='phone') {
            query['f_mobile'] = query[key]
            delete query[key];
          }
          if(key=='name') {
            query['f_name'] = query[key]
            delete query[key];
          }
        }
      }
      let res = await axios.post(requestUrl, query).catch((err) => {console.log(err)});
      // vant.Toast({
      //   message: this.submitbtndata.tempText,
      //   type: "success",
      //   className: "minwidth",
      // });
      vueobj.$emit('successPopSHow');
      if(this.submitbtndata.mid){
        vueobj.$emit("ismStatistics", this.submitbtndata.mid);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
