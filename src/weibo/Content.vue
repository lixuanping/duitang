<template>
    <div>
        <p v-text="id"></p>
    </div>
</template>

<script>
import "./Content.css";
export default {
  data() {
    return {
        id:'',
        page:''
    }
  },
  methods: {
    getNews() {
        var self = this
        $.ajax({
            url: "http://localhost:18090/a",
            type: "get",
            data: {
                id:self.id
                // page:self.page
            },
            success(a) {
                var res = JSON.parse(a).data.cards//得到微博的数组
                console.log(res)
                // var res = res.slice(1)//因为第一个结构比较特殊 所以先截取掉
            }
        });
    },
    childMethods(index, id) {
      this.id=id
      this.getNews()
    }
  },
  mounted() {
    this.getNews()
  }
};
</script>

<style>
</style>
