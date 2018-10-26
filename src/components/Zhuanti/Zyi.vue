<template>
<div class="box">
     <div class="yi">
        <div class="one">
            <div class="nei">
                <p v-text='arr.description'></p>
                <p><yd-countdown time="2018/10/23 21:00:00"></yd-countdown></p>           
                <p>查看详情--></p>
            </div>
        </div>      
    </div>
    <!-- 下面的可拖拽部分 -->
    <!-- <div class="swiper-container">
        <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for='i in res'>
                <img :src="i.pictures[0]" alt="">
                <p>
                    <span class="yuan">￥</span><span v-text='i.vip_sale_price' class="yuan qian"></span>
                    <span class="del">￥</span><span v-text='i.sale_price'  class="del"></span>
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
      arr: [], //得到第一版的数据
      res: [],//得到第一版下面的可拖拽的数据
      time:''//时间
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
          var abc = a[0].disabled_at_str //得到时间 2018-10-23 21:00:00 因为插件要使用斜杠
          self.time = abc.split('-')[0]+'/'+ abc.split('-')[1]+'/'+abc.split('-')[2]
          console.log(self.time)
          //这个a得到是专题的五个板块的所有数据
          self.arr = a[0]; //得到第一版的数据
          self.res = a[0].inventory_list; //得到第一版下面的可拖拽的数据
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
  background: url("../../images/yi.jpeg") no-repeat;
  width: 100%;
  height: 2.07rem;
  position: relative;
  .one {
    width: 2rem;
    height: 1.08rem;
    border: 0.01rem solid #fff;
    background: transparent;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .nei {
      background: #fff;
      text-align: center;
      margin: 0.07rem;
      p {
        height: 0.3rem;
        line-height: 0.3rem;
        font-size:.14rem;
      }
    }
  }
}
//下面的可往左拖拽部分
.swiper-container {
  height: 1.68rem;
  margin-bottom: 0.5rem;
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
    .del {
      //原价
      text-decoration: line-through;
      color: #aaa;
    }
    .qian {
      margin-right: 0.1rem;
    }
  }
}
</style>
