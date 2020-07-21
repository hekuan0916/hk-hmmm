<template>
  <div class="upload">
    <el-upload
      class="avatar-uploader"
      name="image"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="value" :src="baseURL + '/' + value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      baseURL: process.env.VUE_APP_URL,
      imageUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      //   this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit("input", res.data.url);
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
  },
};
</script>

<style></style>
