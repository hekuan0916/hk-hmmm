<template>
  <div class="subjectAdd">
    <el-dialog :visible.sync="isShow" width="550px" ref="form">
      <div class="title" slot="title">新增学科</div>
      <el-form :model="form" :rules="rules" label-width="auto" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer" slot="footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button @click="submit" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addSubject, editSubject } from "@/api/subject.js";

export default {
  props: ["modeSon"],
  watch: {
    isShow(newVal) {
      if (newVal === false) {
        this.form = {
          rid: "",
          name: "",
          short_name: "",
          intro: "",
          remark: "",
        };
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    },
  },
  data() {
    return {
      mode: "add",
      isShow: false,
      form: { rid: "", name: "", short_name: "", intro: "", remark: "" },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "change" }],
        name: [
          { required: true, message: "请输入学科名称", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((result) => {
        if (result) {
          if (this.modeSon == "edit") {
            editSubject(this.form).then(() => {
              this.$message.success("编辑成功");
              this.isShow = false;
              this.$emit("sonSearch");
            });
          } else {
            addSubject(this.form).then(() => {
              this.$message.success("添加成功");
              //关闭弹窗
              this.isShow = false;
              //子调用父的search方法
              this.$emit("sonSearch");
            });
          }
        } else {
          this.$message.error("验证失败");
        }
      });
    },
  },
};
</script>

<style lang="less">
.subjectAdd {
  .title {
    padding: 0;
    height: 53px;
    line-height: 53px;
    color: #fff;
    background: linear-gradient(to right, #79b3c4, #0083e7);
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .el-dialog__headerbtn .el-dialog__close:hover {
    color: red;
  }
  .footer {
    text-align: center;
  }
}
</style>
