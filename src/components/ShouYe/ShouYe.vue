<template>
  <div>
      <header :class="{'active':active}">
        <span>
          <i class="icon-daohangfenlei iconfont"></i>
        </span>
        <div>
          <input type="text" v-show="bolle" :class="{'border':border}" placeholder="请输入您要搜索的商品">
        </div>
        <span @click="shou" class="search"><i class="icon-sousuo iconfont"></i></span>
      </header>
    <lun />
    <Nei />
  </div>
</template>

<script>
import lun from "../Shang/Lun.vue"; //引入菜单下面的内容部分
import Nei from "./Nei.vue"; //引入菜单下面的内容部分
export default {
  name:'ShouYe',
  components: {
    lun,
    Nei,
  },
  data() {
    return {
      active: false,//整个盒子的背景颜色还有字体颜色
      bolle: false,//是否显示input
      border:false//显示边框
    }
  },
  methods:{
    shou:function(){//点击serach图标时候
      this.bolle=!this.bolle
      this.border=!this.border
      $("input").animate({left:'250px'});
    }
  },
  mounted() {
    var self = this;
    window.addEventListener("scroll", function() {
      if (window.scrollY > 150) {
        self.active = true;
      } else {
        self.active = false;
      }
    });
  }
};
</script>

<style scoped>
/* 动画 */
header {
  transition: all 0.8s;
}
.active {
  background: rgba(163, 176, 182, 0.8);
  color: #fff;
}
.border{
  border-bottom: .01rem solid #fff;
}
/* 头部样式 */
header {
  height: 0.5rem;
  line-height: 0.5rem;
  width: 100%;
  background: transparent;
  position: fixed;
  top: 0;
  z-index: 100;
}
header input {
  text-align: center;
  background: transparent;
  width: 78%;
  height: 0.4rem;
  outline: none;
  border: none;
  float: left;
  color:#fff;
}
header span {
  float: left;
  display: inline-block;
  height: 0.5rem;
  width: 0.4rem;
  text-align: center;
}
header .search{
  float: right;
}
header i {
  text-align: center;
  font-size: 0.2rem;
}
</style>
