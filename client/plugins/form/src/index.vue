<template>
  <div class="qk-form">
    <div class="userName input-b" v-if="isselect('姓名')">
      <input :style="borderHave" type="text" placeholder="请输入宝妈/宝爸姓名" v-model="form.name" />
    </div>
   <div class="input-b radioChoice" v-if="isselect('性别')">
      <el-radio-group class="radioChoice" v-model="form.sex" :style="{height:formlist.inputHeight+'px',marginTop:isselect('姓名')?`-${formlist.marginval}px`:'none'}">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </div>
    <div class="phoneNUmber input-b" v-if="isselect('电话')">
      <input :style="borderHave" type="tel" placeholder="请输入电话号码" v-model="form.phone" />
    </div>
    <div class="phoneNUmber input-b" v-if="isselect('验证码')">
      <input :style="borderNoHave" type="tel" placeholder="请输入验证码" v-model="form.code" />
      <el-button :style="codeStyle" class="getCode" @click="getCode">{{iscode}}</el-button>
    </div>
     <div class="address input-b" v-if="isselect('日期')">
      <input
        @click="showdate"
        :style="borderHave"
        type="text"
        name="date"
        readonly="readonly"
        placeholder="选择日期"
        v-model="form.expected_date"
      />
      <van-calendar v-model="show" :round="false" position="right" />
    </div> 
    <div class="address input-b"  v-if="isselect('地址')">
      <input
        @click="showcityHandle"
        :style="borderHave"
        type="text"
        name="city"
        id="city"
        readonly="readonly"
        placeholder="选择所在城市"
        class="bac_img"
        v-model="activeCity"
      />
    </div>
    <div
      class="phoneNUmber input-b"
      v-for="(item,index) in formlist.inputList"
      :key="item.key+index+'form'"
    >
      <input
        :style="borderHave"
        type="text"
        :placeholder="item.placeholder"
        v-model="form.custom[item.key]"
      />
    </div>
    <div class="submit" @click="submitForm">
      <button :style="submitStyle">{{formlist.submitText}}</button>
    </div>
  </div>
</template>
<script>
import city from "../../city/index.js";
import axios from "axios";
import vueobj from "@client/common/js/vueobj.js";
import formData from "@client/utils/submitdata";
export default {
  name: "QkForm",
  props: {
    formlist: {
      type: Object,
      default() {
        return formData;
      },
    },
  },
  computed: {
    isleft() {
      return this.formlist.borderList.includes("左");
    },
    isright() {
      return this.formlist.borderList.includes("右");
    },
    istop() {
      return this.formlist.borderList.includes("上");
    },
    isbottom() {
      return this.formlist.borderList.includes("下");
    },
    borderHave() {
      return {
        marginBottom: this.formlist.marginval + "px",
        borderRadius: this.formlist.border + "px",
        fontSize: this.formlist.inputsize + "px",
        width: this.formlist.inputwidth + "px",
        height: this.formlist.inputHeight + "px",
        borderLeft: this.isleft
          ? "1px solid " + this.formlist.borderColor
          : "none",
        borderRight: this.isright
          ? "1px solid " + this.formlist.borderColor
          : "none",
        borderTop: this.istop
          ? "1px solid " + this.formlist.borderColor
          : "none",
        borderBottom: this.isbottom
          ? "1px solid " + this.formlist.borderColor
          : "none",
        backgroundColor: this.formlist.borderBackColor,
      };
    },
    borderNoHave() {
      return {
        marginBottom: this.formlist.marginval + "px",
        borderRadius: this.formlist.border + "px",
        fontSize: this.formlist.inputsize + "px",
        width: this.formlist.inputwidth - 90 + "px",
        height: this.formlist.inputHeight + "px",
        borderLeft: this.isleft
          ? "1px solid " + this.formlist.borderColor
          : "none",
        borderRight: this.isright
          ? "1px solid " + this.formlist.borderColor
          : "none",
        borderTop: this.istop
          ? "1px solid " + this.formlist.borderColor
          : "none",
        borderBottom: this.isbottom
          ? "1px solid " + this.formlist.borderColor
          : "none",
        backgroundColor: this.formlist.borderBackColor,
      };
    },
    submitStyle() {
      let obj = {
        width: this.formlist.submitWidth + "px",
        height: this.formlist.submitHeight + "px",
        marginTop: this.formlist.submitTop + "px",
        backgroundColor: this.formlist.submitColor,
        color: this.formlist.submittextColor,
        borderRadius: this.formlist.submitborderRadius + "px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        borderWidth: this.formlist.submitborder + "px",
        borderColor: this.formlist.submitborderColor,
        borderStyle: "solid",
      }
     if(this.formlist.tempValue){
       obj['backgroundImage'] = `url(${this.formlist.tempValue})`
     }
      return obj;
    },
    codeStyle() {
      let data = this.formlist.codeborderList;
      return {
        borderRadius: this.formlist.codeBorder + "px",
        height: this.formlist.inputHeight + "px",
        fontSize: this.formlist.codeinputsize + "px",
        borderWidth: this.formlist.codeinputwidth + "px",
        borderLeft: this.isHave(data, "左")
          ? "1px solid " + this.formlist.codeborderColor
          : "none",
        borderRight: this.isHave(data, "右")
          ? "1px solid " + this.formlist.codeborderColor
          : "none",
        borderTop: this.isHave(data, "上")
          ? "1px solid " + this.formlist.codeborderColor
          : "none",
        borderBottom: this.isHave(data, "下")
          ? "1px solid " + this.formlist.codeborderColor
          : "none",
      };
    },
  },
  data() {
    return {
      requestUrl: "http://dev.mumway.com/index/activity/addServiceOffers", //test
      activeCity: "",
      show: false,
      form: formData,
      isedit: false,
      iscode: "获取验证码",
      timer: null,
      time: null,
    };
  },
  mounted() {
    vueobj.$on("datePickerVal", (val) => {
      this.$set(this.form, "expected_date", val);
    });
    vueobj.$on("setCity", (val) => {
      this.activeCity = val;
    });
    this.isedit = sessionStorage.getItem("iseditFlag");
  },
  methods: {
    isHave(data,key){
      data = data?data :[]
      return data.includes(key);
    },
    isselect(key) {
      let isselect = true;
      if (this.formlist.checkList) {
        let active = this.formlist["checkList"].filter((val) => {
          return val == key;
        });
        isselect = active.length;
      }
      return isselect;
    },
    showcityHandle() {
      this.isedit = sessionStorage.getItem("iseditFlag");
      if (this.isedit == 1) return;
      vueobj.$emit("cityPickershow");
    },
    showdate() {
      this.isedit = sessionStorage.getItem("iseditFlag");
      if (this.isedit == 1) return;
      vueobj.$emit("datepickershow");
    },
    valideForm() {
      let flag = true;
      if (this.isselect("姓名")) {
        if (!this.form.name) {
          vant.Toast.fail("请填写姓名！");
          flag = false;
          return flag;
        }
      }
      if (this.isselect("电话")) {
        if (!this.form.phone) {
          vant.Toast.fail("请填写手机号！");
          flag = false;
          return flag;
        }
        if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
          vant.Toast.fail("手机号码有误，请重填");
          flag = false;
          return flag;
        }
      }
      if (this.isselect("验证码")) {
        if (!this.form.code) {
          vant.Toast.fail("请填写验证码！");
          flag = false;
          return flag;
        }
      }

      if (this.isselect("日期")) {
        if (!this.form.expected_date) {
          vant.Toast.fail("请选择日期！");
          flag = false;
          return flag;
        }
      }
      if (this.isselect("地址")) {
        if (!this.activeCity) {
          vant.Toast.fail("请选择地址！");
          flag = false;
          return flag;
        }
      }
      return flag;
    },
    async submitForm() {
      this.isedit = sessionStorage.getItem("iseditFlag");
      if (this.isedit == 1) return;
      if (!this.valideForm()) return;
      let query = { ...this.form };
      query.city = this.activeCity;
      if (+this.formlist.interface != 4) {
        this.requestUrl =
          "http://dev.mumway.com/index/activity/addServiceOffers";
      } else {
        this.requestUrl =
          "https://saas-apis.mumway.com/clue/external/insure/v1/add-reservation";
      }
      let data = await axios.post(this.requestUrl, query);
      // vueobj.$emit('successPopSHow');
      // vant.Toast({
      //   message: this.formlist.submitSuccessText,
      //   type: "success",
      //   className: "minwidth",
      // });

      vueobj.$emit('successPopSHow');
      vueobj.$emit("ismStatistics", this.formlist.mid);
    },
    async getCode() {
      this.isedit = sessionStorage.getItem("iseditFlag");
      if (this.isedit == 1) return;
      if (!this.form.phone) {
        vant.Toast.fail("请填写手机号！");
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
        vant.Toast.fail("手机号码有误，请重填");
        return;
      }
      if (this.time > 0) return;
      let requesthttp =
        "https://saas-apis.mumway.com/hw/common/sms/send-code?phone=" +
        this.form.phone;
      let data = await axios.get(requesthttp);
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
<style scoped lang="scss">
.qk-form {
  .input-b {
    input {
      background: #fff;
      border: 1px solid #d2d2d2;
      border-radius: 4px;
      font-size: 0.35616rem;
      height: 40px;
      width: 200px;
      padding-left: 8px;
      cursor: pointer;
      &:focus {
        border: 1px solid #d2d2d2;
      }
    }
    .getCode {
      margin-left: 10px;
      text-align: center;
      width: 80px;
      font-size: 12px;
      padding: 0px 0px;
      border-radius: 15px;
      &:hover {
        background: transparent;
      }
    }
    .radioChoice {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .submit {
    position: relative;
    display: inline-block;
    button {
      background: #ccc;
      border-radius: 4px;
      width: 200px;
      height: 40px;
    }
    .imageBox {
      position: absolute;
      top: 0;
      z-index: -1;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>