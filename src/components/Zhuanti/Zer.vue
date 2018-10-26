<template>
<div class="box">
    <div class="yi">
        <div class="one">
            <p v-text='arr.stitle'></p>
            <h2 v-text='arr.description'></h2>
            <button>查看详情</button>
        </div>
    </div>
    <!-- 下面的可拖拽部分 -->
    <!-- <div class="swiper-container">
        <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for='i in res'>
                <img :src="i.pictures[1]" alt="">
                <p v-text='i.inventory_caption' class="username"></p>
                <p>
                    <span class="yuan">￥</span><span v-text='i.sale_price'  class="yuan"></span>
                </p>
            </li>
        </ul>
    </div> -->
</div>
   
</template>
  
<script>
import $ from "jquery";
// import Swiper from "swiper"; //引入swiper js
// import "../../css/swiper.min.css"; //引入swiper css

export default {
  data() {
    return {
      arr: [], //得到第二版的数据
      res: [] //得到第二版下面的可拖拽的数据
    };
  },
  methods: {
    getNews() {
      //请求后端拿专题部分数据
      var self = this;
      $.ajax({
        url: "http://localhost:18090/h",
        type: "get",
        success(a) {
          //这个a得到是专题的五个板块的所有数据
          self.arr = a[1]; //得到第二版的数据
          self.res = a[1].inventory_list; //得到第二版下面的可拖拽的数据
        }
      });
    }
  },
  mounted() {
    //用created也会报错 但是不影响画面生成
    this.getNews();
    // var swiper = new Swiper(".swiper-container", {
    //   slidesPerView: 3,
    //   spaceBetween: 10,
    //   observer: true, // 修改swiper自己或子元素时,自动初始化swiper
    //   observeParents: true // 修改swiper的父元素时,自动初始化swiper
    // });
  }
};
</script>

<style lang='scss' scoped>
// 大图还有里面的内容部分
.yi {
  background: url("../../images/er.jpeg") no-repeat;
  width: 100%;
  height: 2.07rem;
  position: relative;
  .one {
    width: 1.9rem;
    height: 1rem;
    text-align: center;
    background: transparent;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: rgb(29, 130, 170);
    p {
      margin-top: 0.05rem;
    }
    button {
      width: 1rem;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      border-radius: 0.1rem;
      background: transparent;
      color: blue;
      outline:none;
    }
  }
}
//下面的可往左拖拽部分
.swiper-container {
  height: 1.68rem;
  .swiper-slide {
    text-align: center;
    background: #fff;
    width: 25%;
    list-style: none;
    margin: 0 !important;
    padding-top: 0.1rem;
    img {
      width: 0.9rem;
      height: 0.9rem;
    }
    .username {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 90%;
    }
    .yuan {
      //现价
      color: red;
    }
  }
}
</style>
