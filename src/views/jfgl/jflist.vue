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
                      用户姓名：
                    </div>
                    <div style="margin-left: 5px">
                      <el-input v-model="params.name" placeholder="请输入" show-word-limit
                                style="width: 12vw; height: 1vh; margin-left: 0.5vw"></el-input>
                    </div>
                  </el-col>
                </div>

                <div class="disFlexCenter" style="margin-top: 5px">
                  <button style="background-color: rgb(0, 97, 172)" @click="search()">
                    搜索
                  </button>
                  <button style="background-color: rgb(30, 185, 136)" @click="reset()">
                    重置
                  </button>
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
      <div style="  background: rgb(255, 255, 255);font-size: 18px;
    margin-top: 0.7vw;
    margin-left: 0vw;
    width: 97.8%;
    margin-left: 1vw;
    padding-top: 1vw; ">
        <template>
          <el-table :data="tableData" style="width: 90%; margin-top: 10px"  stripe v-loading="loading" row-key="tid" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column
              label="序号"
              type="index"
              width="50px"
              align="center">
            </el-table-column>
            <el-table-column prop="name" label="用户名" width="130px"> </el-table-column>
            <el-table-column prop="change" label="增减" width="130px">
              <template slot-scope="scope"width="130px">
                            <span v-if="scope.row.change == '0'" style="text-align:center;font-size: 18px;color: #308917;">新增</span>
                            <span v-if="scope.row.change== '1'">消费</span>
                          </template>
            </el-table-column>
            <el-table-column prop="changenum" label="变化积分数" width="130px"> </el-table-column>
            <el-table-column label="操作" min-width="350">
              <template slot-scope="scope">
                <btn :flag="5" @click.native="detail(scope.row)"></btn>
<!--                <btn :flag="1" @click.native="update(scope.row)"></btn>-->
                <btn :flag="2" @click.native="deleteDi(scope.row)"></btn>

              </template>
            </el-table-column>
          </el-table>
          <div class="blockPage">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.curpage" :page-sizes="[10, 30, 60, 100]" :page-size="params.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </template>
      </div>
    </el-row>
    <!-- 详情表单 -->
    <div class="dialog_out" style="font-size: 18px">
      <el-dialog :title="title" :visible.sync="detailVisible" :before-close="closeWindow02" :modal-append-to-body="false">
        <el-form :model="form" label-width="150px" :label-position="labelPosition" ref="ruleForm">
          <el-form-item label="用户名:" prop="username">
            <span >{{ form.name}}</span>
          </el-form-item>
          <el-form-item label="变化:" prop="change">
            <span  v-if=" form.change=='0'" >增加积分</span>
            <span  v-if=" form.change=='1'" >消费积分</span>
          </el-form-item>
          <el-form-item label="变化积分:" prop=" changenum" >
            <span>{{form.changenum}}</span>
          </el-form-item>
          <el-form-item label="积分来源备注:" prop="wish_audit_remark" >
            <span >{{ form.jf_origin?form.jf_origin:'无'}}</span>
          </el-form-item>
          <el-form-item label="新增时间:" prop="add_time">
            <span >{{ form.add_time }}</span>
          </el-form-item>
          <el-form-item label="审核人:" prop="jf_auditid">
            <span >{{ form.jf_auditid?form.jf_auditid:'无'}}</span>
          </el-form-item>
        </el-form>
        <div class="dialog-footer" style="text-align: right">
      <span slot="footer" class="dialog-footer" style="text-align: right ; ">
    <button style="
    margin-left: 80%;
              width: 4vw;
              height: 2vw;
              border: 1px solid #a7a8aa;
              background-color: #a7a8aa;
              color: #ffffff;
              border-radius: 0.3vw;
              font-size: 0.85vw;
            " @click="closeWindow02">
      <div style="">取消</div>
    </button>
      </span></div>
        <div style="height: 0px; clear: both"></div></el-dialog></div>
  </div>
</template>

<script>
  import {
    jflist,
    delById,
    getById,
    updById
  } from "../../api/jf/jfAx";
  export default {
    data () {
      return {
        minheight: "",
        dialogImageUrl: '',
        treeLoading: true,
        dialogUploadVisable: false,
        title: "",
        type: 1,
        labelPosition: "right",
        form: {
        },
        isOpenSendBack: true,
        dialogVisible: false,
        detailVisible: false,
        loading: false,
        tableData: [],
        params: {
         name:'',
          curpage: 1,
          pagesize: 10,
        },
        total: 0,
        rules: {
          sort: [
            { required: true, message: "请输入排序", trigger: "blur" },],
        },
      };
    },
    methods: {
      //删除
      deleteDi (row) {
        let cs = {
          pid: row.jid,
        };
        this.$confirm("是否删除该条认领信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            delById(cs).then((res) => {
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
          pid: row.jid,
        };
        getById(sc).then((res) => {
          this.form=res.data.outmap.map
          this.detailVisible = true;
        });
      },
      clearForm () {
        this.$refs.upload.clearFiles();
      },
      //打开编辑页面
      update (row) {
        this.$refs.upload && this.clearForm()
        this.type = 2;
        this.title = "审核实现心愿";
        this.form.url='';
        let sc = {
          pid: row.jid,
        };
        getById(sc).then((res) => {
          this.form=res.map;
          this.form.zyz_auditid=localStorage.getItem("pid");
          this.dialogVisible = true;
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
                updById(this.form).then((res) => {
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
                    this.dialogVisible = false;
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
                  if (res.result == "success") {
                    this.$message({
                      type: "success",
                      message: "新增成功!",
                    });
                    this.dialogVisible = false;
                    this.getlist();
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
        this.getlist();
      },
      //重置
      reset () {
        this.params.name = "";
        this.params.curpage = 1;
        this.params.pagesize = 10;
        this.getlist();
      },
      //获取列表
      getlist () {
        jflist(this.params).then((res) => {
          if (res.status == "success") {
            console.log("jflist",res)
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
        this.getlist();
      },
      // 跳页
      handleCurrentChange (val) {
        this.loading = true;
        this.params.curpage = val;
        this.getlist();
      },

    },
    //初始渲染
    created () {
      this.getlist();
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
