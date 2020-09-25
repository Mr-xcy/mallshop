<!--
 * @Descripttion: 购物车列表组件
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-23 17:31:58
-->
<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/bscroll/BScroll";

import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  // 组件进入时,刷新可滚动区域
  activated() {
    this.$refs.scroll.refresh();
  },
  created() {},
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>