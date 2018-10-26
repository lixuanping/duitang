<template>
  <div id='box'>
    <header>
      <span @click="tui">X</span><span>购物车</span><span @click="del">删除已选</span>
    </header>
    <div class="zongji">
      <input type="checkbox" id='checkbox' @click="quan" :checked="aa">
      <div>
        <span class="logo">堆糖</span>
        <span class="yun">堆糖商店（邮费：8元）</span>
        <span class="num">共{{arr.length}}件</span>
      </div>
    </div>
    <ul class="car">
      <li v-for='(i,index) in arr'>
        <div class="left">
          <input type="checkbox" v-model="i.none">
          <img :src="i.url" alt="">
        </div>
        <div class="right">
          <h3 v-text='i.title'></h3>
          <div>
            <span class="price">￥{{i.price}}</span>
            <p><span @click='jian(i)'>-</span><span>{{i.qty}}</span><span @click="add(i)">+</span></p>
          </div>
        </div>
      </li>
    </ul>
    <footer>
      <input type="checkbox" id='checkbox' @click="quan" :checked="aa">
      <p class="xuan">
        <span>全选</span>
      </p>
      <div class="jiesuan">
        结算<span></span>
      </div>
      <div class="zongjia">
        <p><span>商品总计:￥</span><span>{{allPrice.toFixed(2)}}</span></p>
      </div>
    </footer>
  </div>
</template>
<script scoped>
//一开始拿出数据的时遍历  给它们加一个属性item.a=false（因为一开始不要勾选)
//然后给商品的勾选框绑双向数据绑定 v-model="i.a"  这样就可以监听到它们的状态
//点击全选的的时候 遍历数组  把它们的a属性改为true  这样就实现了点击全选 下面全部勾选的功能（但是再次点击时下面的不会取消）
//然后在computed放一个函数  every函数  是所有的满足才会返回true  否则就是false  监听每一个勾选框的状态
//当所有的勾选了 才会返回true 所以给全选框加一个 :checked='computed里面的函数'
//这样就可以实现下面全选的时候 全选框也会勾选  注意这个函数的return
//然后点击全选的时候 还是遍历这个数组  判断它每一项的a属性都不等于computed里面函数
//就是computed里面函数要么全部选中的时候为true 这时候遍历  让它每一项不等于true 即点击全选以后以后让它们全部不要勾选
//反过来就是有一项不满足的时候即是false 点击全选的时候 让它们每一项都不等于false 即全部勾选
//然后在computed封装一个函数  return出它的结果  判断的条件就是它的每一项的a属性是否等于true  即是否勾选了
//这样就可以实现了购物车的功能 （主要是实时监听 即要双向数据绑定）
export default {
  data() {
    return {
      arr: []
    };
  },
  computed: {
    aa: function() {
      return this.arr.every(function(item) {
        return item.none;
      });
    },
    allPrice() {
      //总价
      var price = 0;
      this.arr.forEach(item => {
        if (item.none) {
          price += item.price * item.qty;
        }
      });
      return price;
    }
  },
  methods: {
    tui: function() {
      //点击退回详情页
      location.href = "#/Fxiang";
    },
    del() {
      //点击删除
      var res = [];
      this.arr.forEach(item => {
        if (item.none == true) {
          res.push(item);
        }
      }); //得到勾选中的商品
      var abc = [];
      //就相当于每遍历一次给加一个属性 当两件商品一样的时候就改变那件商品为false 所以后面得到的都是不一样的
      for (var i = 0; i < this.arr.length; i++) {
        let fang = true;
        for (var j = 0; j < res.length; j++) {
          if (this.arr[i].id == res[j].id) {
            fang = false;
          }
        }
        if (fang) {
          abc.push(this.arr[i]);
        }
      }
      this.arr = abc;
    },
    quan: function() {
      //点击上面还有下面的全选时候
      var self = this.aa;
      this.arr.forEach(function(item) {
        item.none = !self;
      });
    },
    add: function(goods) {
      //点击加
      goods.qty++;
    },
    jian: function(goods) {
      //点击减
      if (goods.qty > 1) {
        goods.qty--;
      }
    },
    getNes() {
      //一开始请求数据库  拿到商品的数量
      var self = this;
      $.ajax({
        url: "http://localhost:18090/l",
        type: "get",
        success(a) {
          a.forEach(function(item) {
            item.none = false;
          });
          self.arr = a;
        }
      });
    }
  },
  mounted() {
    this.getNes();
  }
};
</script>

<style scoped>
#box {
  background: #fff;
}
/* 头部 */
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
/* 头部下面的总计 */
.zongji {
  height: 0.5rem;
  background: #fff;
  border-bottom: 0.01rem solid #ccc;
}
input {
  float: left;
  width: 0.2rem;
  height: 0.2rem;
  margin-top: 0.15rem;
  margin-left: 0.1rem;
}
/* 右部分 */
.zongji div {
  height: 0.5rem;
  line-height: 0.5rem;
  float: left;
}
/* 商店名字部分 */
.zongji div .logo {
  display: inline-block;
  width: 0.5rem;
  height: 0.25rem;
  background: red;
  color: #fff;
  text-align: center;
  margin-top: 0.1rem;
  line-height: 0.25rem;
  margin-left: 0.2rem;
}
/* 运费部分 */
.yun {
  color: #aaa;
  font-size: 0.14rem;
  margin-left: 0.05rem;
}
/* 总数 */
.num {
  position: absolute;
  right: 0.1rem;
}

/* 商品部分 */
.car {
  padding-bottom: 0.8rem;
}
.car li {
  list-style: none;
  height: 1rem;
  border-bottom: 0.01rem solid #ccc;
  padding-right: 0.05rem;
}
/* 放勾选框的盒子 */
.car .left {
  height: 1rem;
  line-height: 1rem;
  float: left;
  position: relative;
}
/* 勾选框 */
.car li input {
  width: 0.2rem;
  height: 0.2rem;
  margin-top: 0.35rem;
  margin-left: 0.1rem;
  display: inline-block;
}
/* 照片 */
.car li img {
  height: 0.98rem;
  width: 1rem;
  margin-left: 0.1rem;
}
/* 右边的盒子 */
.car .right {
  float: left;
  height: 1rem;
  width: 2.2rem;
  position: relative;
}
/* 放着价钱还有加减的盒子 */
.car .right div {
  position: absolute;
  bottom: 0.05rem;
  left: 0;
  font-size: 0.15rem;
  width: 100%;
}
/* 放着加减的盒子 */
.car .right div p {
  float: right;
}
.car .right div p span {
  display: inline-block;
  width: 0.3rem;
  height: 0.2rem;
  background: #ccc;
  color: #aaa;
  text-align: center;
  line-height: 0.2rem;
  margin: 0 0.02rem;
}
/* 底部 */
footer {
  height: 0.8rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: #fff;
  border-top: 0.01rem solid #eee;
}
footer input {
  margin-top: 0.3rem;
}
/* 全选 */
footer .xuan {
  float: left;
  height: 0.8rem;
  line-height: 0.8rem;
  padding-left: 0.1rem;
  font-size: 0.16rem;
}
/* 总价 */
footer .zongjia {
  float: right;
  height: 0.8rem;
  line-height: 0.8rem;
  width: 1.5rem;
  font-size: 0.16rem;
}
/* 结算 */
footer .jiesuan {
  float: right;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  color: #fff;
  background: rgba(105, 207, 10, 0.7);
  width: 1.2rem;
  font-size: 0.18rem;
}
</style>
