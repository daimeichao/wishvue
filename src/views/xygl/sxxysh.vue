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
                      认领人姓名：
                    </div>
                    <div style="margin-left: 5px">
                      <el-input v-model="params.claimant" placeholder="请输入认领人" show-word-limit
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
        <el-table-column prop="claimant" label="认领人姓名" width="130px"> </el-table-column>
        <el-table-column prop="expressage" label="快递单号" width="130px">
        </el-table-column>
        <el-table-column prop="realize_time" label="实现时间" width="130px"> </el-table-column>
        <el-table-column prop="claimant_audit_state" label="认领审核状态" width="130px">
          <template slot-scope="scope"width="130px">
                        <span v-if="scope.row.claimant_audit_state == '0'">待审核</span>
                        <span v-if="scope.row.claimant_audit_state== '1'">审核通过</span>
            <span v-if="scope.row.claimant_audit_state == '2'">审核不通过</span>
                      </template>
        </el-table-column>
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
    <!-- 新增S 或 修改 -->
    <div class="dialog_out">
    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="closeWindow" :modal-append-to-body="false">
      <el-form ref="roleData" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="许愿人姓名:" prop="wishusername">
          <el-input v-model="form.wishusername" :disabled="true"placeholder="无" clearable style="width: 50%">
          </el-input>
        </el-form-item>
        <el-form-item label="许愿时间:" prop="wish_time">
          <el-date-picker v-model="form.wish_time" :disabled="true"  value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="未选择时间" style="width: 50%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="许愿内容:" prop="wish_content">
          <el-input v-model="form.wish_content":disabled="true" placeholder="无" clearable style="width: 50%">
          </el-input>
        </el-form-item>
        <el-form-item label="认领人姓名:" prop="claimant">
          <el-input v-model="form.claimant" :disabled="true" placeholder="无" clearable style="width: 50%">
          </el-input>
        </el-form-item>
        <el-form-item label="快递单号:" prop="expressage">
          <el-input v-model="form.expressage" :disabled="true" placeholder="无" clearable style="width: 50%">
          </el-input>
        </el-form-item>
        <el-form-item label="实现时间:" prop="realize_time">
          <el-date-picker v-model="form.realize_time" :disabled="true" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="未选择时间" style="width: 50%">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="实现审核状态:" prop="claimant_audit_state">
          <el-select v-model="form.claimant_audit_state" placeholder="请选择审核状态" clearable style="width:50%;margin-right:10px;">
            <el-option v-for="(item,index) in  claimant_state_options" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实现审核备注:" prop="claimant_audit_remark" v-if="form.claimant_audit_state==='2'">
          <el-input v-model="form.claimant_audit_remark" placeholder="请输入" clearable style="width: 50%">
          </el-input></el-form-item>

        <el-form-item label="附件" >
           <div>
          <el-image v-for="(item,index) in urlList" :key="index" @click="openImg(item.url)" :preview-src-list="srcList" fit="contain" style="width: 100px; height: 100px" :src="item.url">
                              </el-image>
          <span v-if="urlList.length==0">无</span>
        </div>

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

    <!-- 详情表单 -->
    <div class="dialog_out">
    <el-dialog :title="title" :visible.sync="detailVisible" :before-close="closeWindow02" :modal-append-to-body="false">
      <el-form :model="form" label-width="150px" :label-position="labelPosition" ref="ruleForm">
        <el-form-item label="认领人姓名:" prop="claimant">
          <span >{{ form.claimant}}</span>
        </el-form-item>
        <el-form-item label="认领人id:" prop="wishuserid">
          <span >{{ form.claimantid }}</span>
        </el-form-item>
        <el-form-item label="心愿表id:" prop="wishid">
          <span >{{ form.sxid }}</span>
        </el-form-item>
        <el-form-item label="快递单号:" prop="expressage">
          <span >{{ form.expressage }}</span>
        </el-form-item>
        <el-form-item label="实现时间:" prop="realize_time">
          <span >{{ form.realize_time }}</span>
        </el-form-item>
        <el-form-item label="认领审核状态:" prop=" claimant_audit_state" >
<!--          <span style="font-size:18px">{{ form. claimant_audit_state }}</span>-->
          <span v-if=" form. claimant_audit_state == '0'">待审核</span>
                      <span v-if="form. claimant_audit_state == '1'">审核通过</span>
          <span v-if="form. claimant_audit_state == '2'">审核不通过</span>
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
          <span >{{ form.sxat }}</span>
        </el-form-item>
        <el-form-item label="修改时间:" prop="update_time">
          <span >{{ form.sxut }}</span>
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
            " @click="closeWindow02">
      <div style="">取消</div>
    </button></div>
      <div style="height: 0px; clear: both"></div>

    </el-dialog>
    <!-- 新增E -->

    </div> </div>
</template>

<script>
import {
  addSX,
  updateSX1,
  deleteSX,
  getsxSHList,
  getSXById, updateWish
} from "../../api/xygl/xyglAx";
  // import { getYhAndCompList } from "../../api/userApi/userAx";
  import config from '../../../config/config.js';
  import axios from 'axios';
  export default {
    data () {
      return {
        //通过wishid获取的附件地址数组
        urlList:[],
        srcList:[],
        fileList:[],
        minheight: "",
        dialogImageUrl: '',
        // dialogVisible: false,
        fileUpload: config.apiUrl + "/upload/fileupload",
        url: config.apiUrl + "/upload/fileupload",
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
          tid:"",
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
          fbat:"",
          fbut:"",
          sort:"",
          wishid:"",
          claimant:"",
          claimantid:"",
          realize_time:"",
          expressage:"",
          claimant_audit_state:"",
          sxat:"",
          sxut:"",
          price:"",
          url:""
        },
        claimant_state_options: [
          // {
          //   value: "0",
          //   label: "待审核",
          // },
          {
            value: "1",
            label: "审核通过",
          },
          {
            value: "2",
            label: "审核不通过",
          }],
        isOpenSendBack: true,
        dialogVisible: false,
        detailVisible: false,
        loading: false,
        tableData: [],
        params: {
          claimant_audit_state:"0",
          id: "",
          claimant:"",
          curpage: 1,
          pagesize: 10,
        },
        total: 0,
        rules: {
          sort: [
            { required: true, message: "请输入排序", trigger: "blur" },],
         claimant_audit_state: [
            { required: true, message: "请选择实现审核状态", trigger: "blur" },
          ],
          claimant_audit_remark: [
            { required: true, message: "请输入备注", trigger: "blur" },
          ],
        },
      };
    },
    methods: {
      //放大图片的方法
      openImg (url) {
        this.srcList = []
        this.srcList.push(url)
      },
      //是否大金额
      changePriceFunc(row) {
        row.price = row.ifprice?"1":"0"
        updateWish({
          id:row.id,
          price: row.price,
        }).then((res) => {
          if (res.errorCode === 0) {

            this.handleCurrentChange(this.params.curpage)
          } else {
            this.$message({
              showClose: true,
              message: res.data.result,
              type: "error",
            });
          }
        });
      },
      //删除
      deleteDi (row) {
        let cs = {
          pid: row.tid,
        };
        this.$confirm("是否删除该条认领信息?", "提示", {
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
        let sc = {
          id: row.tid,
        };
        getSXById(sc).then((res) => {
          this.form=res.map
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
          wishid:row.id,
          id: row.tid,
          tid:row.tid,
        };
        getSXById(sc).then((res) => {
          this.form=res.map;
          this.urlList=res.urlList
          this.form.claimant_audit_state='';
          this.form.claimant_auditid=localStorage.getItem("pid");
          if(this.urlList.length!=0){
            for (let i = 0; i <this.urlList.length ; i++) {
              this.urlList[i].url=config.apiUrl+this.urlList[i].url
            }}
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
                updateSX1(this.form).then((res) => {
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
                  if (res.result == "success") {
                    this.$message({
                      type: "success",
                      message: "新增成功!",
                    });
                    this.dialogVisible = false;
                    this.getsxSHList();
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
        this.getsxSHList();
      },
      //重置
      reset () {
        this.params.claimant = "";
        this.params.curpage = 1;
        this.params.pagesize = 10;
        this.getsxSHList();
      },
      //获取列表
      getsxSHList () {
        getsxSHList(this.params).then((res) => {
          if (res.status == "success") {
            this.tableData = res.list;
            this.total = res.count;
          } else {
            this.total = 0
          }
          this.loading = false;
        });
      },
      // 显示数
      handleSizeChange (val) {
        this.params.pagesize = val;
        this.getsxSHList();
      },
      // 跳页
      handleCurrentChange (val) {
        this.loading = true;
        this.params.curpage = val;
        this.getsxSHList();
      },

    },
    //初始渲染
    created () {
      this. getsxSHList();
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
