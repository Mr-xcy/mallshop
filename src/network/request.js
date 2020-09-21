import axios from "axios";

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    timeout: 5000
  });

  //  2.拦截器
  //   请求拦截器
  instance.interceptors.request.use(
    config => {
      //   console.log(config);
      //   1.加请求动画

      //   2.对config数据进行处理

      //   3.判断某些请求（登录token），必须携带一些特殊的信息

      return config;
    },
    err => {
      console.log(err);
    }
  );

  //   响应拦截器
  instance.interceptors.response.use(
    res => {
      // console.log(res);
      return res.data;
    },
    err => {
      console.log(err);
    }
  );

  //  3.发送网络请求
  return instance(config);
}
