<!--
 * @Descripttion: 购物车底部工具栏
 * @version: 
 * @Author: xuchunyuan
 * @Date: 2020-09-24 14:27:48
-->
<template>
  <div class="bottom-bar">
    <div class="checked-box">
      <check-button
        @click.native="checkClick"
        class="checked-btn"
        :isChecked="isSelectedAll"
      />
      <span>全选</span>
    </div>
    <div class="totlePrice">合计:{{ totlePrice }}</div>
    <div class="calculate" @click="calcClick">去计算({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
  name: "CartListBottomBar",
  components: {
    CheckButton,
  },
  methods: {
    // 点击全选按钮
    checkClick() {
      if (this.isSelectedAll) {
        //商品全部选中时，点击全选按钮改为未选中状态
        this.$store.getters.cartList.forEach((item) => (item.checked = false));
      } else {
        // 商品部分选中或全部未选中时，点击全选按钮改为选中状态
        this.$store.getters.cartList.forEach((item) => (item.checked = true));
      }
    },
    //
    calcClick() {
      if (!this.isSelectedAll) {
        this.$toast.showToast("请选择要购买的商品");
      }
    },
  },
  computed: {
    // 总价
    totlePrice() {
      return (
        "￥" +
        this.$store.getters.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    // 选中商品长度
    checkedLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    // 是否选中
    isSelectedAll() {
      // 1.使用filter
      // if (this.$store.getters.cartList.length === 0) return false;
      // return !this.$store.getters.cartList.filter((item) => !item.checked)
      //   .length;

      // 2.使用find
      // if (this.$store.getters.cartList.length === 0) return false;
      // return !this.$store.getters.cartList.find((item) => !item.checked);

      // 3.使用遍历
      if (this.$store.getters.cartList.length === 0) return false;
      for (let item of this.$store.getters.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;

  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
}
.checked-box {
  display: flex;
  margin-left: 10px;
  width: 90px;
}
.checked-btn {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.totlePrice {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  background-color: var(--color-tint);
  width: 90px;
  height: 100%;
  text-align: center;
  line-height: 45px;
  color: #fff;
}
</style>