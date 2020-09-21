<!--
 * @Descripttion: 商品详情页轮播图
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-21 11:37:37
-->
<template>
  <div>
    <swiper class="swiper">
      <swiper-item class="swiper-item" v-for="(item, index) in topImages" :key="index">
        <img :src="item" />
      </swiper-item>
    </swiper>
  </div>
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
};
</script>

<style scoped>
.swiper {
  height: 300px;
  overflow: hidden;
}
</style>