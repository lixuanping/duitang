<template>
<div>
    <lun/>
    <Nei />
    <Footer />
</div>
</template>

<script>
import lun from "../Shang/Lun.vue"; //引入菜单下面的内容部分
import Nei from "./Nei.vue"; //引入菜单下面的内容部分
import Footer from "../Footer.vue"; //引入底部
export default {
  components: {
    lun,
    Nei,
    Footer
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
