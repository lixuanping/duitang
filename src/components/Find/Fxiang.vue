<template>
    <div id='box'>
        <header>
            <span @click="tui">X</span><span>商品详情</span>
            <div class="car">
              <i class="icon-gouwuche iconfont" @click="car"></i>
              <span class="zong" v-show='zong>0' v-text='zong'></span>
            </div>
        </header>
        <mt-swipe :auto="0">
          <mt-swipe-item v-for='i in res'>
            <img :src="i.picture" alt="">
          </mt-swipe-item>
        </mt-swipe>
        <!-- 下面的商品信息部分 -->
        <div class="shouping">
            <p class="yi">
                <span class="price">￥{{arr.sale_price}}</span>
                <span class="del-price">￥{{arr.market_price+1}}</span>
                <span class="sale">已售{{arr.sold_quantity}}</span>
            </p>
            <p class="er">{{arr.inventory_caption}}</p>
            <p class="san">{{arr.inventory_name}}</p>
            <p class="si"><span>运费</span><span class="you">满88元包邮 不足需支付运费需8.00元</span></p>
            <p class="wu"><span>配送</span><span class="dizhi">{{arr.supplier_name}}</span></p>
            <p class="number">
              <span>购买数量</span>
              <button @click="jian">-</button>
              <input type="type" v-model='num' class="">
              <button @click="add">+</button>
            </p>
            <p class="liu">
              <span class="one">正品保障</span>
              <span>一小时客服响应</span>
              <span class="two">7天无忧退款</span>
            </p>
        </div>
        <p class="qi"></p>
        <!-- 小编推荐 -->
        <div class="xin">
          <p class="bian">小编推荐</p>
          <p>{{arr.inventory_desc}}</p>
        </div>
         <!-- 底部  -->
        <ul class="footer">
          <li class="yi">
            <i class="icon-gouwuche iconfont"></i>
            <span class="qty" v-show='totel>0'>{{totel}}</span>
          </li>
          <li class="two" @click='btn'>加入购物车</li>
          <li class="two shree">立即购买</li>
      </ul>
    </div>
</template>

<script>
// 此页实现的功能是  先在computed 拿到存储在sessionStorage得商品信息 渲染要页面 
// 然后一开始就发起请求 拿到购物车的所有商品  遍历商品  如果购物车有此商品 则获取要添加的数量 和此商品在数据库的数量
//相加发给后端进行数据修改  具体赋值看return的备注 然后商品的数量大于零的时候就可以显示出来
import Vue from "vue";
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(Mint);
import $ from "jquery";

export default {
  components: {

  },
  data() {
    return {
      arr: [],//详情页的商品数据
      res: [],//详情页的轮播图
      num: 0,//选择购买的数量
      qty:0,//购物车此件商品的数量
      totel:0,//购物车此件商品的数量加上要购买的数量  也是判断是否显示数量的条件
      zong:0//购物车的所有商品数量  写在上边
    };
  },
  computed: {
    sessionStorage() {
      return window.sessionStorage.getItem("goodslist");
    }
  },
  methods: {
    car:function(){
      location.href="#/Car"
    },
    //点击上边的X回到列表页
    tui: function() {
      location.href = "#/Footer/faxian";
      // $(window).scrollTop(this.scrollY);
      $(window).scrollTop(1000);

    },
    add: function() {
      //点击加的时候
      this.num++;
    },
    jian: function() {
      //点击减的时候
      this.num--;
      if (this.num <= 0) {
        this.num = 0;
      }
    },
    //点击加入购物车
    btn: function() {
      var a =Number(this.num);
      var b = Number(this.qty);
      this.totel = (b+=a)
      
      $.ajax({
        url: "http://localhost:18090/k",
        type: "get",
        data: {
          id: this.arr.id,
          img: this.arr.pictures[0],
          title: this.arr.inventory_name,
          price: this.arr.origin_price,
          qty: this.totel
        },
        success(a) {

        }
      });
    },
    getNews(){//一开始获取到购物车所有的商品
      var self = this
      this.$loading.open();
      $.ajax({
        url: "http://localhost:18090/l",
        type: "get",
        success(a) {
          //便利购物车的商品 得到此件商品的数量 赋值给qty
          for (var i = 0; i <a.length; i++) {
            if (a[i].id == self.arr.id) {
              self.qty = a[i].qty
              break;
            } else {
              self.qty =0;
            }
          }
          var c = Number(self.num);
          var b = Number(self.qty);
          self.totel = (c+=b)
       
          //得到购物车的总数量
          self.zong=0
          for (var i = 0; i <a.length; i++) {
            self.zong+=Number(a[i].qty)
          }
          self.$loading.close();
        }
      });
    }
  },
  created() {
    //因为从上到下执行的缘故 所以不能用mounted生命周期 用这个就会先获得数据再渲染
    this.arr = JSON.parse(this.sessionStorage);
    this.res = this.arr.carousel_pictures;
    this.getNews()//一开始发起请求
  }
};
</script>

<style scoped>
/* ui的样式 */
.mint-swipe {
  height: 4.14rem;
  width: 100%;
}
.mint-swipe img {
  height: 4.14rem;
  width: 100%;
}
header {
  height: 0.5rem;
  line-height: 0.5rem;
  background: #fff;
  border-bottom: 0.01rem solid #ccc;
  font-size: 0.2rem;
}
header span {
  margin-left: 0.1rem;
}
.car{
  height: 0.5rem;
  line-height: 0.5rem;
  width: 0.6rem;
  float: right;
  position: relative;
}
.car .icon-gouwuche{
  float: right;
  font-size: .35rem;
  padding-right: .15rem;
}
.car span{
  width:.25rem;
  height: .25rem;
  background: red;
  position: absolute;
  top:.02rem;
  right:.05rem;
  border-radius: 50%;
  color: #fff;
  font-size: .14rem;
  line-height: .25rem;
  text-align: center;
}


/* 商品参数部分 */
.shouping {
  padding: 0 0.1rem;
}
.shouping .yi {
  height: 0.4rem;
  line-height: 0.4rem;
}
/* 现价钱 */
.yi .price {
  color: red;
  font-size: 0.16rem;
}
/* 原价 */
.yi .del-price {
  color: #aaa;
}
/* 销量 */
.sale {
  color: #aaa;
  float: right;
  font-size: 0.14rem;
}

.shouping .er {
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.14rem;
}
.shouping .san {
  font-size: 0.18rem;
  color: #000;
}
/* 邮费 */
.shouping .si span {
  font-size: 0.14rem;
}
.si .you {
  margin-left: 0.3rem;
}
/* 配送地址 */
.wu {
  margin-top: 0.2rem;
}
.wu span {
  font-size: 0.14rem;
}
.dizhi {
  margin-left: 0.3rem;
  font-size: 0.14rem;
}
/* 购买数量 */
.number {
  height: 0.4rem;
  padding-top: 0.07rem;
}
.number span {
  color: red;
  font-size: 0.18rem;
  margin-right: 0.1rem;
}
.number input {
  width: 0.3rem;
  text-align: center;
  margin: 0 0.05rem;
  background: #fff;
  border: none;
  outline: none;
}
.number button {
  width: 0.28rem;
  height: 0.28rem;
  background: #fff;
  border: none;
  outline: none;
  font-size: 0.2rem;
}
/* 三个保障 */
.liu {
  text-align: center;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #aaa;
}
.liu span {
  font-size: 0.14rem;
}
.liu .one {
  float: left;
}
.liu .two {
  float: right;
}
/* 一条灰线  */
.qi {
  height: 0.2rem;
  background: #ddd;
}
/* 小编推荐部分 */
.xin {
  padding: 0 0.1rem;
  margin-bottom: 0.6rem;
  overflow: hidden;
}
.xin p {
  font-size: 0.14rem;
}
.xin .bian {
  font-size: 0.16rem;
  color: rgb(0, 0, 0);
  height: 0.4rem;
  line-height: 0.4rem;
}
/* 底部 */
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: #fff;
  padding: 0;
  margin: 0;
}
.footer  li {
  float: left;
  height: 0.5rem;
  width: 15%;
  text-align: center;
  list-style: none;
  line-height: 0.5rem;
  font-size: 0.16rem;
}
.footer  .yi {
  position: relative;
}
.footer .yi i {
  font-size: 0.26rem;
}
.footer  .two {
  width: 42.5%;
  border-left: 1px solid #ccc;
}
.footer .shree {
  background: rgba(250, 2, 2, 0.87);
  color: #fff;
}
/* 数量 */
.footer .qty {
  display: inline-block;
  width: 0.2rem;
  height: 0.2rem;
  line-height: 0.2rem;
  background: red;
  color: #fff;
  position: absolute;
  top: 0.05rem;
  right: 0.06rem;
  border-radius: 50%;
  font-size: 0.12rem;
}
</style>
