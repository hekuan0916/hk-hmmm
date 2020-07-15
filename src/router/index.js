import VueRouter from "vue-router";
import login from "@/views/login/login.vue";
import layout from "@/views/layout/layout.vue";
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
    },
    {
      path: "/login",
      component: login,
    },
    {
      path: "/layout",
      component: layout,
      children: [
        {
          path: "/chart",
          component: chart,
        },
        {
          path: "/business",
          component: business,
        },
        {
          path: "/question",
          component: question,
        },
        {
          path: "/subject",
          component: subject,
        },
        {
          path: "/userlist",
          component: userlist,
        },
      ],
    },
  ],
});

export default router;
// { router };

chart;
