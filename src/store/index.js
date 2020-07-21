/*
1:安装
2：导入
3:注册
4：实例化
5:注入到main.js的new Vue({})
*/

import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
const store = new Vuex.Store({
  //共享数据配制
  state: {
    userInfo: "", //用户信息
    // 用户信息：很多地方使用用户信息，
    role: "超级管理员",
  },
});
export default store;
