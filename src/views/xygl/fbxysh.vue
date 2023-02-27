<template>
   <div v-bind:style="{
    minHeight: minheight,
    backgroundColor: 'rgb(245,245,245)',
    top: '0',
    left: '0',
    position: 'relative',
    width: '100%',
  }">
  <!-- 搜索框 -->
  <el-row class="rowClass">
    <el-col :span="24">
      <el-col :span="1">
        <div style="height: 6vw"></div>
      </el-col>
      <el-col :span="22">
        <div style="
              background-color: white;
              height: 6vw;
              width: 100%;
              margin-left: -3.5vw;
              padding-top: 1.8vw;
            ">
          <div>
            <el-row class="disFlexCenter">
              <el-col :span="1"></el-col>
              <div>
                <el-col class="disFlexCenter">
                  <div style="font-size: 0.85vw">
                    许愿人姓名：
                  </div>
                  <div>
                    <el-input v-model="params.wishusername" placeholder="请输入许愿人" show-word-limit
                              style="width: 12vw; height: 1vh; margin-left: 0.5vw"></el-input>
                  </div>
                </el-col>
              </div>

              <div class="disFlexCenter" style="margin-top: 5px">
                <el-button style="background-color: #FFC0CB;color: #FFFFFF"  icon="el-icon-search" @click="search()">搜索</el-button>
                <el-button style="background-color: #63B184;color: #FFFFFF" icon="el-icon-refresh-right" @click="reset()">重置</el-button>
              </div>
              <div>
                <el-col :span="22" style="margin-top: 3vh"> </el-col>
              </div>
              <el-col :span="1" style="margin-top: 3vh"></el-col>
            </el-row>
          </div>
        </div>
      </el-col>

      <el-col :span="1">
        <div style="height: 6vw"></div>
      </el-col>
    </el-col>
  </el-row>
     <el-row>
       <!-- <el-col :span="1">
         <div style="height: 6vw;"></div>
       </el-col> -->
       <!-- <el-col :span="22"> -->
       <div style=" background: rgb(255, 255, 255);
    margin-top: 0.7vw;
    margin-left: 0vw;
    width: 97.8%;
    margin-left: 1vw;
    padding-top: 1vw;
        ">
         <template>
      <el-table :data="tableData" style="width: 100%; margin-top: 10px" v-loading="loading"  stripe row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column
          label="序号"
          type="index"
          width="50px"
          align="center">
        </el-table-column>
        <el-table-column prop="wishusername" label="许愿人姓名" min-width="100"> </el-table-column>
        <el-table-column prop="wish_time" label="许愿时间"> </el-table-column>
        <el-table-column prop="wish_audit_state" label="心愿审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.wish_audit_state == '0'">待审核</span>
            <span v-if="scope.row.wish_audit_state == '1'">审核通过</span>
            <span v-if="scope.row.wish_audit_state == '2'">审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="350">
          <template slot-scope="scope">
            <el-button size="mini" style="background-color: #ef8f19;color: #FFFFFF" @click="updata(scope.row)">审核</el-button>
            <el-button size="mini" type="danger" @click.native="deleteDi(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <!--分页-->
     <div class="blockPage">
       <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.curpage" :page-sizes="[10, 30, 60, 100]" :page-size="params.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
       </el-pagination>
     </div>
</template>
</div>
</el-row>
    <!-- 新增S 或 修改 -->
     <div class="dialog_out">
    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="closeWindow" :modal-append-to-body="false">
      <el-form ref="roleData" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="许愿人姓名:" prop="wishusername">
          <el-input v-model="form.wishusername" disabled placeholder="无" clearable style="width: 50%">
          </el-input>
        </el-form-item>
        <el-form-item label="许愿人地址:" prop="adder">
          <el-input v-model="form.adder" :disabled="true" placeholder="无" clearable style="width: 50%">
          </el-input>
        </el-form-item>
        <el-form-item label="许愿时间:" prop="wish_time">
          <el-date-picker v-model="form.wish_time"  :disabled="true" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="未选择时间" style="width: 50%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="心愿内容:" prop="seats_total">
          <el-input v-model="form.wish_content" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :disabled=" true"placeholder="无" maxlength="10" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="心愿审核状态:" prop="wish_audit_state">
        <el-select v-model="form.wish_audit_state" placeholder="请选择心愿状态" clearable style="width:50%;margin-right:10px;">
          <el-option v-for="item in  wish_audit_state" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select></el-form-item>
        <el-form-item label="审核备注:" prop="wish_audit_remark" v-if="form.wish_audit_state==='2'">
          <el-input v-model="form.wish_audit_remark" placeholder="请输入" maxlength="200" clearable style="width: 50%">
          </el-input>
        </el-form-item>

          <el-form-item label="排序:" prop="sort">
            <el-input v-model="form.sort" placeholder="请输入1~9位正整数" maxlength="9" onkeyup="this.value=this.value.replace(/[^\d]/g,'');" clearable style="width: 50%">
            </el-input>
          </el-form-item>
      </el-form>
      <div style="width: 12vw; float: right">
    <button style="
    margin-left: 80%;
              width: 4vw;
              height: 2vw;
              border: 1px solid #a7a8aa;
              background-color: #a7a8aa;
              color: #ffffff;
              border-radius: 0.3vw;
              font-size: 0.85vw;
            " @click="closeWindow()">
      <div style="">取消</div>
    </button>
    <button style="
              width: 4vw;
              height: 2vw;
              border: 1px solid #0061ac;
              background-color: #0061ac;
              color: #ffffff;
              border-radius: 0.3vw;
              font-size: 0.85vw;
            " @click="onUpdate('roleData')" v-if="type == 2">
      <div style="">提交</div>
    </button></div>
      <div style="height: 0px; clear: both"></div>
    </el-dialog></div>
    <!-- 新增页E -->
     <div class="dialog_out">
    <!-- 详情表单 -->
    <el-dialog :title="title" :visible.sync="detailVisible" :before-close="closeWindow02" :modal-append-to-body="false">
      <el-form :model="form" label-width="150px" :label-position="labelPosition" ref="ruleForm">
        <el-form-item label="许愿人姓名:" prop="wishusername">
          <span >{{ form.wishusername}}</span>
        </el-form-item>
        <el-form-item label="许愿人id:" prop="wishuserid">
          <span >{{ form.wishuserid }}</span>
        </el-form-item>
        <el-form-item label="心愿内容:" prop="wish_content">
          <span >{{ form.wish_content }}</span>
        </el-form-item>
        <el-form-item label="许愿人地址:" prop="adder">
          <span >{{ form.adder }}</span>
        </el-form-item>
        <el-form-item label="心愿时间:" prop="wish_time">
          <span >{{ form.wish_time }}</span>
        </el-form-item>
        <el-form-item label="审核状态:" prop=" wish_audit_state" >
<!--          <span style="font-size:18px">{{ form. wish_audit_state }}</span>-->
          <span v-if=" form. wish_audit_state == '0'">待审核</span>
                      <span v-if="form. wish_audit_state == '1'">审核通过</span>
          <span v-if="form. wish_audit_state == '2'">审核不通过</span>
        </el-form-item>

        <el-form-item label="心愿审核备注:" prop="wish_audit_remark" >
          <span >{{ form.wish_audit_remark}}</span>
        </el-form-item>
        <el-form-item label="心愿审核人id:" prop="wish_auditid">
          <span >{{ form.wish_auditid }}</span>
        </el-form-item>
        <el-form-item label="心愿状态:" prop="wish_state">
<!--          <span style="font-size:18px">{{ form.wish_state }}</span>-->
          <span v-if=" form.wish_state == '0'">待认领</span>
                      <span v-if="form.wish_state == '1'">已认领</span>
          <span v-if="form.wish_state == '2'">已完成</span>
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
        <el-form-item label="排序:" prop="sort">
          <span >{{ form.sort }}</span>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" style="text-align:right">
        <el-button @click="closeWindow02">关 闭</el-button>
      </div>

    </el-dialog>
    <!-- 新增E -->
     </div></div>
</template>

<script>
  import {
    addWish,
    updateWish1,
    deleteWish1,
    getxySHList,
    getWishById
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
          wishusername:"",
          wishuserid:"",
          wish_content:"",
          adder:"",
          wish_time:"",
          wish_audit_state:"",
          wish_audit_remark:"",
          wish_auditid:"",
          wish_state:"",
          operatorid:"",
          add_time:"",
          update_time:"",
          sort:"",

        },
        minheight: "",
        wish_state_options: [
          {
            value: "0",
            label: "待认领",
          },
          {
            value: "1",
            label: "已认领",
          },
          {
            value: "2",
            label: "已完成",
          }],
        isOpenSendBack: true,
        dialogVisible: false,
        detailVisible: false,
        loading: false,
        tableData: [],
        wish_audit_state: [
        //   {
        //   value: '0',
        //   label: ''
        // },
          {
            value: '1',
            label: '审核通过'
          },
          {
            value: '2',
            label: '审核不通过'
          }],
        wish_state:[{
          value: '0',
          label: '待审核'
        },
          {
            value: '1',
            label: '审核通过'
          },
          {
            value: '2',
            label: '审核不通过'
          }],
        params: {
          id: "",
          wishusername:"",
          curpage: 1,
          pagesize: 10,
        },

        total: 0,
        rules: {
          wish_audit_remark:[
            { required: true, message: "请输入心愿审核备注", trigger: "blur" },
          ],
          sort:[
            { required: true, message: "请输入排序", trigger: "blur" },
          ],
          wish_audit_state:[
            { required: true, message: "请选择心愿审核状态", trigger: "blur" },
          ]
        },
      };
    },
    methods: {
      //删除
      deleteDi (row) {
        let cs = {
          pid: row.pid,
        };
        this.$confirm("是否删除该条心愿信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleteWish1(cs).then((res) => {
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
        let sc = {
          id: row.pid,
        };
        getWishById(sc).then((res) => {
          this.form=res.map

          this.detailVisible = true;
        });
      },
      //打开编辑页面
      updata (row) {
        this.type = 2;
        this.title = "审核已发布心愿";

        let sc = {
          id: row.pid,
        };
        getWishById(sc).then((res) => {
          this.form=res.map
          this.form.wish_audit_state = '';
          this.dialogVisible = true;
          this.form.wish_auditid = localStorage.getItem("pid");
        });
      },
      //点击编辑页面的修改按钮
      onUpdate (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm("是否审核?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                updateWish1(this.form).then((res) => {
                  if (res.status == "success") {
                    this.$message({
                      type: "success",
                      message: "审核成功!",
                    });
                    this.dialogVisible = false;
                    this.handleCurrentChange(this.params.curpage);
                  } else {
                    this.$message({
                      type: "error",
                      message: "审核失败，请联系管理员!",
                    });
                  }
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消审核",
                });
              });
          }
        });
      },
      //打开新增框
      add () {
        this.type = 1;
        this.title = "添加心愿";
        this.form.wishusername ="";
        this.form.wishuserid ="";
        this.form. wish_content="";
        this.form.adder="";
        this.form.wish_time ="";
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
                addWish(this.form).then((res) => {
                  if (res.result == "success") {
                    this.$message({
                      type: "success",
                      message: "新增成功!",
                    });
                    this.dialogVisible = false;
                    this.getxySHList();
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
        this.getxySHList();
      },
      //重置
      reset () {
        this.params.wishusername = "";
        this.params.curpage = 1;
        this.params.pagesize = 10;
        this.getxySHList();
      },
      //获取心愿待审核列表
      getxySHList () {
        getxySHList(this.params).then((res) => {
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
        this.getxySHList();
      },
      // 跳页
      handleCurrentChange (val) {
        this.loading = true;
        this.params.curpage = val;
        this.getxySHList();
      },

    },
    //初始渲染
    created () {
      this.getxySHList();
      // this.getYhAndCompList();获取单位列表
    },
  };
</script>

<style>
  /*@import "../../css/print.css";*/
  @import "../../css/common.css";

  .innerdialog {
    width: 100%;
    height: 80vh;
    overflow-y: hidden;
  }

  /deep/ .el-transfer-panel {
    width: 38% !important;
  }

  /deep/ .el-transfer-panel__body {
    height: 85vh !important;
  }

  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
  }

  .clearfloat {
    zoom: 1;
  }

  /deep/ .el-transfer-panel__list.is-filterable {
    height: 100% !important;
  }

  /deep/ .el-checkbox:last-of-type {
    margin-left: 0 !important;
    margin-right: 0px !important;
  }

  .demo-block-control {
    border-top: 1px solid #eaeefb;
    /* height: 44px; */
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;

    transition: all 1s;
    -moz-transition: all 1s;
    -webkit-transition: all 1s;
    -o-transition: all 1s;
  }

  .demo-block-control:hover {
    color: #409eff;
  }

  /deep/ .el-textarea__inner {
    font-size: 1vw;
    height: 6vw;
    color: black;
  }

  .slh {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  /* /deep/ .el-textarea__inner {
    background-color: #f1f1f1;
    resize: none;
    color: black;
  } */
  /deep/ .el-textarea.is-disabled .el-textarea__inner {
    color: black;
  }

  .jsshu ::-webkit-scrollbar {
    width: 0.5vw !important;
    display: block !important;
  }

  .jsshu ::-webkit-scrollbar-track {
    background-color: rgb(255, 244, 240);
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }

  .jsshu ::-webkit-scrollbar-thumb {
    background-color: #adacac;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }

  .jsshu .el-input__inner {
    height: 2vw;
  }

  .jsshu>>>.el-textarea .el-input__count {
    background: inherit;
  }

  /deep/ .el-table td,
  .el-table th.is-leaf {
    border-bottom: 0px solid white;
    border-right: 0px solid white;
  }

  /deep/ .el-table::before {
    height: 0px;
  }

  /deep/ .el-table th>.cell {
    font-size: 18px;
    padding-left: 8px;
  }

  /deep/ .el-table th {
    padding-left: 9px;
  }

  /deep/ .el-table {
    font-size: 16px;
  }

  .out /deep/ .el-dialog__body {
    padding-top: 20px;
  }

  .dialog_out /deep/ .el-dialog {
    background-color: white;
  }

  .dialog_out /deep/ .el-input__inner {
    font-size: 0.8vw !important;
    /* color: white; */
    height: 40px;
    background: white;
  }

  .el-select-dropdown__item.selected {
    background-color: white;
  }

  /deep/ .el-form-item {
    margin-bottom: 8px;
  }

  /* /deep/ .el-dialog__body {
    padding: 1px 20px 30px 20px;
  } */
  /deep/ .el-dialog__header {
    background-color: #f2f3f4;
    height: 3.7vw;
    line-height: 1.4vw;
    border-bottom: 1px solid #f2f3f4;
  }

  /deep/ .tjinput .el-input__inner {
    background-color: white !important;
  }

  /deep/ .el-dialog__header {
    padding: 1vw 1vw 0.5vw 1vw;
  }

  .clearfix:after,
  .clearfix:before {
    content: "";
    display: table;
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix {
    *zoom: 1;
  }

  .disFlexCenter button {
    margin-left: 10px;
  }

  /* /deep/ .el-dialog__body {
    padding: 1px 0px 30px 0px;
  } */
  .rowClass {
    margin-top: 15px;
    background: white;
    margin-bottom: 15px;
    margin-right: 15px;
    margin-left: 15px;
  }

  .el-table_6_column_44 el-table__cell {
    width: 160px;
  }
</style>
