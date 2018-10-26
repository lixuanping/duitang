<template>
  <div>
    <ul class="top">
      <li v-for='(i,index) in res' v-text='i' @click='toggle(index)' :class="{'active':page==index}" :key='index'></li>
    </ul>
    <ul class="list">
      <li v-for='(i,num) in arr' @click="xiang(num)">
        <img :src="i.carousel_pictures[0].picture" alt="">
        <h3 v-text='i.inventory_caption'></h3>
        <p v-text='i.inventory_name' class="miao"></p>
        <p class="sales"><span>已售</span><span v-text='i.sold_quantity'></span></p>
        <p class="price"><span>￥</span><span v-text='i.origin_price'></span></p>
      </li>
    </ul>
    <Footer />
  </div>
</template>

<script>
import Footer from "../Footer.vue"; //引入底部
import $ from "jquery"; //引入jq
export default {
  components: {
    Footer
  },
  data() {
    return {
      arr: [],
      res: ["默认", "热度", "新品", "价格"],
      page: 0,
      judge: true //排序用的
    };
  },
  methods: {
    getNews() {
      var self = this;
      $.ajax({
        //通过后端拿数据
        url: "http://localhost:18090/j",
        type: "get",
        data: {
          arr: []
        },
        success(a) {
          self.arr = a;
        }
      });
    },
    xiang: function(num) {
      //点击跳转到详情页
      var obj = JSON.stringify(this.arr[num]);
      window.sessionStorage.setItem("goodslist", obj);
      location.href = "#/Fxiang";
      $(window).scrollTop(0);
    },
    toggle: function(index) {
      this.page = index;
      var self = this;
      if (index == 3) {
        //按价格排序 其余的排序没做
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
    this.getNews();
  }
};
</script>

<style  scoped>
.active {
  color: rgb(70, 101, 148) !important;
}
/* 头部 */
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
