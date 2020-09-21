<!--
 * @Descripttion: 首页
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-15 16:12:22
-->

<template>
  <div id="home" class="wrapper">
    <!-- 头部导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- tab切换吸顶状态 -->
    <tab-control
      v-show="isTabFixed"
      :titles="titles"
      class="tab-control-top"
      @tabClick="tabClick"
      ref="tabControl"
    />
    <!-- 使用better-scroll滚动 -->
    <scroll
      class="content"
      ref="scroll"
      :pullUpLoad="true"
      :probe-type="3"
      @pullingUp="loadMore"
      @scroll="contentScroll"
    >
      <!-- 轮播图 -->
      <home-swiper :swiperList="swiperList" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <!-- 推荐 -->
      <home-recommend :recommends="recommends"></home-recommend>
      <!-- 流行 -->
      <feature-view></feature-view>
      <!-- tab切换 -->
      <tab-control :titles="titles" class="tab-control" @tabClick="tabClick" ref="tabControlRef" />
      <!-- 商品展示 -->
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 回到顶部 -->
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "views/home/homeChildren/HomeSwiper.vue";
import HomeRecommend from "./homeChildren/HomeRecommend.vue";
import FeatureView from "./homeChildren/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/bscroll/BScroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeData, getHomeGoodsData } from "network/home.js";
import { debounce } from "common/utils";

export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      swiperList: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      // tab切换请求数据模型
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0, //tab栏距离顶部的位置
      isShowBackTop: false,
      isTabFixed: false, //tab栏吸顶
      saveY: 0, //保存组件离开时滚动的y值
    };
  },
  methods: {
    // 获取首页数据
    getHomeData() {
      getHomeData().then((res) => {
        // console.log(res);
        this.swiperList = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 获取tab切换数据
    getHomeGoodsData(type) {
      const page = this.goods[type].page + 1;
      getHomeGoodsData(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
    // tab切换
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
      // 设置点击切换时tab跟随吸顶状态显示相应tab
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControlRef.currentIndex = index;
    },
    //监听组件点击事件，需要加上.native修饰符（监听组件根元素原生事件）
    backTop() {
      // 获取scroll对象,调用scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 监听滚动位置
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2.tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 上拉加载更多数据
    loadMore() {
      this.getHomeGoodsData(this.currentType);
    },
    // 监听轮播图图片加载
    swiperImgLoad() {
      // console.log(this.$refs.tabControlRef.$el.offsetTop);
      // 获取tab   offsetTop
      // 每个组件都有一个属性 $el(获取组件中的元素)
      this.tabOffsetTop = this.$refs.tabControlRef.$el.offsetTop;
    },
    // 防抖函数
    // debounce(fun, delay) {
    //   let timer = null;
    //   return function (...args) {
    //     if (timer) clearTimeout(timer);
    //     timer = setTimeout(() => {
    //       fun.apply(this, args);
    //     }, delay);
    //   };
    // },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomeData();
    this.getHomeGoodsData("pop");
    this.getHomeGoodsData("new");
    this.getHomeGoodsData("sell");
  },
  mounted() {
    // 防抖
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    // 监听 事件总线中的图片加载事件
    this.$bus.$on("itemImageLoad", () => {
      // console.log("---------");
      // this.$refs.scroll.refresh();
      refresh();
    });
  },
  // 组件进入时
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  // 组件离开
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 使用浏览器原生滚动时，为了固定顶部导航 */
  /* position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9; */
}

/* tab吸顶 */
/* sticky滚动到预定位置时会变为fixed */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px;
} */
/* 吸顶状态 */
/* .fixed {
  position: fixed;
  left: 0;
  top: 44px;
  right: 0;
} */
.tab-control-top {
  position: relative;
  z-index: 9;
}
</style>
