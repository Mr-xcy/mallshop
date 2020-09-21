import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("../views/home/Home.vue");
const Category = () => import("../views/category/Category.vue");
const Cart = () => import("../views/cart/Cart.vue");
const User = () => import("../views/profile/User.vue");
const Detail = () => import("../views/detail/Detail.vue");

// 1.安装插件
Vue.use(VueRouter);

// 2.创建路由对象
const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/detail/:iid",
    component: Detail
  }
];

const router = new VueRouter({
  routes
});

// 3.导出
export default router;

// 4.main.js引入
