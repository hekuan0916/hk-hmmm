<template>
  <div class="app">
    <el-card>
      <el-form inline :model="form" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="userName">
          <el-input v-model="form.userName" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">
            <el-option label="禁用" value="1"></el-option>
            <el-option label="启用" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt50">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="50">
          <template v-slot="scope"> {{ scope.$index + 1 }} </template>
        </el-table-column>
        <el-table-column prop="name" label="学科名称" width="120">
        </el-table-column>
        <el-table-column prop="rid" label="学科编号" width="120">
        </el-table-column>
        <el-table-column
          prop="short_name"
          label="简称"
          width="120"
        ></el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期"> </el-table-column>
        <el-table-column prop="status" label="状态" width="50">
          <template v-slot="scope">
            <!-- {{ scope.row.status == 0 ? '禁用' : '启用' }} -->
            <el-switch
              @click.prevent.native="setStatus(scope.row.id)"
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="orange"
              :active-value="1"
              :inactive-value="0"
              :validate-event="false"
            >
            </el-switch> </template></el-table-column
        ><el-table-column prop="status" label="操作" width="250">
          <template v-slot="scope">
            <el-button
              @click="edit(scope.row)"
              icon="el-icon-edit"
              type="success"
            >
            </el-button>
            <el-button @click="setStatus(scope.row.id)" type="warning"
              >{{ scope.row.status == 1 ? "禁用" : "启用" }}
            </el-button>
            <el-button
              @click="del(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>

        <addSubject
          ref="addSubject"
          :modeSon="modeFather"
          @sonSearch="search"
        ></addSubject>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getSubjectList, setSubjectStatus, delSubject } from "@/api/subject.js";
import addSubject from "./addSubject.vue";
export default {
  components: {
    addSubject,
  },
  data() {
    return {
      modeFather: "add",
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 100,
      },
      form: {
        rid: "",
        name: "",
        page: "",
        limit: "",
        userName: "",
        status: "",
      },
      tableData: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let _query = {
        ...this.form,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
      };
      window.console.log("_query:", _query);
      getSubjectList(_query).then((res) => {
        window.console.log("学科列表", res);
        this.pagination.total = res.data.pagination.total;
        this.tableData = res.data.items;
      });
    },
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },
    handleSizeChange(size) {
      window.console.log("页容量:", size);
      this.pagination.pageSize = size;
      // 改变 页容量时 让页码回到第一页
      this.pagination.currentPage = 1;
      this.getData();
    },
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      window.console.log("页码:", page);
      //接口请求
      this.getData();
    },
    setStatus(id) {
      setSubjectStatus({ id }).then(() => {
        this.$message.success("设置状态成功~!");
        this.getData();
      });
    },
    add() {
      this.modeFather = "add";
      this.$refs.addSubject.isShow = true;
    },
    edit(row) {
      this.modeFather = "edit";
      this.$refs.addSubject.isShow = true;
      this.$refs.addSubject.form = JSON.parse(JSON.stringify(row));
    },
    del(id) {
      this.$confirm("确定删除吗亲~", "提示", {
        confirmButtonText: "确定一定以及肯定",
        cancelButtonText: "我再想想",
        type: "error",
      }).then(() => {
        delSubject({ id }).then(() => {
          this.$message.success("删除成功");
          this.search();
        });
      });
    },
  },
};
</script>

<style lang="less">
.app {
  .w100 {
    width: 100px;
  }
  .mt50 {
    margin-top: 50px;
    text-align: center;
  }
  .pagination {
    text-align: center;
    margin-top: 50px;
  }
}
</style>
