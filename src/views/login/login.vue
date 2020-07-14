<template>
  <div class="login">
    <div class="left">
      <h3>
        <img src="@/assets/img/login_logo.png" alt="" />
        <span>黑马面面</span>
        <span class="midline">|</span>
        <span>用户登录</span>
      </h3>
      <el-form :model="form" class="form" :rules="rules" ref="form">
        <el-form-item prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            :show-password="true"
          ></el-input
        ></el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input
                placeholder="请输入验证码"
                v-model="form.code"
                prefix-icon="el-icon-key"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <img :src="codeURL" alt="" @click="clickCode" v-if="bol" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isPass">
          <el-checkbox v-model="form.isPass">
            我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link
              type="primary"
              >隐私条款</el-link
            ></el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :plain="true" class="btn" @click="submit"
            >登陆</el-button
          >
          <br />
          <el-button type="primary" class="btn" @click="showRegister"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <img src="@/assets/img/login_right.png" alt />
    <register ref="register"></register>
  </div>
</template>

<script>
import register from "./register";

export default {
  components: {
    register,
  },
  data() {
    return {
      codeURL: process.env.VUE_APP_URL + "/captcha?type=login",
      bol: true,
      form: {
        phone: "",
        password: "",
        code: "",
        isPass: "",
      },
      rules: {
        phone: [
          {
            required: true,
            message: "请输入11位手机号码",
            trigger: "change",
          },
          {
            min: 11,
            max: 11,
            message: "兄弟锤子哦",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change",
          },
          {
            min: 6,
            max: 12,
            message: "请输入6-12位密码",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "change",
          },
          {
            min: 4,
            max: 4,
            message: "憨憨式输入?",
            trigger: "change",
          },
        ],
        isPass: [
          {
            required: true,
            message: "请勾选",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((result) => {
        if (result) {
          this.$message.success("牛批");
        } else {
          this.$message.error("憨批");
        }
      });
    },
    showRegister() {
      // console.log(this.$refs.register);
      this.$refs.register.isShow = true;
    },
    clickCode() {
      this.bol = false;
      this.$nextTick(() => {
        this.bol = true;
      });
    },
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
