<template>
    <div id='box'>
        <!-- 详情动态 -->
        <div class="shang">
            <img :src="arr.photo.path" alt="" class="datu"> 
             <div class="xinxi">
                <h3 v-text='arr.msg' class="miao"></h3>
                <hr>
                <p>
                  <img :src="arr.sender.avatar" alt="" class="touxiang">
                  <a v-text='arr.sender.username'></a><span class="shouji" v-text="'收集到 '+arr.album.name"></span>
                </p>
            </div>
        </div>
        <!-- 下面的四条相关动态 -->
        <ul>
          <li v-for='i in res'>
            <img :src="i.photo.path" class="datu">
            <h3 v-text='i.msg'></h3>
            <p><i class="icon-xingxing iconfont"></i><span v-text='i.favorite_count'></span></p>  
          </li>
        </ul>
    </div>
</template>

<script>
//此页的功能是
//1,先在computed去sessionStorage仓库 得到从首页传过来的点击的那条数据 然后在created分析数据 渲染到页面 也就是上半部分
//2,需要获取到关于此用户下面的四条动态 就需要传这个用户的一些参数到后端  也就是return里面的id 跟 twoId  参数
//created里面已经分析好了 所以赋值给return里面 然后ajax调用这个值传给后端
//3,后端得到这个值 通过接口访问 然后把此用户相关的动态数据返回给前端  前端再分析数据渲染到页面
import $ from "jquery";
export default {
  components: {},
  data() {
    return {
      arr: "",
      id: "", //获取此用户的相关动态需要的参数
      twoId: "", //获取此用户的相关动态需要的参数
      res: "" //存放用户相关动态的数组
    };
  },
  methods: {
    getNews() {
      var self = this; //this指向不一样
      $.ajax({
        //通过后端拿这个用户的其他动态
        url: "http://localhost:18090/f",
        type: "get",
        data: {
          id: self.id,
          twoId: self.twoId
        },
        success(a) {
          self.res = a.data.object_list; //得到一个数组 里面四条动态信息的参数
        }
      });
    }
  },
  computed: {
    sessionStorage() {
      return window.sessionStorage.getItem("list");
    }
  },
  created() {
    //因为从上到小执行的缘故 所以不能用mounted生命周期 用这个就会先获得数据再渲染
    this.arr = JSON.parse(this.sessionStorage); //
    this.id = this.arr.id;
    this.twoId = this.arr.album.id;
    this.getNews();
  }
};
</script>

<style scoped>
/* 上面的动态板块 */
#box {
  /* background: #eee; */
}
#box .shang {
  width: 100%;
  background: #eee;
  padding: 0.1rem;
}
/* 大图 */
#box .datu {
  width: 100%;
  height: 3.9rem;
}
hr {
  margin: 0.07rem 0;
}
/* 放着下面的头像用户名 还有收集的位置 */
.xinxi {
  background: #fff;
  padding: 0 0.1rem;
}
.xinxi p {
  position: relative;
}
/* 头像 */
.xinxi .touxiang {
  position: absolute;
  top: 0.02rem;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
}
/* 用户名和收集的公共样式  */
.xinxi a,
.xinxi .shouji {
  display: inline-block;
  width: 90%;
  padding-left: 12%;
  color: blue;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.xinxi .shouji {
  color: #000;
}

/* // 下面的相关动态 */
ul {
  width: 100%;
  background: #eee;
  overflow: hidden;
  margin-top: 0.3rem;
  padding-left: 0;
  margin: 0;
}

li {
  box-shadow: 0.02rem 0.02rem 0.02rem #eee;
  float: left;
  list-style: none;
  margin: 0.05rem;
  width: 1.75rem;
}
h3 {
  background: #fff;
  padding-left: 0.05rem;
  margin-top: 0.05rem;
  margin: 0;
}
/* 大图 */
li .datu {
  width: 1.75rem;
  height: 2.1rem!important;
  display: block;
}
li p {
  width: 100%;
  background: #fff;
  padding-left: 0.05rem;
  padding-bottom: 0.09rem;
  margin: 0;
}
li i {
  color: #aaa;
}
li span {
  margin-left: 0.05rem;
}
</style>
