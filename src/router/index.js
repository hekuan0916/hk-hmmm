import VueRouter from "vue-router";
import login from "@/views/login/login.vue";
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
  ],
});

export default router;
// { router };
