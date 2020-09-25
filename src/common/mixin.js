/*
 * @Descripttion:混入
 * @version:
 * @Author: xuchunyuan
 * @Date: 2020-09-22 10:46:36
 */
import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
  data() {
    return { itemListener: null };
  },
  mounted() {
    // 防抖
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    // 对监听事件保存
    this.itemListener = () => {
      refresh();
    };
    // 监听 事件总线中的图片加载事件
    this.$bus.$on("itemImageLoad", this.itemListener);
  }
};

// 回到顶部
export const backTop = {
  components: { BackTop },
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    //监听组件点击事件，需要加上.native修饰符（监听组件根元素原生事件）
    backTop() {
      // 获取scroll对象,调用scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }
};
