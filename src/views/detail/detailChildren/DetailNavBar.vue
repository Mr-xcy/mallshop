<!--
 * @Descripttion: 商品详情页顶部导航
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-21 11:16:05
-->
<template>
  <div id="detail-nav-bar">
    <!-- 导航栏 -->
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title-item"
          :class="{'on':index === currentIndex}"
          @click="itemClick(index)"
        >{{ item }}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    //   点击tab
    itemClick(index) {
      this.currentIndex = index;
      // 发送事件
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 15px;
}
.title-item {
  flex: 1;
}
.back img {
  margin-top: 12px;
}
.on {
  color: var(--color-high-text);
}
</style>