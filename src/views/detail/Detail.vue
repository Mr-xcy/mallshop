<!--
 * @Descripttion: 商品详情
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-21 11:05:38
-->
<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navRef" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages" />
      <!-- 商品信息 -->
      <detail-baseInfo :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="paramsRef" :paramInfo="paramInfo" />
      <detail-comment-info ref="commentRef" :commentInfo="commentInfo" />
      <!-- 商品推荐 -->
      <goods-list ref="recommendRef" :goods="recommend" class="recommend" />
    </scroll>
    <!-- 底部导航栏 -->
    <detail-bottom-bar @addCart="addCart" />
    <!-- 回到顶部 -->
    <back-top @click.native="backTop" v-show="isShowBackTop" />
    <!-- Toast -->
    <!-- <toast :message="message" :showToast="showToast" /> -->
  </div>
</template>

<script>
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
import { debounce } from "common/utils";
import { itemListenerMixin, backTop } from "common/mixin";

import DetailNavBar from "./detailChildren/DetailNavBar";
import DetailSwiper from "./detailChildren/DetailSwiper";
import DetailBaseInfo from "./detailChildren/DetailBaseInfo";
import DetailShopInfo from "./detailChildren/DetailShopInfo";
import DetailGoodsInfo from "./detailChildren/DetailGoodsInfo";
import DetailParamInfo from "./detailChildren/DetailParamInfo";
import DetailCommentInfo from "./detailChildren/DetailCommentInfo";
import DetailBottomBar from "./detailChildren/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/bscroll/BScroll";
// import Toast from "components/common/toast/Toast";

import { mapActions } from "vuex";

export default {
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast,
  },
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {}, //保存商品信息
      shop: {}, //保存商铺信息
      detailInfo: {}, //详情信息
      paramInfo: {}, // 参数信息
      commentInfo: {}, //评论信息
      recommend: [], //推荐数据
      // itemListener: null,
      themeTopYs: [], //保存每个tab切换内容的offsetTop
      getThemeTopY: null, //获取offsetTop的函数
      currentIndex: 0, //滚动位置对应的下标
      // message: "",
      // showToast: false,
    };
  },
  mixins: [itemListenerMixin, backTop],
  methods: {
    // ...mapActions(["addCart"]),
    // 监听图片加载完成
    imageLoad() {
      this.$refs.scroll.refresh();
      //图片加载完成后，获取顶部tab标题对应的offsetTop
      this.getThemeTopY();
    },
    // tab点击联动
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    // 监听scroll滚动事件
    contentScroll(position) {
      // console.log(position);
      // 1、获取y值
      const positionY = -position.y;
      // 2、positionY与tab切换themeTopYs值进行对比
      // offsetTop: [0, 6280, 7083, 7299]
      // positionY  在 0 ~ 6280  index=0
      // positionY  在 6280 ~ 7083  index=1
      // positionY  在 7083 ~ 7299  index=2
      // positionY  在 7299 ~ 一个最大值  index=3

      // for (let i in this.themeTopYs) { 此时i值是字符串（可通过*1或parseInt(i)转换）
      let length = this.themeTopYs.length;
      // 方案一
      // for (let i = 0; i < length; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) ||
      //       (i === length - 1 && positionY >= this.themeTopYs[i]))
      //   ) {
      //     this.currentIndex = i;
      //     // console.log(this.currentIndex);
      //     this.$refs.navRef.currentIndex = this.currentIndex;
      //   }
      // }

      // 方案二
      // themeTopYs中传入一个js中的最大值 Number.MAX_VALUE
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navRef.currentIndex = this.currentIndex;
        }
      }

      // 3.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
    },
    // 加入购物车
    addCart() {
      // 获取购物车需要展示的信息
      const cartObj = {};
      cartObj.image = this.topImages[0];
      cartObj.title = this.goods.title;
      cartObj.desc = this.goods.desc;
      cartObj.price = this.goods.realPrice;
      cartObj.iid = this.iid;

      // 将商品添加到vuex
      // 调用mutations
      // this.$store.commit("addCart", cartObj);
      // 调用action(可以返回一个Promise)
      this.$store.dispatch("addCart", cartObj).then((res) => {
        // 1.toast封装成组件使用
        // this.showToast = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.showToast = false;
        //   this.message = "";
        // }, 1500);
        // 2.toast封装成插件使用
        this.$toast.showToast(res);
      });

      // this.addCart(cartObj).then((res) => {
      //   console.log(res);
      // });
    },
  },
  created() {
    //   获取商品id
    this.iid = this.$route.params.iid;
    // this.iid = this.$route.query.iid;
    // 获取商品详情数据
    getDetail(this.iid).then((res) => {
      //   console.log(res);
      const data = res.result;
      //   1.获取轮播图数据
      this.topImages = data.itemInfo.topImages;
      //   2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //   3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      //   4.保存商品详情数据
      this.detailInfo = data.detailInfo;
      //   5.保存商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //   6.保存商品评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 获取顶部tab标题对应的offsetTop
      // this.$nextTick(() => {
      //   //此时DOM更新完成，图片还没加载完成
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.paramsRef.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.commentRef.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommendRef.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
    // 获取推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommend = res.data.list;
    });
    // getThemeTopY函数赋值  对themeTopYs赋值进行防抖
    this.getThemeTopY = debounce(() => {
      // 获取顶部tab标题对应的offsetTop
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.paramsRef.$el.offsetTop);
      this.themeTopYs.push(this.$refs.commentRef.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommendRef.$el.offsetTop);
      // themeTopYs中传入一个js中的最大值 Number.MAX_VALUE
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {
    // // 防抖
    // const refresh = debounce(this.$refs.scroll.refresh, 200);
    // // 对监听事件保存
    // this.itemListener = () => {
    //   refresh();
    // };
    // // 监听 事件总线中的图片加载事件
    // this.$bus.$on("itemImageLoad", this.itemListener);
  },
  // updated() {
  //   // 获取顶部tab标题对应的offsetTop
  //   this.themeTopYs = [];
  //   this.themeTopYs.push(0);
  //   this.themeTopYs.push(this.$refs.paramsRef.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.commentRef.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.recommendRef.$el.offsetTop);
  //   console.log(this.themeTopYs);
  // },
  destroyed() {
    // 取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 58px);
}
.detail-nav {
  /* position: relative;
  z-index: 9; */
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: #fff;
  z-index: 9;
}
</style>
