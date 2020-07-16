<template>
  <el-dialog
    :visible="isShow"
    width="600px"
    class="register"
    :show-close="false"
  >
    <div class="register-title" slot="title">用户注册</div>

    <el-form labeo-width="100px" :rules="rules" :model="form" ref="form">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="username" label="昵称">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="图形码">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img :src="codeImg" @click="clickCode" v-if="bol" class="code" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="rcode" label="验证码">
        <el-row>
          <el-col :span="14">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-button @click="getRcode" :disabled="totalTime < 60"
              >获取用户验证码<span v-if="totalTime != 60"
                >{{ totalTime + 1 }}秒</span
              ></el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <div class="register-footer" slot="footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getRcode, registerUser } from "@/api/login.js";
export default {
  watch: {
    isShow(newVal) {
      if (newVal == false) {
        this.$refs.form.resetFields();
        this.imageUrl = "";
      }
    },
  },
  data() {
    return {
      bol: true,
      totalTime: 60,
      isShow: false,
      imageUrl: "",
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      codeImg: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      form: {
        avatar: "", //是	string	头像地址
        username: "", //是	string	用户名
        email: "", //是	string	邮箱
        phone: "", //是	string	手机号
        password: "", //是	string	密码
        code: "", //图形码
        rcode: "", //是	string	验证码
      },
      rules: {
        avatar: [{ required: true, message: "你是憨憨吗", trigger: "change" }],
        username: [
          { required: true, message: "你是憨憨吗", trigger: "change" },
        ],
        email: [
          { required: true, message: "你是憨憨吗", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              //rule 规则  value:当前验证项的值 callback:验证通过
              //callback()  验证不通过  callback(new Error('错误信息'))
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback(new Error("憨批输错了呀~"));
              }
            },
            trigger: "change",
          },
        ],
        phone: [
          { required: true, message: "你是憨憨吗", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("请正确输入手机"));
              }
            },
          },
        ],
        password: [
          { required: true, message: "你是憨憨吗", trigger: "change" },
          { min: 6, max: 12, message: "憨批输错了呀~", trigger: "change" },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          {
            min: 4,
            max: 4,
            message: "请输入四位图形验证码",
            trigger: "change",
          },
        ],
        rcode: [{ required: true, message: "你是憨憨吗", trigger: "change" }],
      },
    };
  },
  methods: {
    clickCode() {
      //静默刷新
      this.bol = false;
      this.$nextTick(() => {
        this.bol = true;
      });
    },
    handleAvatarSuccess(res) {
      this.form.avatar = res.data.file_path;
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.imageUrl = process.env.VUE_APP_URL + "/" + res.data.file_path;
      this.$refs.form.validateField(["avatar"], (errorMessage) => {
        window.console.log("avatar错误信息:", errorMessage);
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG,PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submit() {
      this.$refs.form.validate((result) => {
        if (result) {
          registerUser(this.form).then(() => {
            this.$message.success("注册成功");
            this.isShow = false;
          });
          // this.$message.success("验证通过");
        } else {
          this.$message.error("验证失败");
        }
      });
    },
    getRcode() {
      let num = 0;
      this.$refs.form.validateField(["phone", "code"], (errorMessage) => {
        if (errorMessage == "") {
          num++;
        }
        window.console.log("错误信息:", errorMessage);
      });
      if (num == 2) {
        this.totalTime--;
        let _interval = setInterval(() => {
          this.totalTime--;
          if (this.totalTime <= -1) {
            clearInterval(_interval);
            this.totalTime = 60;
          }
        }, 1000);
        getRcode({
          code: this.form.code,
          phone: this.form.phone,
        })
          .then((res) => {
            this.$message.success(res.data.captcha + "");
            console.log(this.$message.success(res.data.captcha + ""));
          })
          .catch((error) => {
            window.console.log("获取验证码错误信息:", error);
          });
      } else {
        this.$message.error("验证不通过");
      }
    },
  },
};
</script>

<style lang="less">
.register {
  .el-dialog {
    padding: 0;
  }
  .register-title {
    height: 53px;
    line-height: 53px;
    text-align: center;
    color: #fff;
    background: linear-gradient(to right, #01c5fa, #1395fa);
  }
  .register-foooter {
    text-align: center;
  }
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .code {
    width: 100%;
    height: 40px;
  }
}
</style>
