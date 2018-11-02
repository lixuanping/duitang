<template>
  <div id="box">
      <ul>
        <li v-for='i in arr'>
            <h3 v-text='i.enter_main_title'></h3>
            <p v-text='i.enter_sub_title'></p>
            <img :src="i.enter_image_url" alt="">
        </li>
      </ul>
      <!-- <div class="hui"></div> -->
      <!-- <div class="zhuan">专题</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: []
    };
  },
  methods: {
    getNews() {
      var self = this;
      $.ajax({
        url: "http://localhost:18090/g",
        type: "get",
        success(a) {
          self.arr = a;
        }
      });
    }
  },
  mounted() {
    //生命周期
    this.getNews();
  }
};
</script>

<style scoped>
ul {
  width: 100%;
  height: 1.5rem;
  padding:0;
}
li {
  float: left;
  width: 33%;
  text-align: center;
  list-style: none;
}
img {
  width: 0.75rem;
  height: 0.75rem;
}
p {
  font-size: 0.12rem;
  color: #aaa;
}

.hui {
  height: 0.2rem;
  background: #ddd;
}
.zhuan {
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
}
</style>
