<!--
 * @Descripttion: tab切换组件
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-17 13:56:39
-->
<template>
  <div class="tab-control">
    <div
      :class="{'on':index==currentIndex}"
      class="tab-control-item"
      v-for="(item,index) in titles"
      :key="index"
      @click="tabClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    //   tab切换
    tabClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.on {
  color: var(--color-high-text);
}
.on span {
  border-bottom: 2px solid var(--color-tint);
}
</style>