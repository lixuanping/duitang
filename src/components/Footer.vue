<template>
	<div id="box">
		<ul>
        <li v-for='(n,index) in tab' :key='index'  @click='toggle(index)'>
            <i :class="[FontSize[index],{'active':page==index}]"></i>
            <p v-text="n" :class="{'active':page==index}"></p>
        </li>
    </ul>
	</div>
</template>

<script>
export default {
  components: {},
  data() {
    //这个就相当于之前的data
    return {
      page: "",
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
      //去sessionStorage拿数据
      return window.sessionStorage.getItem("name");
    }
  },
  methods: {
    toggle: function(index) {
      //点击tab的时候切换到需要的页面
      if(index==0){
        location.href = "#/ShouYe";
      }else if(index==1){
        location.href = "#/Find";
      }else if(index==2){
         location.href = "#/ShangDian";
      }else if(index==3&&this.sessionStorage!=null){
          location.href = "#/Me";
      }else{
        location.href = "#/Xuan";
      }
      
    }
  },
  mounted() {
    console.log(this.sessionStorage)
    //让底部的颜色跟着跳过去
    if (this.$route.path == "/ShouYe") {
      this.page = 0;
    } else if (this.$route.path == "/Find") {
      this.page = 1;
    } else if (this.$route.path == "/ShangDian") {
      this.page = 2;
    } else if (this.$route.path == "/Xuan") {
      this.page = 3;
    }else if (this.$route.path == "/Me") {
      this.page = 3;
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
p{
    margin: 0;
}
i {
  font-size: 0.2rem;
}
</style>