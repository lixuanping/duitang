<template>
  <div id="box">
      <ul>
        <li v-for='(n,index) in arr' :key='index'>
          <i :class="FontSize[index]"></i>
          <p v-text='n'></p>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [
        "护肤",
        "彩妆",
        "个人护理",
        "服饰箱包",
        "文具手帐",
        "居家",
        "美食",
        "堆糖制物",
        "畅销单品",
        "全部分类"
      ],
      FontSize: [
        "icon-meironghufu iconfont",
        "icon-meirongcaizhuang iconfont",
        "icon-ganlanyou iconfont",
        "icon-xiangzi- iconfont",
        "icon-wenju iconfont",
        "icon-jujia iconfont",
        "icon-meishi iconfont",
        "icon-Shapecopy iconfont",
        "icon-huangguan iconfont",
        "icon-daohangfenlei iconfont"
      ]
    };
  },
  methods: {
    getNews() {
      var self = this;
      $.ajax({
        url: "http://localhost:18090/b",
        type: "get",
        success(a) {
          for (var i = 0; i < a.length; i++) {
            if (a[i].photo.path) {
              self.arr = a;
            }
          }
        }
      });
    }
  },
  mounted() {
    //生命周期
  }
};
</script>

<style scoped>
ul {
  width: 100%;
  flex-wrap: wrap;
  height: 1.9rem;
}
li {
  float: left;
  width: 20%;
  height: 0.92rem;
  padding-top: 0.15rem;
  text-align: center;
  list-style: none;
}
i {
  font-size: 0.25rem;
  color: #aaa;
}
</style>
