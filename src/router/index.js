import VueRouter from "vue-router";
import login from "@/views/login/login";
import layout from "@/views/layout/layout";
import chart from "@/views/layout/chart/chart";
import business from "@/views/layout/business/business";
import question from "@/views/layout/question/question";
import subject from "@/views/layout/subject/subject";
import userlist from "@/views/layout/userlist/userlist";
import Vue from "vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/login",
      meta: {
        title: "登陆页",
      },
    },
    {
      path: "/login",
      component: login,
      meta: {
        title: "登陆页",
        roles: ["超级管理员", "管理员", "老师"],
      },
    },
    {
      path: "/layout",
      component: layout,
      redirect: "/business",
      meta: {
        title: "首页",
      },
      children: [
        {
          path: "/chart", //相对(不学/号,相对于自己父级),完整模式,/开头
          component: chart,
          meta: {
            title: "数据概览",
            roles: ["超级管理员", "管理员", "老师"],
          },
        },
        {
          path: "/userlist",
          component: userlist,
          meta: {
            title: "用户列表",
            roles: ["超级管理员", "管理员"],
          },
        },
        {
          path: "/question",
          component: question,
          meta: {
            title: "问题列表",
            roles: ["超级管理员", "管理员", "老师"],
          },
        },
        {
          path: "/business",
          component: business,
          meta: {
            title: "企业列表",
            roles: ["超级管理员", "管理员", "老师"],
          },
        },
        {
          path: "/subject",
          component: subject,
          meta: {
            title: "学科列表",
            roles: ["超级管理员", "管理员", "老师", "学生"],
          },
        },
      ],
    },
  ],
});

//导入导航守卫
//进入前守卫
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import store from "@/store/index.js";
// import { removeLocal } from "@/utils/local.js";
// import { Message } from "element-ui";

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  console.log("打哪里去:", to); //去哪里的路由信息

  console.log("从哪里来:", from); //from从哪里来的路由信息
  NProgress.start();
  next();
  // if (to.$router.meta.roles.includes(store.state.role) === false) {
  //   Message.error("您无权访问该页面");
  //   removeLocal();
  //   this.$router.push("/login");
  // }
});

//进入后守卫
router.afterEach((to, from) => {
  // to and from are both route objects.
  console.log("afterEach去哪里:", to);
  console.log("afterEach从哪来", from);
  NProgress.done();
  document.title = to.meta.title;
});
export default router;

// export { router };
