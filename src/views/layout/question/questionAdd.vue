<template>
  <div class="app">
    <el-dialog :visible.sync="isShow" class="questionAdd">
      <div class="title" slot="title">新增题库</div>
      <div class="footer" slot="footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
};
</script>

<style></style>
