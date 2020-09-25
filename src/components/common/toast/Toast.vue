<!--
 * @Descripttion: 提示语组件
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-25 15:51:55
-->
<template>
  <div class="toast" v-show="isShowToast">{{ message }}</div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: "",
    // },
    // isShowToast: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      message: "",
      isShowToast: false,
    };
  },
  methods: {
    showToast(message = "默认提示文字", duration = 1500) {
      //   duration = duration || 1500;
      this.isShowToast = true;
      this.message = message;

      setTimeout(() => {
        this.isShowToast = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
</style>