<template>
  <div>
    <router-view></router-view>
    <!-- <keep-alive>
    <router-view  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  </div>
</template>

<script>
import $ from "jquery";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {

  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>