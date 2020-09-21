<template>
  <Tabbar>
    <TabbarItem
      v-for="(item, index) in tabBarList"
      :key="index"
      :path="item.path"
      :activeColor="item.activeColor"
    >
      <img slot="item-icon" :src="item.img" alt="" />
      <img slot="item-icon-active" :src="item.imgActive" alt="" />
      <div slot="item-text">{{ item.title }}</div>
    </TabbarItem>
  </Tabbar>
</template>

<script>
import Tabbar from "./Tabbar";
import TabbarItem from "./TabbarItem";
export default {
  components: { Tabbar, TabbarItem },
  data() {
    return {
      tabBarList: [
        {
          img: require("@/assets/img/tabBar/home.png"),
          imgActive: require("@/assets/img/tabBar/home-on.png"),
          title: "首页",
          path: "/home",
          activeColor: "blue"
        },
        {
          img: require("@/assets/img/tabBar/category.png"),
          imgActive: require("@/assets/img/tabBar/category-on.png"),
          title: "分类",
          path: "/category",
          activeColor: "blue"
        },
        {
          img: require("@/assets/img/tabBar/cart.png"),
          imgActive: require("@/assets/img/tabBar/cart-on.png"),
          title: "购物车",
          path: "/cart",
          activeColor: "blue"
        },
        {
          img: require("@/assets/img/tabBar/user.png"),
          imgActive: require("@/assets/img/tabBar/user-on.png"),
          title: "我的",
          path: "/user",
          activeColor: "blue"
        }
      ]
    };
  }
};
</script>

<style></style>
