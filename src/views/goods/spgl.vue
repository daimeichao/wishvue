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
                      商品名称：
                    </div>
                    <div style="margin-left: 5px">
                      <el-input v-model="params.name" placeholder="请输入" show-word-limit
                                style="width: 12vw; height: 1vh; margin-left: 0.5vw"></el-input>
                    </div>
                  </el-col>
                </div>

                <div class="disFlexCenter" style="margin-top: 5px">
                  <el-button style="background-color: #FFC0CB;color: #FFFFFF"  icon="el-icon-search" @click="search()">搜索</el-button>
                  <el-button style="background-color: #63B184;color: #FFFFFF" icon="el-icon-refresh-right" @click="reset()">重置</el-button>

                  <button style="background-color: rgb(0, 97, 172)" @click="addsp()">
                    新增
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
            <el-table-column prop="spname" label="商品名称" width="130px"> </el-table-column>
            <el-table-column prop="spprice" label="商品价格" width="100px">
            </el-table-column>
            <el-table-column prop="kc" label="库存" width="50px"> </el-table-column>
            <el-table-column prop="add_time" label="上架时间" width="130px">
            </el-table-column>
            <el-table-column prop="spxq" label="商品详情" min-width="120" >
            </el-table-column>
            <el-table-column prop="url" label="商品图片" min-width="120">
              <template slot-scope="scope">
                <el-image @click="openImg(scope.row.url)" :preview-src-list="srcList" fit="contain" style="width: 200px; height: 150px" :src="scope.row.url">
                </el-image>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="200">
              <template slot-scope="scope">
                <btn :flag="5" @click.native="detail(scope.row)"></btn>
                <el-button size="mini" style="background-color: #63B184;color: #FFFFFF" @click="update(scope.row)">编辑</el-button>
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
<!--    新增和编辑弹窗-->
    <div class="dialog_out">
      <el-dialog :title="title" :visible.sync="adddialog" :before-close="closeWindow02" :modal-append-to-body="false">
        <el-form :model="form" :rules="rules"label-width="150px" :label-position="labelPosition" ref="roleData1">
          <el-form-item label="商品名称:" prop="spname">
            <el-input v-model="form.spname" placeholder="请输入" clearable style="width: 50%">
            </el-input>
          </el-form-item>
          <el-form-item label="商品详情:" prop="spxq">
            <el-input  type="textarea"
                       :autosize="{ minRows: 2, maxRows: 4}" v-model="form.spxq" placeholder="" maxlength="255" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="商品价格:" prop="spprice">
            <el-input v-model="form.spprice" placeholder="请输入" clearable style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="商品库存:" prop="kc">
            <el-input v-model="form.kc" placeholder="请输入" clearable style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="商品图片:" prop="url">
            <div >
              <el-upload class="avatar-uploader" style="display: inline-block;" ref="upload"
                         list-type="picture-card"
                         :action="fileUpload" :http-request="afterRead" multiple
                         :on-preview="handlePreview" :on-remove="handleRemove" :before-upload="beforeRead"
                         v-loading.fullscreen.lock="loading"  element-loading-text="上传中"
                         element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0,0.1)"
                         :before-remove="beforeRemove"  :on-exceed="handleExceed" :limit="1"
                         :file-list="fileList" >
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div> 
            <div>
            </div></el-form-item></el-form>
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
            "@click="closeWindow02()">
      <div style="">取消</div>
    </button>
          <button v-if="type==2" style="
              width: 4vw;
              height: 2vw;
              border: 1px solid #0061ac;
              background-color: #0061ac;
              color: #ffffff;
              border-radius: 0.3vw;
              font-size: 0.85vw;
            "  @click="onUpdate('roleData1')">
      <div style="">提交</div>
            <div style="height: 0px; clear: both"></div>
          </button>
          <button v-if="type==1" style="
              width: 4vw;
              height: 2vw;
              border: 1px solid #0061ac;
              background-color: #0061ac;
              color: #ffffff;
              border-radius: 0.3vw;
              font-size: 0.85vw;
            "  @click="onSubmit('roleData1')">
      <div style="">新增</div>
            <div style="height: 0px; clear: both"></div>
          </button>
        </span></div></el-dialog></div>
    <!-- 详情表单 -->
    <div class="dialog_out">
      <el-dialog :title="title" :visible.sync="detailVisible" :before-close="closeWindow02" :modal-append-to-body="false">
        <el-form :model="form" label-width="150px" :label-position="labelPosition" ref="ruleForm">
          <el-form-item label="商品名称:" prop="username">
            <span >{{ form.spname}}</span>
          </el-form-item>
          <el-form-item label="商品详情:" prop="username">
            <span >{{ form.spxq}}</span>
          </el-form-item>
          <el-form-item label="商品库存:" prop="score">
            <span >{{ form.kc }}</span>
          </el-form-item>
          <el-form-item label="商品价格:" prop="wish_audit_remark" >
            <span >{{ form.spprice}}元</span>
          </el-form-item>
          <el-form-item label="新增时间:" prop="add_time">
            <span >{{ form.add_time }}</span>
          </el-form-item>
          <el-form-item label="编辑时间:" prop="add_time">
            <span >{{ form.upd_time }}</span>
          </el-form-item>
          <el-form-item label="商品图片:" prop="url">
            <el-image @click="openImg(form.url)" :preview-src-list="srcList" fit="contain" style="width: 100px; height: 100px" :src="form.url">
            </el-image >
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
    <!--    预览图片弹窗-->
    <el-dialog
      title="图片预览"
      :visible.sync="previewVisible"
      width="50%">
      <img :src="previewPath" class="previewImg" style="width: 100%;height: 70%"/>
    </el-dialog>

  </div>
</template>

<script>
  import {
    splist,
    delsp,
    spById,
    addsp,
    updsp
  } from "../../api/jf/jfAx";
  import config from "../../../config/config";
  import axios from "axios";
  export default {
    data () {
      return {
        //控制图片预览窗口的显示与隐藏
        previewVisible:false,
        //图片地址url
        previewPath:'',
        url: config.apiUrl + "/upload/fileupload",
        fileList: [],
        srcList: [],
        img: '.jpg, .jpeg, .png, .gif',
        fileShowUrl: config.apiUrl,
        fileUpload: config.apiUrl + "/upload/fileupload",
        tpList:[],
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
        adddialog:false,
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
          spname: [
            { required: true, message: "请输入商品名称", trigger: "blur" },],
          spprice: [
            { required: true, message: "请输入商品价格", trigger: "blur" },],
          kc: [
            { required: true, message: "请输入商品库存", trigger: "blur" },],
          url: [
            { required: true, message: "请添加商品图片", trigger: "blur" },],
          spxq: [
            { required: true, message: "请输入商品详情", trigger: "blur" },],
        },
      };
    },
    methods: {
      handlePreview(file) {
        this.previewVisible = true;
        this.previewPath = file.url;
      },
      //放大图片的方法
      openImg (url) {
        this.srcList = [];
        this.srcList.push(url)
      },
      //附件
      beforeAvatarUpload(file) {
        // this.fileList=[];
        // 上传图片前处理函数
        const isJPG =
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/gif";
        const isLt2M = file.size / 1024 / 1024 < 2;
        let that = this;
        let isAllow = false;
        if (!isJPG) {
          this.$message.error("上传的附件只能是 jpg、png、gif 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传的附件大小不能超过 2MB!");
        }
        const isSize = new Promise(function (resolve, reject) {
          let width = 750;
          let height = 420;
          let _URL = window.URL || window.webkitURL;
          let image = new Image();
          image.onload = function () {
            let valid = image.width >= image.height;
            valid ? resolve() : reject();
          };
          image.src = _URL.createObjectURL(file);
        }).then(
          () => {
            return file;
          },
          () => {
            return file;
          }
        );
        return isJPG && isLt2M && isSize;
      },
      handleAvatarSuccess(res, file, fileList) {
        // 原图
        this.IMG = config.apiUrl + res.url;
        this.fjtp = res[0].url;
        this.fileList = [];
      },
      afterRead (file) {
        file.status = 'uploading';
        file.message = '上传中...';
        let params = new FormData();
        params.append("file", file.file);
        params.append("path", "xy")

        let cg = {
          headers: {
            //添加请求头
            "Content-Type": "multipart/form-data",
          },
        };
        axios
          .post(this.url, params,cg)
          .then((res) => {
            console.log("tpres",res)
            this.tpList.push({name:res.data[0].name,url:res.data[0].url})
          }).catch(err => {
          this.$refs.upload.clearFiles()
          this.$message({
            message: '没有该权限，请联系管理员',
            type: 'warning'
          })

        });
      },
      //维护前照片上传前检查文件格式
      beforeRead (file) {
        const fileName = file.name; //取到文件名称，包含后缀名
        const m = fileName.match(/\.(\w+)(#|\?|$)/);  //返回后缀名的Array
        const fileType = m[0].toString().toLowerCase();  //拿到后缀名,例如：.jpg
        const validType = (this.img).includes(fileType); //判断是否为图片类型文件
        if (!validType) {
          this.$message.error('只能上传图片!');
          return false;
        }
        for(let i=0;i<this.tpList.length;i++){
          if(fileName == this.tpList[i].name){
            this.$message.error('该图片已存在，请重新选择！');
            return false;
          }
        }
        const isLt2M = file.size / 1024 / 1024 < 20
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 20MB!');
          return false;
        }
        return true;
      },
      handleRemove(file, fileList) {
        //自定义删除的方法
        for(let i=0;i<this.tpList.length;i++){
          if(this.tpList[i].name == file.name){
            this.tpList.splice(i,1);//删除图片地址
          }
        }
      },
      handlePreview(file) {
        this.previewVisible = true;
        this.previewPath = file.url;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return true;
      },
      //删除
      deleteDi (row) {
        let cs = {
          pid: row.pid,
        };
        this.$confirm("是否删除该条认领信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            delsp(cs).then((res) => {
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
          pid: row.pid,
        };
        spById(sc).then((res) => {
          console.log("detail res", res)
          this.form=res.data.outmap.map
          this.form.url=this.fileShowUrl+this.form.url
          this.detailVisible = true;
        });
      },
      clearForm () {
        this.$refs.upload.clearFiles();
      },
      //打开编辑页面
      update (row) {
        console.log("row",row)
        this.fileList = []
        this.tpList = []
        this.$refs.upload && this.clearForm()
        this.type = 2;
        this.title = "编辑商品";
        // this.form.url='';
        let sc = {
          pid: row.pid,
        };
        spById(sc).then((res) => {
          console.log("detail res",res)
          this.form=res.data.outmap.map
          this.form.url=this.fileShowUrl+this.form.url
          if(this.form.url!=='' &&this.form.url!==null){
          this.fileList.push({name:this.form.spname,url:this.form.url})
          this.tpList.push({name:this.form.spname,url:this.form.url})}
          else {
            this.tpList=[]
          }
          this.adddialog = true;
        });
      },
      //点击编辑页面的修改按钮
      onUpdate (formName) {
        if(this.tpList.length !=0){
          this.form.url=this.tpList[0].url }
        else {
          this.form.url= '';
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm("是否审核?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                updsp(this.form).then((res) => {
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
      //关闭详情和新增弹窗
      closeWindow02 () {
      this.adddialog=false;
        this.detailVisible = false;
      },
      onSubmit (formName) {
        this.form.operatorid=localStorage.getItem("pid");
        console.log("this.tplist",this.tpList)
        if(this.tpList.length !=0){
          this.form.url=this.tpList[0].url }
        else {
          this.form.url= '';
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm("是否新增心愿?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                addsp(this.form).then((res) => {
                  if (res.status == "success") {
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
                this.adddialog=false;
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
      //新增商品
      addsp(){
        this.adddialog=true
        this.type=1
        this.form={}
      },
      //搜索
      search () {
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
        splist(this.params).then((res) => {
          console.log("splist",res)
          if (res.status == "success") {
            this.tableData = res.data.outmap.list;
            for (let i = 0; i <this.tableData.length ; i++) {
              this.tableData[i].url=config.apiUrl+this.tableData[i].url

            }
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
