<template>
    <div id="box">
        <header>
            <span>我</span><span class="tui" @click="tui">退出</span>
        </header>
        <!-- 用户名 -->
        <p class="username">
            <span>您好，</span>
            <span v-text='name'></span>
            <i class="icon-arrow-right1 iconfont"></i>
        </p>
        <!-- 信息 -->
        <div class="xin">
            <ul>
                <li v-for='(i,index) in arr' :key='index'><i :class="res[index]"></i><span v-text='i'></span></li>
            </ul>
        </div>
        <div class="feng"></div>
        <!-- 订单 -->
        <div class="ding">
            <p><span>我的订单</span><i class="icon-shezhi iconfont"></i></p>
            <ul>
              <li v-for='n in ding' :key='n' v-text='n'></li>
            </ul>
        </div>
        <Footer /> 
    </div>
</template>

<script>
import Footer from "../Footer.vue"; //引入底部
export default {
  components: {
    Footer
  },
  data() {
    return {
      name: "", //存放用户姓名
      arr: ["我的专辑", "文章/视频", "我的收藏"], //存放用户信息
      res: ["iconfont icon-0", "icon-0 iconfont", "icon-star iconfont"],
      ding: ["待付款", "待发货", "待收货", "待评价"]
    };
  },
  methods: {
    //点击退出的时候
    tui: function() {
      window.sessionStorage.removeItem("name");
      location.href = "#/Xuan";
    }
  },
  computed: {
    sessionStorage() {
      //去sessionStorage拿数据
      return window.sessionStorage.getItem("name");
    }
  },
  mounted() {
    var yi = this.sessionStorage.slice(0, 3); //得到前三位
    var er = this.sessionStorage.slice(-4); //得到后四位
    this.name = yi + "****" + er;
  }
};
</script>

<style scoped>
#box {
  overflow: hidden;
}
/* 头部 */
header {
  border-bottom: 0.01rem solid #ccc;
  margin: 0;
  height: 0.5rem;
  line-height: 0.5rem;
}
header span {
  font-size: 0.25rem;
  margin-left: 0.1rem;
  color: rgb(104, 94, 94);
}
header .tui {
  float: right;
  font-size: 0.2rem;
  margin-right: 0.15rem;
  color: rgb(104, 94, 94);
}

/* 存放用户名称 */
.username {
  height: 0.5rem;
  line-height: 0.5rem;
  padding: 0 0.1rem;
  font-size: 0.2rem;
}
.username i {
  float: right;
  font-size: 0.2rem;
  color: #aaa;
}
/* 存放用户信息 */
.xin ul {
  height: 0.7rem;
}
.xin ul li {
  float: left;
  border-right: 0.01rem solid #ccc;
  height: 0.7rem;
  width: 33%;
  list-style: none;
  text-align: center;
  padding-top: 0.1rem;
  color: rgb(126, 106, 106);
}
.xin ul i {
  font-size: 0.2rem;
}
.xin ul span {
  display: block;
}

ul li:nth-child(3) {
  border: none;
}
/* 下面的一条灰色分割线 */
.feng {
  height: 0.15rem;
  background: #ddd;
  margin-top: 0.1rem;
}
/* 订单部分 */
.ding p {
  height: 0.4rem;
  line-height: 0.4rem;
  padding: 0 0.1rem;
  font-size: 0.2rem;
}
.ding p i {
  float: right;
  font-size: 0.2rem;
  color: #aaa;
}

.ding ul {
  height: 0.4rem;
  line-height: 0.4rem;
}
.ding ul li {
  float: left;
  width: 25%;
  list-style: none;
  text-align: center;
  font-size: 0.18rem;
  color: #aaa;
}
</style>
