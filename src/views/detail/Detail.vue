<!--
 * @Descripttion: 商品详情
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-21 11:05:38
-->
<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar />
    <detail-swiper :topImages="topImages" />
  </div>
</template>

<script>
import { getDetail } from "network/detail.js";

import DetailNavBar from "./detailChildren/DetailNavBar";
import DetailSwiper from "./detailChildren/DetailSwiper";
export default {
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
    };
  },
  created() {
    //   获取商品id
    this.iid = this.$route.params.iid;
    // 获取商品详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      this.topImages = res.result.itemInfo.topImages;
    });
  },
};
</script>

<style>
</style>