<template>
  <div>
    <ul>
      <li v-for='(n,index) in navs' :key='index' v-text='n.title' @click="next(index,n.id)"></li>
    </ul>
    <xcontent ref='btn' />
  </div>
</template>

<script>
import xcontent from "./Content.vue";
export default {
  components: {
    xcontent
  },
  data() {
    return {
      num: 0,
      navs: [
        {
          title: "热门",
          cur: false,
          id: "102803"
        },
        {
          title: "新鲜事",
          cur: false,
          id: "102803_ctg1_7978_-_ctg1_7978"
        },
        {
          title: "搞笑",
          cur: false,
          id: "102803_ctg1_4388_-_ctg1_4388"
        },
        {
          title: "情感",
          cur: false,
          id: "102803_ctg1_1988_-_ctg1_1988"
        },
        {
          title: "明星",
          cur: false,
          id: "102803_ctg1_4288_-_ctg1_4288"
        },
        {
          title: "社会",
          cur: false,
          id: "102803_ctg1_4188_-_ctg1_4188"
        },
        {
          title: "数码",
          cur: false,
          id: "102803_ctg1_5088_-_ctg1_5088"
        },
        {
          title: "汽车",
          cur: false,
          id: "102803_ctg1_5188_-_ctg1_5188"
        },
        {
          title: "电影",
          cur: false,
          id: "102803_ctg1_3288_-_ctg1_3288"
        },
        {
          title: "游戏",
          cur: false,
          id: "102803_ctg1_1988_-_ctg1_1988"
        }
      ]
    };
  },
  methods: {
    next(index, id) {
      switch (index) {
        case 0:
        this.$router.push({
          // 点击跳转到路由且传参
          // path:'ssss',
          // query:{aaaa:123},
          // 点击跳转到路由且传参
          name: "a",
          params: { id: 123 }
        });
        break;
        case 1:
        this.$router.push({
          // 点击跳转到路由且传参
          // path:'ssss',
          // query:{aaaa:123},
          // 点击跳转到路由且传参
          name: "b",
          params: { id: 456 }
        });
        break;
        case 2:
        this.$router.push({
          // 点击跳转到路由且传参
          // path:'ssss',
          // query:{aaaa:123},
          // 点击跳转到路由且传参
          name: "c",
          params: { id: 789 }
        });
        break;
      }
      this.$refs.btn.childMethods(index, id);
    }
  }
};
</script>

<style>
ul {
  overflow: hidden;
}
li {
  list-style: none;
  float: left;
  background: red;
  color: #fff;
  width: 0.5rem;
  height: 0.3rem;
  line-height: 0.3rem;
  text-align: center;
  margin: 0.05rem;
}
</style>
