<!--
 * @Descripttion: 购物车
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-15 16:12:22
-->
<template>
  <div class="cart">
    <!-- 头部导航 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- 列表 -->
    <cart-list />
    <!-- 底部工具栏 -->
    <cart-list-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

import CartList from "./cartChildren/CartList.vue";
import CartListBottomBar from "./cartChildren/CartListBottomBar";

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartListBottomBar,
  },
  data() {
    return {};
  },
  computed: {
    // 1.同名
    ...mapGetters(["cartLength"]),
    // 2.起别名
    // ...mapGetters({
    //   length: "cartLength",
    // }),
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // },
  },
  created() {},
};
</script>

<style>
.cart {
  height: 100vh;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #ffffff;
}
</style>
