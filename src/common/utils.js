/*
 * @Descripttion:工具函数
 * @version:
 * @Author: xuchunyuan
 * @Date: 2020-09-15 15:41:06
 */
// 防抖函数
export function debounce(fun, delay = 50) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fun.apply(this, args);
    }, delay);
  };
}

// 时间格式化
export function formatDate(date, fmt) {
  // 获取年份
  // y+（一个或者多个y） :匹配传入的y的个数
  // y+（0个或者多个y）
  // y?（0个或者1个y）
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

// 补0
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
