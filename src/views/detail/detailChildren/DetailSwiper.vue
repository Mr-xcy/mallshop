<!--
 * @Descripttion: 商品详情页轮播图
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-21 11:37:37
-->
<template>
  <swiper class="detail-swiper">
    <swiper-item class="swiper-item" v-for="(item, index) in topImages" :key="index">
      <img :src="item" @load="imageLoad" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 监听图片加载
    imageLoad() {
      // 使用事件总线向父组件发射事件
      this.$bus.$emit("itemImageLoad");
    },
  },
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>