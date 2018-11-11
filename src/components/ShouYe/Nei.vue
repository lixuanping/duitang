<template>
    <div id="box">
        <!-- 下面三层是下拉加载需要标签 -->
        <mu-paper :z-depth="1" class="demo-loadmore-wrap">
            <mu-container ref="container" class="demo-loadmore-content">
                <mu-load-more :loading="loading" @load="load">
                    <!-- 下面这层是上拉刷新需要标签 -->
                    <mt-loadmore :top-method="loadTop" ref="loadmore">
                        <li v-for='(i,index) in arr' @click="xiang(index)" :key='index'>
                            <!-- 图片是懒加载v-lazy= -->
                            <img v-lazy="i.photo.path" :src="i.photo.path" alt="" class="datu">
                            <!-- <img v-lazy="i.photo.path" class="datu"> -->
                            <h4 v-text='i.msg' class="miao"></h4>
                            <p><i class="icon-xingxing iconfont"></i><span v-text='i.favorite_count'></span></p>
                            <div class="fuji">
                                <img :src="i.sender.avatar" alt="" class="touxiang">
                                <a v-text='i.sender.username'></a><span class="shouji" v-text="'收集到 '+i.album.name"></span>
                            </div>
                        </li>
                    </mt-loadmore>

                </mu-load-more>
            </mu-container>
        </mu-paper>
    </div>
</template>

<script>
//把数据存到sessionStorage  防止一回来就自动请求刷新页面
import $ from "jquery";
export default {
  data() {
    return {
      arr: [],
      loading: false,//下拉加载更多需要
      page:0//下拉加载更多发过去的参数 
    };
  },
  methods: {
    getNews() {
      //一开始发起请求渲染到页面
      var self = this;
      this.$loading.open(); //切换的时候有加载中字样
      $.ajax({
        url: "http://localhost:18090/b",
        type: "get",
        success(a) {
          for (var i = 0; i < a.length; i++) {
            if (a[i].photo.path) {
              self.arr = a;
            }
          }
          self.$loading.close(); //关闭加载中字样
          // 写入sessionStorage  防止一回来就自动请求刷新页面
          var obj = JSON.stringify(a);
          sessionStorage.setItem("goodslist", obj);
        }
      });
    },
    loadTop() {
      //上拉刷新  删除sessionStorage旧的数据 渲染新的数据
      this.$refs.loadmore.onTopLoaded();
      sessionStorage.removeItem("goodslist");
      this.getNews();
    },
    load() {
      this.page+=24
      //鼠标滚动到底部的时候加载再发起请求加载数据
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        var self = this;
        $.ajax({
          url: "http://localhost:18090/c",
          type: "get",
          data: {
            start: this.page
          },
          success(a) {
            for (var i = 0; i < a.length; i++) {
              self.arr = self.arr.concat(a[i]);
            }
          }
        });
      }, 1000);
    },
    xiang: function(index) {
      //点击跳转到详情页  并且把对应的信息存在sessionStorage 然后在详情页才能获取到信息
      var obj = JSON.stringify(this.arr[index]);
      window.sessionStorage.setItem("list", obj);
      location.href = "#/Sxiang";
      $(window).scrollTop(0);
    }
  },
  mounted() {
    // 判断sessionStorage有数据就用旧的  没有就发起请求  防止一回来就自动请求刷新页面
    var obj = JSON.parse(sessionStorage.getItem("goodslist"));
    if (obj) {
      this.arr = obj;
    } else {
      this.getNews();
    }
  }
};
</script>

<style  scoped>
.demo-loadmore-wrap {
  width: 100%;
  background: #eee;
  border: 0.01rem solid #ccc;
  margin-bottom: 0.5rem;
}
.demo-loadmore-wrap li {
  box-shadow: 0.02rem 0.02rem 0.02rem #ccc;
  float: left;
  list-style: none;
  width: 1.65rem;
  margin-top: 0.2rem;
  margin-left: 0.1rem;
}
/* 描述 */
.miao {
  width: 45%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 大图 */
.datu{
  width: 1.65rem;
  height: 2.4rem;
}
.icon-xingxing {
  margin-right: 0.05rem;
  color: #aaa;
}
/* 装头像还有收集地址的盒子 */
.fuji {
  position: relative;
}
/* 头像 */
.touxiang {
  position: absolute;
  top: 0.02rem;
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
}
/* 收集 */
a,
.shouji {
  display: inline-block;
  width: 90%;
  padding-left: 16%;
  color: blue;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.shouji {
  color: #000;
}
</style>
