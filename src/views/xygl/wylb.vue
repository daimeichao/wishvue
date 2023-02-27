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
                      许愿人姓名:
                    </div>
                    <div>
                      <el-input v-model="params.wishusername" placeholder="输入许愿人姓名" show-word-limit
                                style="width: 12vw; height: 1vh; margin-left: 0.5vw"></el-input>
                    </div>
                    <div style="font-size: 0.85vw; margin-left: 0.5vw">认领人人姓名:</div>
                    <div>
                      <el-input v-model="params.claimant" placeholder="输入认领人人姓名" show-word-limit
                                style="width: 12vw; height: 1vh; margin-left: 0.5vw"></el-input>
                    </div>
                    <div style="font-size: 0.85vw; margin-left: 0.5vw">审核状态:</div>
                    <div  >  <el-select size="mini" v-model="params.claimant_audit_state"  placeholder="请选择状态" clearable style="width: 12vw; height: 1vh; margin-left: 0.5vw">
                      <el-option  v-for="item in claimant_state_options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select></div>
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
      <div style="  background: rgb(255, 255, 255);
    margin-top: 0.7vw;
    margin-left: 0vw;
    width: 97.8%;
    margin-left: 1vw;
    padding-top: 1vw; ">
        <template>
    <el-table :data="tableData" style="width: 100%; margin-top: 10px" v-loading="loading"  stripe row-key="tid" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column
        label="序号"
        type="index"
        width="50px"
        align="center">
      </el-table-column>
      <el-table-column prop="claimant" label="认领人姓名" width="120px"> </el-table-column>
      <el-table-column prop="expressage" label="快递单号" width="100px"> </el-table-column>
      <el-table-column prop="realize_time" label="实现时间"> </el-table-column>
      <el-table-column prop="claimant_audit_state" label="认领审核状态" width="90px">
        <template slot-scope="scope">
                      <span v-if="scope.row.claimant_audit_state == '0'">待审核</span>
                      <span v-if="scope.row.claimant_audit_state == '1'">审核通过</span>
          <span v-if="scope.row.claimant_audit_state == '2'">审核不通过</span>
                    </template>
        </el-table-column>
      <el-table-column prop="wishusername" label="许愿人姓名" width="100px"> </el-table-column>
      <el-table-column prop="adder" label="许愿地点" width="120px">
      </el-table-column>
      <el-table-column prop="wish_time" label="许愿时间"> </el-table-column>
      <el-table-column label="操作" min-width="350">
        <template slot-scope="scope">
          <el-button size="mini"  type="primary" @click.native="detail(scope.row)">查看</el-button>
     <el-button size="mini" style="background-color: #63B184;color: #FFFFFF"v-if="scope.row.claimant_audit_state!=='2'" @click="upd(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click.native="deleteDi(scope.row)">删除</el-button>

  </template>
      </el-table-column>
    </el-table>
    <!--    </section>-->
    <!--分页-->
    <div class="blockPage">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.curpage" :page-sizes="[10, 30, 60, 100]" :page-size="params.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
</template>
</div>
</el-row>

    <!--修 <div class="dialog_out">改排序-->
    <div class="dialog_out">
      <el-dialog :title="title" :visible.sync="dialogVisible1" :before-close="closeWindow3" :modal-append-to-body="false">
        <el-form ref="roleData1" :model="form1" :rules="rules" label-width="120px">
          <el-form-item label="排序:" prop="sort">
            <el-input v-model="form1.sort" placeholder="请输入1~9位正整数" maxlength="9" onkeyup="this.value=this.value.replace(/[^\d]/g,'');" clearable style="width: 50%">
            </el-input>
          </el-form-item></el-form>
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
            " @click="closeWindow3()">
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
            " @click="onSort('roleData1')" v-if="type == 2">
      <div style="">提交</div>
    </button></span>
       </div>
        <div style="height: 0px; clear: both"></div>
      </el-dialog></div>
<!--    完愿列表修改认领人信息-->
    <div class="dialog_out">
    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="closeWindow" :modal-append-to-body="false">
      <el-form ref="roleData" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="许愿人姓名:" prop="wishusername">
          <el-input v-model="form.wishusername" placeholder="请输入" clearable style="width: 50%">
          </el-input>
        </el-form-item>
        <el-form-item label="许愿内容:" prop="wish_content">
          <el-input v-model="form.wish_content" placeholder="请输入" clearable style="width: 50%">
          </el-input>
        </el-form-item>
        <el-form-item label="许愿人地址:" prop="wishusername">
          <el-input v-model="form.adder" placeholder="请输入" clearable style="width: 50%">
          </el-input>
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入1~9位正整数"  maxlength="9" onkeyup="this.value=this.value.replace(/[^\d]/g,'');" clearable style="width: 50%">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" style="text-align: right">
        <span slot="footer" class="dialog-footer" style="text-align: right ; ">
    <button style="
    margin-left: 80%;
     margin-bottom: 50px;
              width: 4vw;
              height: 2vw;
              border: 1px solid #a7a8aa;
              background-color: #a7a8aa;
              color: #ffffff;
              border-radius: 0.3vw;
              font-size: 0.85vw;
            "@click="closeWindow()">
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
            "  @click="onUpdate('roleData')" v-if="type == 2">
      <div style="">提交</div>
          </button></span></div>
      <div style="height: 0px; clear: both"></div>
    </el-dialog></div>
    <!-- 新增S 或 修改 -->
<!--  &#45;&#45;实现表单&ndash;&gt;-->
  <div class="dialog_out">
    <el-dialog :title="title" :visible.sync="sxVisible" :before-close="closeWindow02" :modal-append-to-body="false">
      <el-form :model="form" :rules="rules" label-width="150px" :label-position="labelPosition" ref="roleData1">
        <el-form-item label="认领人姓名:" prop="claimant">
          <el-input v-model="form.claimant" placeholder="请输入" clearable style="width: 50%">
          </el-input>
        </el-form-item>
        <el-form-item label="快递单号:" prop="expressage">
          <el-input v-model="form.expressage" placeholder="请输入" clearable style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="实现时间:" prop="realize_time">
          <el-date-picker
            v-model=" form.realize_time"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width: 50%; height: 0.9vh; margin-left: 0vw">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="附件:" prop="FJDZ">
          <div >
            <el-upload class="avatar-uploader" style="display: inline-block;" ref="upload"  list-type="picture-card"
                       :action="fileUpload" :http-request="afterRead" multiple
                       :on-preview="handlePreview" :on-remove="handleRemove" :before-upload="beforeRead"
                       v-loading.fullscreen.lock="loading"  element-loading-text="上传中"
                       element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0,0.1)"
                       :before-remove="beforeRemove"  :on-exceed="handleExceed" :limit="10"
                       :file-list="fileList" >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div> 
          <div>
          </div></el-form-item>
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
            "@click="closeWindow02()">
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
            "  @click="onUpdate('roleData1')">
      <div style="">提交</div>
          </button></span></div>
      <div style="height: 0px; clear: both"></div>
      </el-dialog></div>
<!--    预览图片弹窗-->
    <el-dialog
      title="图片预览"
      :visible.sync="previewVisible"
      width="50%">
      <img :src="previewPath" class="previewImg" style="width: 100%;height: 70%"/>
    </el-dialog>

    <!-- 详情表单 -->
    <div class="dialog_out">
      <el-dialog :title="title" :visible.sync="detailVisible" :before-close="closeWindow02" :modal-append-to-body="false">
        <el-form :model="form" label-width="150px" :label-position="labelPosition" ref="ruleForm">
          <el-form-item label="许愿人姓名:" prop="wishusername">
            <span >{{ form.wishusername}}</span>
          </el-form-item>
          <el-form-item label="心愿时间:" prop="wish_time">
            <span >{{ form.wish_time }}</span>
          </el-form-item>
          <!--        <el-form-item label="许愿人id:" prop="wishuserid">-->
          <!--          <span >{{ form.wishuserid }}</span>-->
          <!--        </el-form-item>-->
          <el-form-item label="心愿内容:" prop="wish_content">
            <span >{{ form.wish_content }}</span>
          </el-form-item>
          <el-form-item label="心愿审核状态:" prop=" wish_audit_state" >
            <!--          <span >{{ form. wish_audit_state }}</span>-->
            <span  v-if=" form. wish_audit_state == '0'">待审核</span>
            <span  v-if="form. wish_audit_state == '1'">审核通过</span>
            <span  v-if="form. wish_audit_state == '2'">审核不通过</span>
          </el-form-item>
          <el-form-item label="心愿审核备注:" prop="wish_audit_remark" >
            <span >{{ form.wish_audit_remark?form.wish_audit_remark:'无'}}</span>
          </el-form-item>
          <el-form-item label="许愿人地址:" prop="adder">
            <span >{{ form.adder }}</span>
          </el-form-item>
          <el-form-item label="认领人姓名:" prop="claimant">
            <span >{{ form.claimant}}</span>
          </el-form-item>
          <el-form-item label="快递单号:" prop="expressage">
            <span >{{ form.expressage }}</span>
          </el-form-item>
          <el-form-item label="实现时间:" prop="realize_time">
            <span >{{ form.realize_time }}</span>
          </el-form-item>
          <el-form-item label="实现审核状态:" prop="claimant_audit_state" >
            <!--          <span style="font-size:18px">{{ form. wish_audit_state }}</span>-->
            <span  v-if=" form. claimant_audit_state == '0'">待审核</span>
            <span  v-if="form.claimant_audit_state == '1'">审核通过</span>
            <span  v-if="form.claimant_audit_state== '2'">审核不通过</span>
          </el-form-item>
          <el-form-item label="实现审核备注:" prop="claimant_audit_remark" >
            <span >{{ form.claimant_audit_remark?form.claimant_audit_remark:'无'}}</span>
          </el-form-item>
          <el-form-item label="排序:" prop="sort">
            <span >{{ form.sort }}</span>
          </el-form-item>
          <!--        -->
          <el-form-item label="附件:" prop="url">
            <el-image v-for="(item,index) in urlList" :key="index"
                      @click="openImg(item.url)" :preview-src-list="srcList" fit="contain" style="width: 100px; height: 100px" :src="item.url">
            </el-image>
            <span v-if="urlList.length==0">无</span>
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
        <div style="height: 0px; clear: both"></div>
      </el-dialog></div>
  </div>
</template>

<script>
  import {
    updatesort,
    updateWish,
    deleteWish,
    getListById,
    getsxSHList,
    getSXById, deleteSX
  } from "../../api/xygl/xyglAx";
  import config from '../../../config/config.js';
  import axios from 'axios';
  import {updateUser} from "../../api/userApi/jsglAx";
  export default {
    data() {
      return {
        //控制图片预览窗口的显示与隐藏
        previewVisible:false,
        //图片地址
        previewPath:'',
        urlList:[],
        img: '.jpg, .jpeg, .png, .gif',
        minheight: "",
        fjtp: "",
        IMG: "",
        fileShowUrl: config.apiUrl,
        fileUpload: config.apiUrl + "/upload/fileupload",
        url: config.apiUrl + "/upload/fileupload",
        fileList: [],
        Input: "",
        ruleForm: [{file: ''}],
        upload_file: {},
        treeLoading: true,
        //编辑认领人信息弹窗
        sxVisible:false,
        dialogUploadVisable: false,
        title: "",
        type: 1,
        labelPosition: "right",
        form1: {
          id: "",
          tid: "",
          sort: "",
        },
        form: {
          id: "",
          tid: "",
          wishusername: "",
          wishuserid: "",
          wish_content: "",
          adder: "",
          wish_time: "",
          wish_audit_state: "",
          wish_audit_remark: "",
          wish_auditid: "",
          wish_state: "",
          operatorid: "",
          fbat: "",
          fbut: "",
          sort: "",
          wishid: "",
          claimant: "",
          claimantid: "",
          realize_time: "",
          expressage: "",
          claimant_audit_state: "",
          sxat: "",
          sxut: "",
          price: "",
          url: []
        },
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
        claimant_state_options: [
          {
            value: "0",
            label: "认领待审核",
          },
          {
            value: "1",
            label: "认领审核通过",
          },
          {
            value: "2",
            label: "认领审核不通过",
          }
        ],
        isOpenSendBack: true,
        dialogVisible: false,
        dialogVisible1: false,
        detailVisible: false,
        loading: false,
        tableData: [],
        params: {
          id: "",
          wish_audit_state: "",
          wishusername: "",
          claimant: "",
          wish_state: "",
          claimant_audit_state: "",
          curpage: 1,
          pagesize: 10,
        },
        total: 0,
        rules: {
          adder: [
            {required: true, message: "请输入地址", trigger: "blur"},
          ],
          wishusername: [
            {required: true, message: "请输入许愿人姓名", trigger: "blur"},
          ],
          wish_content: [
            {required: true, message: "请输入许愿内容", trigger: "blur"},
          ],
          wish_time: [
            { required: true, message: "请选择许愿时间", trigger: "blur" },
          ],
          claimant:[
            {required: true, message: "请输入认领人姓名", trigger: "blur"},
          ],
          realize_time:[
            {required: true, message: "请选择实现时间", trigger: "blur"},
          ],
          sort: [
            {
              required: true, message: "请输入排序", trigger: "blur"
            },]

        },
        srcList: []
      };
    },
    methods: {
      //放大图片的方法
      openImg(url) {
        this.srcList = []
        this.srcList.push(url)
      },
      //是否大金额
      changePriceFunc(row) {
        row.price = row.ifprice ? "1" : "0"
        updateWish({
          id: row.id,
          price: row.price,
          ifdje: '1',
        }).then((res) => {
          if (res.errorCode === 0) {

            // this.handleCurrentChange(this.params.curpage)
          } else {
            this.$message({
              showClose: true,
              message: res.data.result,
              type: "error",
            });
          }
        });
      },
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
            // this.$message.error("请上传宽度大于高度的图标!");
            // return Promise.reject();
          }
        );
        return isJPG && isLt2M && isSize;
      },
      handleAvatarSuccess(res, file, fileList) {
        // 原图
        this.IMG = config.apiUrl + res[0].url;
        this.fjtp = res[0].url;
        this.fileList = [];
      },
      afterRead(file) {
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
          .post(this.url, params, cg)
          .then((res) => {
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
      beforeRead(file) {
        const fileName = file.name; //取到文件名称，包含后缀名
        const m = fileName.match(/\.(\w+)(#|\?|$)/);  //返回后缀名的Array
        const fileType = m[0].toString().toLowerCase();  //拿到后缀名,例如：.jpg
        const validType = (this.img).includes(fileType); //判断是否为图片类型文件
        if (!validType) {
          this.$message.error('只能上传图片!');
          return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 20
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 20MB!');
          return false;
        }
        for(let i=0;i<this.tpList.length;i++){
          if(fileName == this.tpList[i].name){
            this.$message.error('该文件已存在，请重新选择！');
            return false;
          }}
        return true;
      },
      handleRemove(file, fileList) {
        this.form.tuname = '';
        this.form.tuurl = '';
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
        console.log(row,"row")
        let cs = {
          pid: row.tid,
          id:row.id,
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
        console.log("详情row",row)
        this.urlList=[];
        this.title = "详情";
        let sc = {
          id: row.tid,
          tid:row.tid,
          wishid:row.tid
        };
        getSXById(sc).then((res) => {
          this.form=res.map;
          console.log("res",res)
          this.urlList=res.urlList
          if(this.urlList.length!=0){
            for (let i = 0; i <this.urlList.length ; i++) {
              this.urlList[i].url=config.apiUrl+this.urlList[i].url
              // this.urlList[i].url=this.urlList[i].url
            }}
          this.detailVisible = true;
        });
      },
      //排序
      sort(row) {

        this.$refs.upload && this.clearForm()
        this.type = 2;
        this.title = "修改排序";
        let sc = {
          id: row.id,
        };
        getListById(sc).then((res) => {
          this.form1 = res.data.outmap[0];
          this.dialogVisible1 = true;
        });
      },
      //点击编辑排序弹窗
      onSort(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm("是否修改排序?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                updatesort(this.form1).then((res) => {
                  if (res.status == "success") {
                    this.$refs.upload && this.clearForm()
                    this.$message({
                      type: "success",
                      message: "修改成功!",
                    });
                    this.dialogVisible1 = false;
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
      //打开修改认领人信息页面
      upd(row) {
        this.$refs.upload && this.clearForm()
        this.type = 2;
        this.fileList = []
        this.tpList = []
        this.title = "编辑认领信息";
        console.log("row",row)
        let sc = {
          id: row.id,
          tid:row.tid,
          wishid:row.tid,
        };
        console.log("sc",sc)
        getListById(sc).then((res) => {
          this.form = res.map;
          this.tpList=res.urlList
          console.log("res",res)
          if(this.tpList.length!=0){
            for (let i = 0; i <this.tpList.length ; i++) {
              this.fileList.push({name:this.tpList[i].name,url:config.apiUrl+this.tpList[i].url})
            }
          }else{
            this.tpList=[]
          }
          this.sxVisible = true;
        });
      },

      clearForm() {
        this.$refs.upload.clearFiles();
      },
      //点击编辑页面的修改按钮
      onUpdate(formName) {
        this.$refs[formName].validate((valid) => {
          this.form.url= this.tpList;
          if (valid) {
            this.$confirm("是否修改认领信息?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                updateWish(this.form).then((res) => {
                  if (res.status == "success") {
                    this.$refs.upload && this.clearForm()
                    this.$message({
                      type: "success",
                      message: "修改成功!",
                    });
                    this.sxVisible = false;
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
      add() {
        this.type = 1;
        this.title = "添加心愿";
        this.form.wishusername = "";
        this.form.wishuserid = "";
        this.form.wish_content = "";
        this.form.adder = "";
        this.form.wish_time = "";
        this.dialogVisible = true;
      },
      //关闭新增框或编辑框
      closeWindow() {
        this.$nextTick(() => {
          let af = this.$refs['roleData']
          if (af) {
            af.clearValidate()
          }
        });
        this.dialogVisible = false;
      },
      closeWindow3() {
        this.$nextTick(() => {
          let af = this.$refs['roleData1']
          if (af) {
            af.clearValidate()
          }
        });
        this.dialogVisible1 = false;
      },
      closeWindow02() {
        // this.$nextTick(() => {
        //   this.$refs['formName'].resetFields();
        // });
        this.detailVisible = false;
        this.sxVisible=false
      },
      onSubmit(formName) {
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
                    this.getwylb();
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
      search() {
        this.params.wish_audit_state = '';
        if (this.params.o_type != '' || this.params.company_id != '') {
          this.params.curpage = 1
        }
        if (this.params.claimant_audit_state == '3') {
          this.params.wish_audit_state = '0'

        } else if (this.params.claimant_audit_state == '4') {
          this.params.wish_audit_state = '1'

        } else if (this.params.claimant_audit_state == '5') {
          this.params.wish_audit_state = '2'
        }
        this.getwylb();
      },
      //重置
      reset() {
        this.params.wishusername = "";
        this.params.claimant = "";
        this.params.curpage = 1;
        this.params.pagesize = 10;
        this.params.wish_audit_state = "";
        this.params.claimant_audit_state = "";
        this.getwylb();
      },
      //获取列表
      getwylb() {
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
      handleSizeChange(val) {
        this.loading = true;
        this.params.pagesize = val;
        this.getwylb();
      },
      // 跳页
      handleCurrentChange(val) {
        this.loading = true;
        this.params.curpage = val;
        this.getwylb();
      },


    },
    //初始渲染
    created() {
      this.getwylb();
    },
  }
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

  /deep/ .el-textarea__inner {
    background-color: #f1f1f1;
    resize: none;
    color: black;
  }

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
</style>
