<template>
  <div class="login">
    <div class="left">
      <h3>
        <img src="@/assets/img/login_logo.png" alt="" />
        <span>黑马面面</span>
        <span class="midline">|</span>
        <span>用户登录</span>
      </h3>
      <el-form :model="form" class="form">
        <el-form-item>
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            :show-password="true"
          ></el-input
        ></el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="16">
              <el-input
                placeholder="请输入验证码"
                v-model="form.code"
                prefix-icon="el-icon-key"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <img src="@/assets/img/code.jpg" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.isPass">
            我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link
              type="primary"
              >隐私条款</el-link
            ></el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn">登陆</el-button>
          <br />
          <el-button type="primary" class="btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="@/assets/img/login_right.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: "",
        password: "",
        code: "",
        isPass: "",
      },
    };
  },
};
</script>

<style lang="less">
.login {
  background: linear-gradient(225deg, #dd0483, #01c6fa);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .left {
    width: 478px;
    height: 550px;
    // margin: 0 auto;
    // text-align: center;
    background: #f5f5f5;
    h3 {
      // text-align: left;
      margin: 20px 50px;
      font-weight: 500;
      img {
        margin-right: 20px;
      }
      .midline {
        margin: 0 10px;
      }
    }
    h3:nth-child(2)span {
      font-size: 50px;
    }
    .form {
      padding: 20px 50px;
      // :nth-child()
      // input {
      //   width: 300px;
      // }
      img {
        width: 100%;
        height: 40px;
      }
      .btn {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
