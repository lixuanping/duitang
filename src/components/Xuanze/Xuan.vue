<template>
<div>
    <div id="box">
        <span class="duitang">堆糖</span>
        <p>轻松注册,即可永久保存你的所爱换了手机也能找的到哦</p>
        <button v-for='(i,index) in arr' v-text='i.title' :key='index' @click="xuan(index)"></button>
       
        <!-- <router-link v-for='(i,index) in arr' v-text='i.title' :to="i.link"  :key='index'  tag="button"> -->
        <!-- </router-link> -->
        <!-- <router-link to="/Xuan/Regest" tag="button" >注册</router-link> -->
        <!-- <router-link to="/Xuan/Login" tag="button" >登陆</router-link> -->
    </div>
</div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      arr: [{title:"注册",link:'/Xuan/Regest',name:'Regest'},{title:"登陆",link:'/Xuan/Login',name:'Login'}],
      page: 0
    };
  },
  methods: {
    xuan: function(index) {
      // console.log(this.arr[index].link)
      //点击注册或登陆的时候
      // this.$router.push(this.arr[index].link)
      // this.$router.push({ name: this.arr[index].name})
      // this.$router.push({ path: this.arr[index].link})
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
