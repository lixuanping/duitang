<template>
  <mu-carousel>
      <mu-carousel-item v-for='i in arr' :key='i'>
			  <img  :src="i">
		  </mu-carousel-item>
	</mu-carousel>
</template>
  
<script>

export default {
  data() {
    return {
        arr:[]
    }
  },
  methods:{
    getNews() {//请求后端拿轮播图的数据
        var self = this 
        $.ajax({
            url: "http://localhost:18090/a",
            type: 'get',
            success(a) {    
                var abc = a.splice(1)//去掉第一个 因为第一个的路径不一样 然后因为网站在路径之间插了一段东西 
                //所以需要截取拼接
                for(var i = 0;i<abc.length;i++){
                    self.arr.push(abc[i].img.split('.jpeg')[0]+'.thumb.600_0_c.jpeg')
                }
            }
        })
	  }
  },
  mounted(){//生命周期
    this.getNews()
  }
};
</script>

<style scoped>
img {
  height: 200px;
}
.mu-carousel {
  height: 200px;
}

.mu-carousel-item {
  height: 200px;
}
</style>
