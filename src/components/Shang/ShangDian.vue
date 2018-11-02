<template>
<div>
    <xheader />
    <lun />
    <Nav/>
    <tui />
    <!-- <zhuan/> -->
</div>
</template>

<script>
import xheader from "./Header.vue"; //引入首页
import lun from "./Lun.vue"; //引入轮播图
import Nav from "./Nav.vue"; //引入轮播图下面的菜单
import tui from "./Tuijian.vue"; //引入菜单下面的三种商品还有下面的一条灰色线 还有专题字样
// import zhuan from "../Zhuanti/Zhuanti.vue"; //引入专题部分
export default {
  components: {
    xheader,
    lun,
    Nav,
    tui,
    // zhuan,
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
