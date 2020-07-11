<template>
  <el-dialog
    :visible="isShow"
    width="600px"
    class="register"
    :show-close="false"
  >
    <div class="register-title" slot="title">用户注册</div>
    <div class="register-footer" slot="footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
};
</script>

<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
  .register-title {
    height: 53px;
    line-height: 53px;
    text-align: center;
    color: #fff;
    background: linear-gradient(to right, #01c5fa, #1395fa);
  }
  .register-footer {
    text-align: center;
  }
}
</style>
