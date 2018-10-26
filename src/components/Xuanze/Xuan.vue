<template>
<div>
    <div id="box">
        <span class="duitang">堆糖</span>
        <p>轻松注册,即可永久保存你的所爱换了手机也能找的到哦</p>
        <button v-for='(i,index) in arr' v-text='i' @click.prevent="xuan(index)" :key='index' 
        ></button> 
    </div>
    <Footer/>
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
      arr: ["注册", "登陆"],
      page: 0
    };
  },
  methods: {
    xuan: function(index) {
      //点击注册或登陆的时候
      switch (index) {
        case 0:
          location.href = "#/Regest";
          break;
        case 1:
          location.href = "#/Login";
          break;
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
#box {
  width: 100%;
  margin-top: 2rem;
  padding: 0 10%;
  text-align: center;
}
.duitang {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: red;
  color: #fff;
  font-size: 0.35rem;
  line-height: 1rem;
  text-align: center;
  border-radius: 0.2rem;
}
p {
  margin-top: 0.1rem;
  font-size: 0.18rem;
}
button {
  border: 0.01rem solid red;
  margin: 0.05rem;
  width: 1.4rem;
  height: 0.4rem;
  background: #fff;
  color: red;
  font-size: 0.15rem;
  line-height: 0.4rem;
  text-align: center;
  border-radius: 0.1rem;
}
</style>
