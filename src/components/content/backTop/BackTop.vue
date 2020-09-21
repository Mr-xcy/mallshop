<!--
 * @Descripttion: 回到顶部组件
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-18 11:06:11
-->
<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  metods: {},
};
</script>

<style scoped>
.back-top {
  position: fixed;
  bottom: 60px;
  right: 10px;
}
.back-top img {
  width: 43px;
  height: 43px;
}
</style>