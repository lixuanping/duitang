<template>
  <div>
    <!-- 头部 -->
    <header :class="{'active':active}">
      <span>
        <i class="icon-daohangfenlei iconfont"></i>
      </span>
      <div>
        <input type="text" v-show="bolle" :class="{'border':border}" placeholder="请输入您要搜索的商品" @keyup="Settext" v-model='search'>
      </div>
      <span @click="shou" class="search"><i class="icon-sousuo iconfont"></i></span>
    </header>
    <lun />
    <!-- 筛选 -->
    <ul class="top">
      <li v-for='(i,index) in res' v-text='i' @click='price(index)' :class="{'color':page==index}" :key='index'></li>
    </ul>
    <ul class="list">
      <li v-for='i in computedNews' @click="xiang(i.id)">
        <img :src="i.carousel_pictures[0].picture" alt="">
        <h3 v-text='i.inventory_caption'></h3>
        <p v-text='i.inventory_name' class="miao"></p>
        <p class="sales"><span>已售</span><span v-text='i.sold_quantity'></span></p>
        <p class="price"><span>￥</span><span v-text='i.origin_price'></span></p>
      </li>
    </ul>
  </div>
</template>

<script>
// 此页面实现了一开始从后端拿数据渲染  然后监听滚动条到了一定的位置改变头部颜色还有样式
// 点击搜索按钮可根据标题实现搜索  点击把商品信息存到sessionStorage
// 实现点击价格排序
import $ from "jquery";
import lun from "../Shang/Lun.vue"; //引入菜单下面的内容部分
export default {
  components: {
    lun
  },
  data() {
    return {
      arr: [],
      res: ["默认", "热度", "新品", "价格"],
      page: 0,
      search: "", //在搜索框输入内容的时候经行筛选功能
      judge: true, //排序用的
      bolle: false, //是否显示input 点击搜索图标的时候执行
      border: false, //显示边框 滚动条滑动的时候执行
      active: false //整个盒子的背景颜色还有字体颜色 滚动条滑动的时候执行
    };
  },
  computed: {
    aa() {
      //去vuex拿数据 然后进行筛选
      return this.$store.getters.getSearchText;
    },
    computedNews() {
      var newArr = this.arr.filter(function(item) {
          return item.inventory_caption.indexOf(this.aa) != -1;
        }.bind(this)
      );
      return newArr;
    }
  },
  methods: {
    shou: function() {
      //点击serach图标时候
      this.bolle = !this.bolle;
      this.border = !this.border;
    },
    Settext() {
      //把输入的内容存放在vuex
      this.$store.dispatch("setSearchText", this.search);
    },
    getNews() {
      var self = this;
      this.$loading.open(); //这个是让别的页面切换到此页面的时候有缓冲一下的效果
      $.ajax({
        //通过后端拿数据
        url: "http://localhost:18090/j",
        type: "get",
        data: {
          arr: []
        },
        success(a) {
          self.arr = a;
          self.$loading.close(); //这个是关闭缓冲效果
        }
      });
    },
    xiang: function(idd) {
      //拿到商品的id遍历
      for (var i = 0; i < this.arr.length; i++) {
        if (this.arr[i].id === idd) {
          var obj = JSON.stringify(this.arr[i]);
        }
      }
      //点击跳转到详情页并把内容存放到sessionStorage 而且让详情页的页面默认显示到上面
      window.sessionStorage.setItem("goodslist", obj);
      location.href = "#/Fxiang";
      $(window).scrollTop(0);
    },
    price: function(index) {
      //按价格排序 其余的排序没做
      this.page = index;
      var self = this;
      if (index == 3) {
        if (self.judge) {
          this.arr = this.arr.sort(function(a, b) {
            return a.origin_price - b.origin_price;
          });
        } else {
          this.arr = this.arr.sort(function(a, b) {
            return b.origin_price - a.origin_price;
          });
        }
        self.judge = !self.judge;
      }
    }
  },
  mounted() {
    //一开始执行函数 实现渲染  并且监听滚动条
    this.getNews();
    var self = this;
    window.addEventListener("scroll", function() {
      //监听滚动条到了一定位置搜索框发生改变
      if (window.scrollY > 150) {
        self.active = true;
      } else {
        self.active = false;
      }
    });
  }
};
</script>

<style  scoped>
/* 滚动条滚动的时候触发的类名 */
.active {
  background: rgba(163, 176, 182, 0.8);
  color: #fff;
}
.border {
  border-bottom: 0.01rem solid #fff;
}
/* 头部样式 */
header {
  height: 0.5rem;
  line-height: 0.5rem;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
  transition: all 0.8s;
}
header input {
  text-align: center;
  background: transparent;
  width: 78%;
  height: 0.4rem;
  outline: none;
  border: none;
  float: left;
  color: #fff;
}
header span {
  float: left;
  display: inline-block;
  height: 0.5rem;
  width: 0.4rem;
  text-align: center;
}
header .search {
  float: right;
}
header i {
  text-align: center;
  font-size: 0.2rem;
}

/* 点击选项卡的颜色 */
.color {
  color: rgb(70, 101, 148) !important;
}
/* 存放筛选 */
.top {
  height: 0.5rem;
  border-bottom: 0.01rem solid #ccc;
}
.top li {
  float: left;
  list-style: none;
  width: 25%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.16rem;
  color: #aaa;
}
/* 商品信息部分 */
.list {
  padding-top: 0.1rem;
  overflow: hidden;
  background: #fff;
  padding-left: 0;
}
.list li {
  background: #fff;
  float: left;
  list-style: none;
  width: 50%;
  padding: 0 0.08rem;
  position: relative;
  height: 3rem;
}
.list img {
  height: 1.8rem;
  width: 1.8rem;
}
/* 商品的描述    */
.list .miao {
  color: #aaa;
}
/* 商品的销量 */
.list .sales {
  position: absolute;
  left: 0.05rem;
  bottom: 0.2rem;
  color: #aaa;
}
/* 价钱 */
.list .price {
  color: red;
  position: absolute;
  left: 0.05rem;
  bottom: 0rem;
}
</style>
