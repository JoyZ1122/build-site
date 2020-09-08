<template>
  <div>
    <el-form-item label="请输入埋点id">
      <el-input size="mini" type="text" placeholder="请输入埋点id" v-model="submit.mid"></el-input>
    </el-form-item>
    <el-form-item label="请输入提交成功文案：">
      <el-input size="mini" type="text" placeholder="请输入表单成功文字" v-model="submit.tempText"></el-input>
    </el-form-item>
    <el-form-item label="接口分类：">
      <el-select v-model="submit.interface" placeholder="请选择" size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "attr-qk-submitbtndata",
  props: {
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
  data() {
    return {
      submit: {
        tempText: null,
        interface: 1,
        mid: "",
      },
      options: [
        {
          value: 1,
          label: "月嫂，保姆，育儿嫂",
        },
        // {
        //   value: 4,
        //   label: "保险",
        // },
        // {
        //   value: 5,
        //   label: "中诚德汇",
        // },
      ],
    };
  },
  mounted() {
    this.tempText = this.submitsuccesstext;
  },
  watch: {
    submit: {
      handler(newdata) {
        this.$emit("update:submitbtndata", newdata);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.submit = this.submitbtndata;
  },
};
</script>

<style scoped>
</style>
