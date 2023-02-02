<template>
  <div class="mmar">
    <div>

      <el-input v-model="params.claimant" placeholder="输入认领人姓名" clearable style="width:15%;margin-right:10px;margin-left: 20px;">
      </el-input>
      <el-button class="btnB" icon="el-icon-search" @click="search()">搜索</el-button>
      <el-button icon="el-icon-refresh" class="btnR" @click="reset()">重置</el-button>
      <el-button class="btnB" icon="el-icon-plus" @click="add()">新增</el-button>
      </div>
    <el-row>
      <!-- <el-col :span="1">
        <div style="height: 6vw;"></div>
      </el-col> -->
      <!-- <el-col :span="22"> -->
      <div style=" background: #fff;
          margin-top: 0.7vw;
          margin-left: 0vw;
          width: 99%;
          padding-top: 1vw;
        ">
        <template>
    <section ref="print">
      <el-table :data="tableData" style="width: 100%; margin-top: 10px" v-loading="loading"  stripe row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column prop="claimant" label="认领人姓名" width="120px"> </el-table-column>
        <el-table-column prop=" expressage" label="快递单号" width="120px">
        </el-table-column>
        <el-table-column prop="realize_time" label="实现时间"> </el-table-column>
        <el-table-column prop="claimant_audit_state" label="认领审核状态">
        </el-table-column>
        <el-table-column prop="wishusername" label="心愿发布人">
        </el-table-column>
        <el-table-column v-if="isOpenSendBack" label="操作" width="180px">
          <template slot-scope="scope">
            <div class="link_out">
              <el-link type="primary" :underline="false" @click="updata(scope.row)">
                编辑</el-link>
              <el-link type="primary" :underline="false" @click="detail(scope.row)">
                详情</el-link>
              <el-link type="primary" :underline="false" @click="deleteDi(scope.row)">
                删除</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!--分页-->
    <div class="blockPage">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.curpage" :page-sizes="[10, 30, 60, 100]" :page-size="params.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
</template>
</div>
</el-row>
    <!-- 新增S 或 修改 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="closeWindow" :modal-append-to-body="false">
      <el-form ref="roleData" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="许愿人姓名:" prop="claimant">
          <el-input v-model="form.claimant" placeholder="请输入" clearable style="width: 50%">
          </el-input>
        </el-form-item>
        <el-form-item label="快递单号:" prop="expressage">
          <el-input v-model="form.expressage" placeholder="请输入" clearable style="width: 50%">
          </el-input>
        </el-form-item>
        <el-form-item label="许愿时间:" prop="realize_time">
          <el-date-picker v-model="form.realize_time" type="datetime" placeholder="选择日期时间" style="width: 50%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作人id:" prop="operatorid">
          <el-input v-model="form.operatorid" placeholder="" maxlength="10" style="width: 50%"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" style="text-align: right">
        <el-button @click="closeWindow()">关 闭</el-button>
        <el-button type="primary" @click="onSubmit('roleData')" v-if="type == 1">新 增</el-button>
        <el-button type="primary" @click="onUpdate('roleData')" v-if="type == 2">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 新增页E -->

    <!-- 详情表单 -->
    <el-dialog :title="title" :visible.sync="detailVisible" :before-close="closeWindow02" :modal-append-to-body="false">
      <el-form :model="form" label-width="150px" :label-position="labelPosition" ref="ruleForm">
        <el-form-item label="认领人姓名:" prop="claimant">
          <span >{{ form.claimant}}</span>
        </el-form-item>
        <el-form-item label="认领人id:" prop="wishuserid">
          <span >{{ form.claimantid }}</span>
        </el-form-item>
        <el-form-item label="心愿表id:" prop="wishid">
          <span >{{ form.wishid }}</span>
        </el-form-item>
        <el-form-item label="快递单号:" prop="expressage">
          <span >{{ form.expressage }}</span>
        </el-form-item>
        <el-form-item label="实现时间:" prop="realize_time">
          <span >{{ form.realize_time }}</span>
        </el-form-item>
        <el-form-item label="认领审核状态:" prop=" claimant_audit_state" >
          <span >{{ form. claimant_audit_state }}</span>
        </el-form-item>
        <el-form-item label="认领审核备注:" prop="claimant_audit_remark" >
          <span >{{form.claimant_audit_remark }}</span>
        </el-form-item>
        <el-form-item label="认领审核人id:" prop="claimant_auditid">
          <span >{{ form.claimant_auditid }}</span>
        </el-form-item>
        <el-form-item label="操作人id:" prop="operatorid">
          <span >{{ form.operatorid }}</span>
        </el-form-item>
        <el-form-item label="添加时间:" prop="add_time">
          <span >{{ form.add_time }}</span>
        </el-form-item>
        <el-form-item label="修改时间:" prop="update_time">
          <span >{{ form.update_time }}</span>
        </el-form-item>
      </el-form>

      <div class="dialog-footer" style="text-align:right">
        <el-button @click="closeWindow02">关 闭</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  import {
    addSX,
   updateSX,
    deleteSX,
    getSXList,
    getSXById
  } from "../../api/xygl/xyglAx";
  // import { getYhAndCompList } from "../../api/userApi/userAx";
  import config from '../../../config/config.js';
  import axios from 'axios';
  export default {
    data () {
      return {
        Input: "",
        ruleForm: [{ file: '' }],
        upload_file: {},
        treeLoading: true,
        dialogUploadVisable: false,
        title: "",
        type: 1,
        labelPosition: "right",
        form: {
          id:"",
          wishid:"",
          claimant:"",
          claimantid:"",
          realize_time:"",
          expressage:"",
          claimant_audit_state:"",
          claimant_audit_remark:"",
          claimant_auditid:"",
          operatorid:"",
          add_time:"",
          update_time:"",
          del:"",
        },
        isOpenSendBack: true,
        dialogVisible: false,
        detailVisible: false,
        loading: false,
        tableData: [],
        params: {
          id: "",
          claimant:"",
          curpage: 1,
          pagesize: 10,
        },
        //心愿审核选项
        // company_id_options: [],
        total: 0,
        rules: {
          claimant: [
            { required: true, message: "请输入claimant", trigger: "blur" },
          ],
          realize_time: [
            { required: true, message: "请选择realize_time", trigger: "blur" },
          ],
          operatorid: [
            { required: true, message: "请输入operatorid", trigger: "blur" },
            // { validator: validQC, trigger: "blur" }
          ],
        },
      };
    },
    methods: {
      // BlurText01 (e) {
      //   this.form.seats_total = e.target.value
      // },
      // BlurText02 (e) {
      //   this.form.treatment_total = e.target.value
      // },
      //删除
      deleteDi (row) {
        // console.log("row=",row)
        let cs = {
          id: row.id,
        };
        this.$confirm("是否删除该条设备信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleteSX(cs).then((res) => {
              if (res.status == "success") {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.dialogVisible = false;
                if (this.tableData.length == 1 && this.params.curpage != 1) {
                  this.params.curpage = this.params.curpage - 1;
                }
                this.handleCurrentChange(this.params.curpage);
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败，请联系管理员!",
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
      detail (row) {
        this.title = "详情";
        // console.log("row=",row);
        let sc = {
          id: row.id,
        };
        // console.log("sc", sc);
        getSXById(sc).then((res) => {
           // console.log("sdad",res);
          this.form=res.wishClainmant;
          this.detailVisible = true;
        });
      },
      //打开编辑页面
      updata (row) {
        this.type = 2;
        this.title = "修改心愿";
        // console.log("row=",row);
        let sc = {
          id: row.id,
        };
        // console.log("sc", sc);
        getSXById(sc).then((res) => {
          this.form=res.wishClainmant;
          this.dialogVisible = true;
        });
      },
      //点击编辑页面的修改按钮
      onUpdate (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm("是否修改设备?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
               updateSX(this.form).then((res) => {
                  if (res.status == "success") {
                    this.$message({
                      type: "success",
                      message: "修改成功!",
                    });
                    this.dialogVisible = false;
                    this.handleCurrentChange(this.params.curpage);
                  } else {
                    this.$message({
                      type: "error",
                      message: "修改失败，请联系管理员!",
                    });
                  }
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消修改",
                });
              });
          }
        });
      },
      //打开新增框
      add () {
        this.type = 1;
        this.title = "添加心愿";
        this.form.claimant ="";
        this.form.claimantid ="";
        this.form.expressage="";
        this.form.realize_time ="";
        // this.form.creation_user_id = JSON.parse(
        //   window.localStorage.getItem("hbouser")
        // ).id;
        this.dialogVisible = true;
      },
      //关闭新增框或编辑框
      closeWindow () {
        this.$nextTick(() => {
          let af = this.$refs['roleData']
          if (af) {
            af.clearValidate()
          }
        });
        this.dialogVisible = false;
      },
      closeWindow02 () {
        // this.$nextTick(() => {
        //   this.$refs['formName'].resetFields();
        // });
        this.detailVisible = false;
      },
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm("是否新增心愿?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                addSX(this.form).then((res) => {
                  // console.log("res=", res);
                  if (res.status == "success") {
                    this.$message({
                      type: "success",
                      message: "新增成功!",
                    });
                    this.dialogVisible = false;
                    this.getSXList();
                  } else {
                    this.$message({
                      type: "error",
                      message: "新增失败，请联系管理员!",
                    });
                  }
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消新增",
                });
              });
          }
        });
      },
      //搜索
      search () {
        if (this.params.o_type != '' || this.params.company_id != '') {
          this.params.curpage = 1
        }
        this.getSXList();
      },
      //重置
      reset () {
        this.params.claimant = "";
        this.params.curpage = 1;
        this.params.pagesize = 10;
        this.getSXList();
      },
      //获取列表
      getSXList () {
        getSXList(this.params).then((res) => {
          // console.log(res)
          if (res.status == "success") {
            this.tableData = res.data.outmap.list;
            this.total = res.data.outmap.count;
          } else {
            this.total = 0
          }
          this.loading = false;
        });
      },
      // 显示数
      handleSizeChange (val) {
        this.params.pagesize = val;
        this.getSXList();
      },
      // 跳页
      handleCurrentChange (val) {
        this.loading = true;
        this.params.curpage = val;
        this.getSXList();
      },
    },
    //初始渲染
    created () {
      this.getSXList();
    },
  };
</script>

<style>
  /*@import "../../css/print.css";*/

  .el-table_6_column_44 el-table__cell {
    width: 160px;
  }
</style>
