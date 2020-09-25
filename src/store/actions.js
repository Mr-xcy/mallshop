import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types";
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.判断cartList中是否有payload
      let oldCartList = context.state.cartList.find(
        item => item.iid === payload.iid
      );
      //   2.判断oldCartList中是否有值
      if (oldCartList) {
        // 数量加一
        context.commit(ADD_COUNTER, oldCartList);
        resolve("商品数量加一");
      } else {
        // 添加商品
        payload.count = 1;
        context.commit(ADD_TO_CART, payload);
        resolve("添加商品");
      }
    });
  }
};
