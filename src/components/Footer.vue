<template>
  <div id="box">
    <ul>
      <li v-for='(n,index) in tab' :key='index' @click='toggle(index)' :idx="index" :page="page">
        <i :class="[FontSize[index],{active:page==index}]"></i>
        <p v-text="n" :class="{active:page==index}"></p>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    //这个就相当于之前的data
    return {
      question:'',
      page: 0,
      // tab:[{title:'推荐',fontSize:'icon-fl-jia iconfont'},{title:'数据',fontSize:'icon-faxian iconfont'},
      // {title:'商店',fontSize:'icon-dianpu iconfont'},{title:'我',fontSize:'icon-my iconfont'}],
      tab: ["推荐", "数据", "商店", "我"],
      FontSize: [
        "icon-fl-jia iconfont",
        "icon-faxian iconfont",
        "icon-dianpu iconfont",
        "icon-my iconfont"
      ]
    };
  },
  computed: {
    sessionStorage() {
      //去sessionStorage拿用户名数据
      return window.sessionStorage.getItem("name");
    }
  },
  methods: {
    toggle: function(index) {
      this.page=index;
      //点击tab的时候切换到需要的页面
      if (index == 0) {
        location.href = "#/Footer/ShouYe";
      } else if (index == 1) {
        location.href = "#/Footer/faxian";
      } else if (index == 2) {  
        location.href = "#/Footer/shang";
      } else if (index == 3 && this.sessionStorage != null) {
        //判断是否登陆然后跳到对应的页面
        location.href = "#/Footer/Me";
      } else {
        location.href = "#/Footer/Xuan";
      }
    }
  },
  watch: {//监听的意思
    $route(){
      console.log(this.$route.path)
    }
    // 如果 `question` 发生改变，这个函数就会运行
    // question: function (newQuestion, oldQuestion) {
    //   console.log(222)
    // }
  },
  mounted(){//为了刷新页面的时候  下面的颜色在当前页面
    switch(this.$route.path){
      case '/Footer/ShouYe':
      this.page=0
      break;
      case '/Footer/faxian':
      this.page=1
      break;
      case '/Footer/shang':
      this.page=2
      break;
      case '/Footer/Me':
      this.page=3
      break;
    }
  }
};
</script>

<style scoped>
i.active {
  color: #edc42a;
}
p.active {
  color: #edc42a;
}
ul {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  padding: 0;
  margin: 0;
}
li {
  float: left;
  width: 25%;
  height: 0.5rem;
  text-align: center;
  list-style: none;
  color: #aaa;
  background: #eee;
}
p {
  margin: 0;
}
i {
  font-size: 0.2rem;
}
</style>