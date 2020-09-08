<template>
  <div>
    <div class="classify-box">
      <p>功能属性选择</p>
      <el-form-item label="输入埋点id：">
        <el-input v-model="form.mid"/>
      </el-form-item>
      <el-form-item label="选择元素：" class="checkbox">
        <el-checkbox-group v-model="form.checkList">
        <el-checkbox
          v-for="(item,index) in form.btn "
          :label="item.label"
          :key="index+'phone'"
        ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="接口分类：">
        <el-select v-model="form.interface" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="添加输入框：">
        <el-button @click="addNewelement">添加</el-button>
        <div style="display:flex;margin-top:10px;" v-for="(item,index) in form.inputList" :key="item.key+'set'">
          <el-input @change="inputChange(index)"  v-model="activeInput[index]" placeholder="请输入键值" />
          <el-button @click="deletNewelement(index)">删除</el-button>
        </div>
      </el-form-item>
    </div>
    <div class="classify-box">
      <p>输入框属性选择</p>
      <el-form-item label="选择圆角大小：">
        <el-input-number size="mini" v-model="form.border" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="选择input字体大小：">
        <el-input-number size="mini" v-model="form.inputsize" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="选择边距：">
        <el-input-number size="mini" v-model="form.marginval" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="选择输入框宽度：">
        <el-input-number size="mini" v-model="form.inputwidth" controls-position="right" :min="10" />
      </el-form-item>
      <el-form-item label="提交输入框高度：">
        <el-input-number size="mini" v-model="form.inputHeight" controls-position="right" :min="10" />
      </el-form-item>
      <el-form-item label="选择输入框边框：" class="checkbox">
        <el-checkbox-group v-model="form.borderList">
          <el-checkbox label="上"></el-checkbox>
          <el-checkbox label="下"></el-checkbox>
          <el-checkbox label="左"></el-checkbox>
          <el-checkbox label="右"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="选择边框颜色：">
        <el-color-picker show-alpha size="mini"  v-model="form.borderColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="选择边框背景色色：">
        <el-color-picker show-alpha size="mini"  v-model="form.borderBackColor"></el-color-picker>
      </el-form-item>
    </div>
    <div class="classify-box">
      <p>验证码按钮属性选择</p>
      <el-form-item label="选择圆角大小：">
        <el-input-number size="mini" v-model="form.codeBorder" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="选择input字体大小：">
        <el-input-number size="mini" v-model="form.codeinputsize" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="选择输入框宽度：">
        <el-input-number size="mini" v-model="form.codeinputwidth" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="选择输入框边框：" class="checkbox">
        <el-checkbox-group v-model="form.codeborderList">
          <el-checkbox label="上"></el-checkbox>
          <el-checkbox label="下"></el-checkbox>
          <el-checkbox label="左"></el-checkbox>
          <el-checkbox label="右"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="选择边框颜色：">
        <el-color-picker show-alpha size="mini"  v-model="form.codeborderColor"></el-color-picker>
      </el-form-item>
    </div>
    <div class="classify-box">
      <p>提交按钮属性选择</p>
      <el-form-item label="提交按钮上边距：">
        <el-input-number size="mini" v-model="form.submitTop" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="提交按钮宽度：">
        <el-input-number size="mini" v-model="form.submitWidth" controls-position="right" :min="10" />
      </el-form-item>
      <el-form-item label="提交按钮高度：">
        <el-input-number size="mini" v-model="form.submitHeight" controls-position="right" :min="10" />
      </el-form-item>
      <el-form-item label="提交按钮边框：">
        <el-input-number size="mini" v-model="form.submitborder" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="提交按钮边框颜色：">
        <el-color-picker show-alpha size="mini"  v-model="form.submitborderColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="提交按钮圆角：">
        <el-input-number size="mini" v-model="form.submitborderRadius" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="提交按钮背景色：">
        <el-color-picker show-alpha size="mini"  v-model="form.submitColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="提交按钮字体颜色：">
        <el-color-picker show-alpha size="mini"  v-model="form.submittextColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="提交按钮文字：">
        <el-input v-model="form.submitText"/>
      </el-form-item>
      <el-form-item label="提交成功提示：">
        <el-input type="textarea"  v-model="form.submitSuccessText"/>
      </el-form-item>
      <el-form-item class="flexColumn" label="提交按钮背景图片：">
        <imageSelect :url.sync="form.tempValue" />
      </el-form-item>
    </div>
  </div>
</template>

<script>
import formData from '@client/utils/submitdata'
import imageSelect from '@client/components/image-select'
export default {
  name: "attr-qk-formlist",
  components:{
    imageSelect
  },
  props: {
    formlist: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      Width: "10",
      form: formData,
      options:[
        {
          value:1,
          label:'月嫂'
        },
        {
          value:2,
          label:'保姆'
        },
        {
          value:3,
          label:'育儿嫂'
        },
        {
          value:4,
          label:'保险'
        },
      ],
      activeInput:[]
    };
  },
  watch: {
    form: {
      handler() {
        this.$emit("update:formlist", this.form);
      },
      deep: true,
    },
    formlist:{
       handler(newdata) {
        this.form = newdata;
      },
      deep: true,
    }
  },
  mounted(){
    this.form = this.formlist;
  },
  methods:{
    addNewelement(){
      this.form.inputList = this.form.inputList?this.form.inputList:[];
      let obj = {
        key:'text'+(this.form.inputList.length+1),
        placeholder:''
      }
      this.form.inputList.push(obj);
    },
    deletNewelement(i){
      this.form.inputList.splice(i,1);
    },
    inputChange(i){
      this.form.inputList[i].placeholder = this.activeInput[i];
    }
  }
};
</script>

<style scoped lang="scss">
.checkbox{
  overflow: hidden;
  display: flex;
  /deep/ .el-form-item__label{
    flex-shrink: 0;
    // font-size: 12px;
  }
}
.flexColumn{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.classify-box{
  p{
    margin-left: 5px;
    font-size: 14px;
    font-weight: bold;
  }
  .el-form-item{
    margin-left:15px;
    margin-bottom:15px;
    .el-form-item__label{
    // font-size: 12px;
  }
  }
}
</style>
