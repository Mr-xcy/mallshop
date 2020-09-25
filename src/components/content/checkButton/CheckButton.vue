<!--
 * @Descripttion: 单选按钮组件
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-24 14:08:37
-->
<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaaaaa;
}
.check {
  background-color: red;
  border-color: red;
}
</style>