<template>
  <div class="city_pop" v-if="showcity" @click="showcity=false">
    <div class="city_box" @click.stop>
      <div class="close" @click="showcity=false">X</div>
      <div class="top">城市选择</div>
      <div class="cont">
        <div class="cont-item" v-for="item in city_list" :key="item.en+'iscity'">
          <h2 :id="item.en">{{item.en}}</h2>
          <div class="city-item">
            <span
              @click="activeCityChange(city)"
              v-for="city in item.zh"
              :key="city+'cityName'"
            >{{city}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="right" @click.stop>
      <a v-for="item in character" :key="item" :href="'#'+item">{{item}}</a>
    </div>
  </div>
</template>
<script>
import vueobj from '@client/common/js/vueobj.js'

export default {
    name:'QkCity',
    data(){
        return{
          showcity:false,
          character: [],
          city_list: [],
          city:null,
        }
    },
  mounted() {
    this.getData();
    
    vueobj.$on('cityPickershow',()=>{
      this.showcity =true;
      document.body.style.overflow = 'hidden';
    })
  },
  methods: {
    getData() {
      const list = [
        { en: "B", zh: "北京" },
        { en: "C", zh: "长春" },
        { en: "C", zh: "成都" },
        { en: "C", zh: "重庆" },
        { en: "C", zh: "长沙" },
        { en: "D", zh: "东莞" },
        { en: "D", zh: "大连" },
        { en: "D", zh: "大同" },
        { en: "F", zh: "福州" },
        { en: "G", zh: "广州" },
        { en: "H", zh: "邯郸" },
        { en: "H", zh: "哈尔滨" },
        { en: "H", zh: "合肥" },
        { en: "H", zh: "杭州" },
        { en: "K", zh: "昆明" },
        { en: "N", zh: "宁波" },
        { en: "N", zh: "南昌" },
        { en: "N", zh: "南京" },
        // { en: 'N', zh: '南宁' },
        { en: "Q", zh: "青岛" },
        { en: "S", zh: "上海" },
        { en: "S", zh: "石家庄" },
        { en: "S", zh: "沈阳" },
        { en: "S", zh: "深圳" },
        { en: "S", zh: "苏州" },
        { en: "T", zh: "天津" },
        { en: "T", zh: "太原" },
        { en: "W", zh: "武汉" },
        { en: "W", zh: "无锡" },
        { en: "X", zh: "西安" },
        { en: "X", zh: "厦门" },
        { en: "Z", zh: "郑州" },
      ];
      let character = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "X",
        "Y",
        "Z",
      ];
      let obj = {},
        new_list = [];
      for (let i = 0; i < list.length; i++) {
        const cur = list[i];
        if (!obj[cur.en]) {
          new_list.push({
            en: cur.en,
            zh: [cur.zh],
          });
          obj[cur.en] = cur;
        } else {
          for (let j = 0; j < new_list.length; j++) {
            const element = new_list[j];
            if (element.en == cur.en) {
              let str = element.zh + "," + cur.zh;
              element.zh = str.split(",");
              break;
            }
          }
        }
      }
      character = new_list.filter((item) => character.includes(item.en));
      character = character.map((item) => item.en.toUpperCase()); //取出 字母
      character = new Set([...character]); //去重
      this.character = character;
      this.city_list = new_list;
    },
    activeCityChange(val){
        this.city = val;
        this.showcity = false;
        vueobj.$emit('setCity', val);
    },
    show(){
        this.showcity = true;
    },
    hide(){
        this.showcity = true;
      document.body.style.overflow = 'auto';
    }
  },
};
</script>

<style scoped lang="scss">
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: inherit;
  outline: none;
}

.city_pop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  .city_box {
    width: 100%;
    height: 70%;
    bottom: 0;
    position: absolute;
    left: 0;
    background: #fff;
    padding: 0.54795rem 0.54877rem;
    overflow: hidden;
    .close {
      position: absolute;
      top: 20px;
      left: 10px;
      font-size: 16px;
    }
    .top {
      text-align: center;
      font-size: 18px;
      color: #333;
      margin-bottom: 20px;
    }
  }
}
.city_pop,
.city_pop * {
  font-family: "ArialMT" !important;
}

.city_pop .right {
  position: absolute;
  height: 70%;
  padding: 5px 0px;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #2f83fd;
  overflow: hidden;
}

.city_pop .right a {
  flex: 1;
  padding: 0px 10px;
}

.city_pop .cont {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 30px;
}

.city_pop .cont .cont-item h2 {
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
  text-align: left;
}

.city_pop .cont .cont-item .city-item {
  display: flex;
  font-size: 14px;
  flex-wrap: wrap;
}

.city_pop .cont .cont-item .city-item span {
  color: #333;
  height: 33px;
  width: 20%;
  text-align: center;
  line-height: 33px;
  border: 1px solid #838383;
  border-radius: 6px;
  margin-right: 3%;
  margin-bottom: 15px;
}

.city_pop .cont .cont-item .city-item span:nth-child(4n) {
  margin-right: 0;
}

.city_pop .box {
  flex-wrap: wrap;
  display: flex;
}

.city_pop .box .item {
  width: 1.6rem;
  height: 0.8rem;
  text-align: center;
  line-height: 0.8rem;
  border: 0.013333rem solid #ccc;
  margin: 0.133333rem;
  border-radius: 0.106667rem;
  color: #666;
}
</style>