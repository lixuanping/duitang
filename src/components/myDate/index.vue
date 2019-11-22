<template>
<div>
    <div id="box">
        <span class="duitang">堆糖</span>
        <p>轻松注册,即可永久保存你的所爱换了手机也能找的到哦</p>
        <button v-for='(item,index) in arr' v-text='item' :key='index' @click="xuan(index)"></button>
    </div>
</div>
</template>


<script>
export default {
  components: {
  },
  data() {
    return {
      arr: ["注册","登陆"],
      page: 0
    };
  },
  methods: {
    xuan(index){
      this.$router.push({
        path:'Login',
        query:{id:index}
      })
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
