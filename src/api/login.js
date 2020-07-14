import axios from "axios";

var _fetch = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true,
});

// 添加请求拦截器
_fetch.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
_fetch.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.data.code == 200) {
      return response;
    } else {
      alert(response.data.message);
      return Promise.reject("error");
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
function getRcode(data) {
  return _fetch({
    url: "/sendsms",
    data,
    method: "post",
  });
}
export { getRcode };

function registerUser(data) {
  return _fetch({
    url: "/register",
    data,
    method: "post",
  });
}
export { registerUser };
