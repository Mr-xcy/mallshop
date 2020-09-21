<!--
 * @Descripttion: 首页推荐组件
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-16 10:20:17
-->
<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    // console.log(this.recommends);
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  margin-top: 20px;
}
.recommend-item {
  text-align: center;
  flex: 1;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommend-item img {
  height: 60px;
  width: 60px;
  margin-bottom: 12px;
}
</style>