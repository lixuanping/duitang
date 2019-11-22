<template>
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div id="vm" class="pubu" v-cloak>
            <ul id="show" class="yg yg_l">
                <li v-for="(item,index) in list" v-if="index%2==0" :key='index' @click="xiang(index)">
                    <div style="position: relative;">
                        <!-- <img :src="item.photo.path" alt=""> -->
                        <img v-lazy="item.photo.path" :src="item.photo.path" class="datu">
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
                <li v-for="(item,index) in list" v-if="index%2==1" :key='index' @click="xiang(index)">
                    <div style="position: relative;">
                        <!-- <img :src="item.photo.path" alt=""> -->
                        <img v-lazy="item.photo.path" :src="item.photo.path" class="datu">
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
        <!-- 上拉和下拉的隐藏样式 -->
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">❤</span>
          <span v-show="topStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
          </span>
          <!-- <span v-show="allLoaded == true">加载完成没有更多数据</span> -->
        </div>
      </mt-loadmore>
    </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      list: [],
      allLoaded: false,
      bottomStatus: "",
      wrapperHeight: 0,
      topStatus: ""
    };
  },
  methods: {
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadBottom() {
      var self = this;
      $.ajax({
        url: "http://localhost:18090/b",
        type: "get",
        success(a) {
          for (var i = 0; i < a.length; i++) {
            if (a[i].photo.path) {
              self.list = self.list.concat(a[i]);
            }
          }
          self.$loading.close(); //关闭加载中字样
        }
      });
      setTimeout(() => {
        self.$refs.loadmore.onBottomLoaded();
      }, 3000);
    },
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
      var that = this;
      $.ajax({
        url: "http://localhost:18090/b",
        type: "get",
        success(a) {
          for (var i = 0; i < a.length; i++) {
            if (a[i].photo.path) that.list = a;
          }
        }
      });
    },
    xiang: function(index) {
      //点击跳转到详情页  并且把对应的信息存在sessionStorage 然后在详情页才能获取到信息
      var obj = JSON.stringify(this.list[index]);
      window.sessionStorage.setItem("list", obj);
      this.$router.push({
        path:'/Sxiang'
      });
    }
  },
  mounted() {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  },
};
</script>
<style>

.loading-background,
.mint-loadmore-top span {
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}

.mint-loadmore-top span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
/* 不加这句就是全局部滚动 (上拉加载更多事件就会失效)*/
.page-loadmore-wrapper {
  overflow: scroll;
  padding-bottom:.5rem;
}

.mint-loadmore-bottom span {
  display: inline-block;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  vertical-align: middle;
}

.mint-loadmore-bottom span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

/* 样式 */
.pubu {
  background: #eee;
  padding: 0 0.1rem;
}
.container {
  max-width: 100%;
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
.datu {
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
 