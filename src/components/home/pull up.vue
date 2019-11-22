<template>
  <!-- 下面三层是下拉加载需要标签 -->
  <mu-paper :z-depth="1" class="demo-loadmore-wrap">
    <mu-container ref="container" class="demo-loadmore-content">
      <mu-load-more :loading="loading" @load="load">
        <!-- 下面这层是上拉刷新 -->
        <mt-loadmore :top-method="loadTop" ref="loadmore">

          <div id="vm" class="pubu" v-cloak>
            <!-- 左边盒子 -->
            <ul id="show" class="yg yg_l">
              <li v-for="(item,index) in showwz" v-if="index%2==0" :key='index' @click="xiang(index)">
                <div style="position: relative;">
                  <!-- <img :src="item.photo.path" alt=""> -->
                  <img v-lazy="item.photo.path" :src="item.photo.path">
                  <h4 v-text='item.msg'></h4>
                  <p><i class="icon-xingxing iconfont"></i><span v-text='item.favorite_count'></span></p>
                  <div class="fuji">
                    <img :src="item.sender.avatar" alt="" style='width:0.2rem;height:0.2rem;border-radius: 50%;
             position: absolute; top: 0.02rem;' />
                    <a v-text='item.sender.username'></a><span class="shouji" v-text="'收集到 '+item.album.name"></span>
                  </div>
                </div>
              </li>
            </ul>
            <!-- 右边盒子 -->
            <ul class="yg yg_r">
              <li v-for="(item,index) in showwz" v-if="index%2==1" :key='index' @click="xiang(index)">
                <div style="position: relative;">
                  <!-- <img :src="item.photo.path" alt=""> -->
                  <img v-lazy="item.photo.path" :src="item.photo.path">
                  <h4 v-text='item.msg' class="miao"></h4>
                  <p><i class="icon-xingxing iconfont"></i><span v-text='item.favorite_count'></span></p>
                  <div class="fuji">
                    <img :src="item.sender.avatar" alt="" style='width:0.2rem;height:0.2rem;border-radius: 50%;position: absolute; top: 0.02rem;'>
                    <a v-text='item.sender.username'></a><span class="shouji" v-text="'收集到 '+item.album.name"></span>
                  </div>
                </div>
              </li>
            </ul>
            <div style="clear: both;"></div>
          </div>

        </mt-loadmore>

      </mu-load-more>
    </mu-container>
  </mu-paper>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      showwz: [],
      loading: false, //下拉加载更多需要
      page: 0 //下拉加载更多发过去的参数
    };
  },
  methods: {
    getwz: function() {
      var that = this;
      this.$loading.open(); //切换的时候有加载中字样
      $.ajax({
        url: "http://localhost:18090/b",
        type: "get",
        success(a) {
          for (var i = 0; i < a.length; i++) {
            if (a[i].photo.path) {
              that.showwz = a;
            }
          }
          that.$loading.close(); //关闭加载中字样
        }
      });
    },
    loadTop() {
      //上拉刷新
      this.$refs.loadmore.onTopLoaded();
      this.getwz();
    },
    load() {
      //鼠标滚动到底部的时候加载再发起请求加载数据
      this.page += 24;
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
              self.showwz = self.showwz.concat(a[i]);
            }
          }
        });
      }, 1000);
    },
    xiang: function(index) {
      //点击跳转到详情页  并且把对应的信息存在sessionStorage 然后在详情页才能获取到信息
      var obj = JSON.stringify(this.showwz[index]);
      window.sessionStorage.setItem("list", obj);
      location.href = "#/Sxiang";
      $(window).scrollTop(0);
    }
  },
  mounted: function() {
    this.getwz();
  }
};
</script>

<style  scoped>
* {
  padding: 0;
  margin: 0;
}
/* 大盒子 */
.pubu {
  background: #eee;
  padding: 0 0.1rem;
}
.container{
  max-width:100%;
}
/* 左右盒子 */
.yg_l {
  float: left;
}
.yg_r {
  float: right;
}
.yg_l,
.yg_r {
  width: calc(50% - 8px);
}
/* li样式 */
.yg li {
  list-style-type: none;
  background: #fff;
  border-radius: 0.08rem;
  margin-bottom: 0.1rem;
  margin-top: 0.2rem;
  box-shadow: 3px 3px 3px skyblue, 3px -3px 3px skyblue, -3px 3px 3px skyblue,
    -3px -3px 3px skyblue;
}
/* 大图 */
.yg img {
  width: 100%;
  border-radius: 0.08rem 0.08rem 0 0;
}
/* 星星 */
.icon-xingxing {
  margin-right: 0.05rem;
  color: #aaa;
}
.fuji {
  position: relative;
}
/* 收集 */
a,
.shouji {
  display: inline-block;
  width: 90%;
  padding-left: 16%;
  color: skyblue;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.shouji {
  color: #000;
}
</style>
