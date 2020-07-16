<template>
  <el-container class="layout">
    <el-header class="header">
      <ul class="header-ul">
        <li class="el-icon-s-fold f20" @click="collapse = !collapse"></li>
        <li>
          <img src="@/assets/img/layout-logo.png" alt="" />
        </li>
        <li class="t1">黑马面面</li>
        <li class="nouse"></li>
        <li>
          <img
            v-if="userInfo != ''"
            class="avatar"
            alt=""
            :src="baseURL + '/' + userInfo.avatar"
          />
        </li>
        <li class="t2">{{ userInfo.username }},您好</li>
        <li>
          <el-button type="primary" @click="exit">退出</el-button>
        </li>
      </ul>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="collapse"
          router
        >
          <el-menu-item index="/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/userlist">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo, logout } from "@/api/layout.js";
import { removeLocal, getLocal } from "@/utils/local.js";
export default {
  data() {
    return {
      baseURL: process.env.VUE_APP_URL,
      userInfo: "",
      collapse: false,
    };
  },
  created() {
    if (!getLocal()) {
      this.$router.push("/");
      return;
    }
    getUserInfo().then((res) => {
      this.userInfo = res.data;
      window.console.log("用户信息:", res);
    });
  },
  methods: {
    exit() {
      this.$confirm("你不搞了吗", "提示", {
        confirmButtonText: "不搞了",
        cancelButtonText: "继续搞",
        type: "error",
      }).then(() =>
        logout().then(() => {
          this.$message.success("退出成功");
          removeLocal();
          this.$router.push("/login");
        })
      );
    },
  },
};
</script>

<style lang="less">
.layout {
  height: 100%;
  .header {
    .header-ul {
      display: flex;
      align-items: center;
      padding-top: 7px;
      .nouse {
        flex: 1;
      }
      .avatar {
        margin-right: 15px;
        width: 43px;
        height: 43px;
        border-radius: 50%;
      }
      .f20 {
        font-size: 20px;
        margin-right: 15px;
      }
      .t1 {
        font-size: 22px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: bold;
        text-align: left;
        color: #49a1ff;
        letter-spacing: 1px;
        margin-left: 15px;
      }
      .t2 {
        font-size: 14px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: bold;
        text-align: left;
        color: #636363;
        letter-spacing: 0px;
        margin-right: 20px;
      }
    }
  }
  .aside {
    // background-color: #00f;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .main {
    // background-color: #e8e9ec;
  }
}
</style>
