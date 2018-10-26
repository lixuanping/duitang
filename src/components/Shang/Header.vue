<template>
    <header>
        <div>
            <input type="text" placeholder="在商店中搜索...">
        </div>
       <span><i class="icon-gouwuche iconfont"></i></span><span><i class="icon-zuanshi iconfont"></i></span>
    </header>
</template>
<script>
export default {};
</script>

<style scoped>
header {
  height: 0.5rem;
  line-height: 0.5rem;
}
div {
  width: 78%;
  padding-left: 0.15rem;
  float: left;
}
input {
  text-align: center;
  width: 95%;
  height: 0.4rem;
  margin-top: 0.05rem;
  background: #eee;
  outline: none;
  border: none;
  border-radius: 0.05rem;
}
span {
  float: right;
  display: inline-block;
  height: 0.5rem;
  width: 0.4rem;
  text-align: center;
}
i {
  text-align: center;
  font-size: 0.2rem;
}
</style>
