<!--
 * @Descripttion: better-scroll组件
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-17 16:55:36
-->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "BScroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    // 回到顶部
    scrollTo(x, y, time = 300) {
      this.scroll && this.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    // 监听加载
    refresh() {
      // console.log("------");
      this.scroll && this.scrollTo && this.scroll.refresh();
    },
    // 上垃加载完成
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    //组件离开时滚动的y值
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    // 2.监听滚动位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });

    // 3.监听滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log("到底部");
        this.$emit("pullingUp");
      });
    }
  },
};
</script>

<style scoped>
</style>
