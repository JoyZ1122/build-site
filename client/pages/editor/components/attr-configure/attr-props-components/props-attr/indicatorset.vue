<template>
<div>
  <el-form-item label="选择分页器大小：">
    <el-input-number
      size="mini"
      v-model="indicatorsetObj.width"
      controls-position="right"
      :min="0"
    />
  </el-form-item>
  <el-form-item label="选择分页器底部位置：">
    <el-input-number
      size="mini"
      v-model="indicatorsetObj.bottom"
      controls-position="right"
      :min="0"
    />
  </el-form-item>
  <el-form-item label="选择分页器右侧位置：">
    <el-input-number
      size="mini"
      v-model="indicatorsetObj.right"
      controls-position="right"
      :min="0"
    />
  </el-form-item>
  <el-form-item label="选择分页器颜色：">
        <el-color-picker show-alpha size="mini"  v-model="indicatorset.color"></el-color-picker>
      </el-form-item>
</div>
</template>

<script>
export default {
  name: "attr-qk-indicatorset",
  props: {
    indicatorset: {
      width: 8,
      bottom: 10,
      right: 10,
      color: "red",
    },
  },
  data() {
    return {
      indicatorsetObj: {
        width: 8,
        bottom: 10,
        right: 10,
        color: "#f755ad",
      },
    };
  },
  mounted() {
    this.indicatorsetObj = this.indicatorset;
  },
  watch: {
    indicatorset: {
      handler() {
        this.indicatorset = this.indicatorsetObj;
      },
      deep: true,
    },
    indicatorsetObj: {
      handler(newData) {
        this.$emit("update:indicatorset", newData);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
</style>
