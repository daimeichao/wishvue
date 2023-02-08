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
      <div style="  background: rgb(255, 255, 255);
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
            <el-table-column prop="zyzname" label="用户名" width="130px"> </el-table-column>
            <el-table-column prop="reason" label="申请原因" width="130px"> </el-table-column>
            <el-table-column prop="zyz_audit_state" label="审核状态" width="130px">
              <template slot-scope="scope"width="130px">
                            <span v-if="scope.row.zyz_audit_state == '0'">待审核</span>
                            <span v-if="scope.row.zyz_audit_state== '1'">审核通过</span>
                <span v-if="scope.row.zyz_audit_state == '2'">审核不通过</span>
                          </template>
            </el-table-column>
            <el-table-column prop="zyz_audit_remark" label="审核备注" width="130px"> </el-table-column>
            <el-table-column label="操作" min-width="350">
              <template slot-scope="scope">
                  <btn :flag="9" @click.native="update(scope.row)"></btn>
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
    <div class="dialog_out">
      <el-dialog :title="title" :visible.sync="detailVisible" :before-close="closeWindow02" :modal-append-to-body="false">
        <el-form :model="form" label-width="150px" :label-position="labelPosition" ref="ruleForm">
          <el-form-item label="用户名:" prop="username">
            <span >{{ form.name}}</span>
          </el-form-item>
          <el-form-item label="申请原因:" prop="reason">
            <span >{{ form.reason }}</span>
          </el-form-item>
          <el-form-item label="申请时间:" prop="sq_time">
            <span >{{ form.sq_time }}</span>
          </el-form-item>
          <el-form-item label="审核状态:" prop=" jf_audit_state" >
            <span  v-if=" form. zyz_audit_state == '0'">待审核</span>
            <span  v-if="form. zyz_audit_state == '1'">审核通过</span>
            <span  v-if="form. zyz_audit_state == '2'">审核不通过</span>
          </el-form-item>
          <el-form-item label="审核备注:" prop="wish_audit_remark" >
            <span >{{ form.zyz_audit_remark?form.zyz_audit_remark:'无'}}</span>
          </el-form-item>
          <el-form-item label="新增时间:" prop="add_time">
            <span >{{ form.add_time }}</span>
          </el-form-item>
          <el-form-item label="审核人:" prop="claimant">
            <span >{{ form.zyz_auditid?form.zyz_auditid:'无'}}</span>
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
    <!-- 审核-->
    <div class="dialog_out">
      <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="closeWindow" :modal-append-to-body="false">
        <el-form ref="roleData" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="志愿者姓名:" prop="username">
            <span >{{ form.zyzname}}</span>
          </el-form-item>
          <el-form-item label="申请原因:" prop="reason1">
            <span >{{ form.reason }}</span>
          </el-form-item>
          <el-form-item label="申请时间:" prop="sq_time1">
            <span >{{ form.sq_time }}</span>
          </el-form-item>
          <el-form-item label="审核状态:" prop="zyz_audit_state">
            <el-select v-model="form.zyz_audit_state" placeholder="请选择审核状态" clearable style="width:50%;margin-right:10px;">
              <el-option v-for="item in  zyz_audit_state" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select></el-form-item>
          <el-form-item label="审核备注:" prop="zyz_audit_remark" v-if="form.zyz_audit_state==='2'">
            <el-input v-model="form.zyz_audit_remark" placeholder="请输入" maxlength="200" clearable style="width: 50%">
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
  </div>
</template>

<script>
  import {
    zyzlist,
    delById,
    getById,
    shById
  } from "../../api/zyzApi/zyzAx";
  import {getname} from "../../api/xygl/xyglAx";
  export default {
    data () {
      return {
        namelist:[],
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
        zyz_audit_state: [
          {value: '0',
            label: '待审核'},
          {
            value: '1',
            label: '审核通过'
          },
          {
            value: '2',
            label: '审核不通过'
          }],
        params: {
          zyz_audit_state:'',
          name:'',
          curpage: 1,
          pagesize: 10,
        },
        total: 0,
        rules: {
            zyzid: [
              {required: true, message: "请选择昵称", trigger: "blur"},],
            tx: [
              {required: true, message: "请上传头像", trigger: "blur"},],
            zyzname: [
              {required: true, message: "请输入志愿者姓名", trigger: "blur"},],
            sq_time: [
              {required: true, message: "请选择申请时间", trigger: "blur"},],
            reason: [
              {required: true, message: "请输入申请原因", trigger: "blur"},],
            zyz_audit_state: [
              {required: true, message: "请输入审核状态", trigger: "blur"},],
            zyz_audit_remark: [
              {required: true, message: "请输入备注", trigger: "blur"},],
        },
      };
    },
    methods: {
      //删除
      deleteDi (row) {
        let cs = {
          pid: row.zid,
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
      clearForm () {
        this.$refs.upload.clearFiles();
      },
      //打开编辑页面
      update (row) {
        this.$refs.upload && this.clearForm()
        this.type = 2;
        this.title = "审核志愿者申请";
        let sc = {
          pid: row.zid,
        };
        getById(sc).then((res) => {
          this.form=res.data.outmap.map;
          for (let i = 0; i <this.namelist.length ; i++) {
            if(this.namelist[i].pid==this.form.zyz_auditid){
              this.form.zyz_auditid=this.namelist[i].name;
            }
          }
          console.log("updres",res)
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
                shById(this.form).then((res) => {
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
        this.params.zyz_audit_state='0'
        zyzlist(this.params).then((res) => {
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
      //获取名字list
      getname(){
        getname().then((res) => {
          this.namelist=res.name;
        })},
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
      this.getname();
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
