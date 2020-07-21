<template>
  <div class="question">
    <el-card>
      <el-form :model="form" label-width="80px" ref="form">
        <el-row>
          <el-col :span="5">
            <el-form-item prop="subject" label="学科">
              <el-select v-model="form.subject">
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="step" label="阶段">
              <el-select v-model="form.step">
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="enterprise" label="企业">
              <el-select v-model="form.enterprise">
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="type" label="题型">
              <el-select v-model="form.type">
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4"></el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item prop="difficulty" label="难度">
              <el-select v-model="form.difficulty">
                <el-option
                  v-for="(value, key, index) in diffObj"
                  :key="index"
                  :label="value"
                  :value="+key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="username" label="作者">
              <el-select v-model="form.susernametep">
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="status" label="状态">
              <el-select v-model="form.status">
                <el-option label="禁用" :value="0"></el-option>
                <el-option label="启用" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="create_date" label="日期">
              <el-select v-model="form.create_date">
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4"></el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item prop="title" label="标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="reset">清除</el-button>
              <el-button type="primary">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="序号" width="50"> </el-table-column>
        <el-table-column label="题目">
          <template v-slot="scope">
            <div v-html="scope.row.title"></div> </template
        ></el-table-column>
        <el-table-column label="学科.阶段"
          ><template v-slot="scope">
            <div>
              {{ scope.row.subject_name }}.{{ stepObj[scope.row.step] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="题型">
          <template v-slot="scope">
            <div>
              {{ typeObj[scope.row.type] }}
            </div>
          </template></el-table-column
        >
        <el-table-column prop="enterprise_name" label="企业"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            {{ scope.row.status == 0 ? "禁用" : "启用" }}
          </template></el-table-column
        >
        <el-table-column label="访问量" prop="reads"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">{{
              scope.row.status == 1 ? "禁用" : "启用"
            }}</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[1, 5, 10, 20, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getSubjectList } from "@/api/subject.js";
import { getBusinessList } from "@/api/business.js";
import { getQuestionList } from "@/api/question.js";
export default {
  data() {
    return {
      pagination: {
        currentPage: 1,
        pageSize: 1,
        total: 10,
      },
      stepObj: {
        1: "初级",
        2: "中级",
        3: "高级",
      },
      typeObj: {
        1: "单选",
        2: "多选",
        3: "简答",
      },
      diffObj: {
        1: "简单",
        2: "一般",
        3: "困难",
      },
      form: {
        subject: "",
        step: "",
        enterprise: "",
        type: "",
        difficulty: "",
        username: "",
        status: "",
        create_date: "",
        title: "",
        page: "",
        limit: "",
      },
      subjectList: [], //学科列表数据
      businessList: [], //企业列表数据
      list: [], //题库列表数据
    };
  },
  created() {
    let _query = {
      page: 1,
      limit: 1000,
    };
    getSubjectList(_query).then((res) => {
      this.subjectList = res.data.items;
    });
    getBusinessList(_query).then((res) => {
      this.businessList = res.data.items;
    });
    this.getData();
  },
  methods: {
    getData() {
      //获取列表数据
      let _query = {
        ...this.form,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
      };
      getQuestionList(_query).then((res) => {
        this.list = res.data.items;
        this.pagination.total = res.data.pagination.total;
        window.console.log("题库列表数据:", res);
      });
    },
    // 页容量改变
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.currentPage = 1;
      this.getData();
    },
    // 页码改变
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      this.getData();
    },
    // 搜索
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },
    // 清空
    reset() {
      // 1:清空表单  调用el-form身上resetFields() (1:el-form  model  ref  2:el-form-item prop绑定 3：通过ref  this.$refs.值.resetFields())
      this.$refs.form.resetFields();
      this.search();
    },
  },
};
</script>

<style></style>
