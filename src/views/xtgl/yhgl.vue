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
                    <div style="font-size: 0.85vw; height: 1vh; ">
                      账号名称:
                    </div>
                    <div>
                      <el-input v-model="listQuery.account" placeholder="请输入账号名称" show-word-limit
                        style="width: 12vw; height: 1vh; margin-left: 0.5vw"></el-input>
                    </div>
                    <div style="font-size: 0.85vw; height: 1vh; margin-left: 0.5vw">姓名:</div>
                    <div>
                      <el-input v-model="listQuery.name" placeholder="请输入姓名" show-word-limit
                        style="width: 12vw; height: 1vh; margin-left: 0.5vw"></el-input>
                    </div>
                  </el-col>
                </div>

                <div class="disFlexCenter" style="margin-top: 5px">
                  <el-button style="background-color: #FFC0CB;color: #FFFFFF"  icon="el-icon-search" @click="handleFilter">搜索</el-button>
                  <el-button style="background-color: #63B184;color: #FFFFFF" icon="el-icon-refresh-right" @click="handleReset">重置</el-button>
                  <button style="background-color: rgb(50, 161, 247)" @click="ins">
                    新增工作人员
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

    <!-- 用户信息表 -->
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
          <el-table ref="listdata" stripe v-loading="loading" element-loading-text="加载中"
            element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255)" border
            :key="tableKey" :data="jslist" style="width: 97.6%">
            <!-- this.listQuery.pagesize = val;
      this.listQuery.curpage = 1; -->
            <el-table-column label="序号" width="50px" align="center">
              <template slot-scope="scope">
                {{ scope.$index + (listQuery.curpage - 1) * listQuery.pagesize + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="account" label="账号名称" min-width="100">
            </el-table-column>
            <el-table-column prop="name" label="姓名" min-width="100">
            </el-table-column>
            <!-- <el-table-column prop="nick" label="微信昵称" min-width="100">
            </el-table-column>
            <el-table-column label="头像" min-width="130">
              <template slot-scope="scope">
                <el-image :src="fileShowUrl + scope.row.portrait" style="width: 10vw" :previewSrcList="srcFmtList"
                  v-if="scope.row.portrait != '' && scope.row.portrait != null && scope.row.portrait != undefined" />
              </template>
            </el-table-column> -->
            <el-table-column prop="phone" label="联系方式" min-width="100">
            </el-table-column>
            <el-table-column prop="ifjyzk" label="是否禁用" min-width="70" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.ifjyzk" @change="changeJyzkFunc(scope.row.pid, scope.row.ifjyzk)">
                </el-switch>
              </template>
            </el-table-column>

            <el-table-column label="操作" min-width="350">
              <template slot-scope="scope">
                <btn :flag="1" @click.native="editUser(scope.row.pid)"></btn>
                <btn :flag="2" @click.native="del(scope.row)"></btn>
                <btn :flag="999" @click.native="czmm(scope.row)"></btn>
                <btn :flag="1002" @click.native="authorizeFunc(scope.row)"></btn>
                <!-- <btn :flag="1001" @click.native="changeTypeFunc(scope.row.pid, '0', '普通用户')"
                  v-if="scope.row.lb === '1'"></btn> -->
              </template>
            </el-table-column>
          </el-table>

          <div class="blockPage">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page.sync="listQuery.curpage" :page-size="listQuery.pagesize" background
              layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </template>
      </div>

      <!-- </el-col>

      <el-col :span="1">
        <div style="height: 8.7vw;"></div>
      </el-col> -->
    </el-row>

    <!-- 弹框 -->
    <div class="dialog_out">
      <!-- 新增/修改用户 -->
      <el-dialog :visible.sync="dialogVisible1" width="60%" :before-close="handleClose" top="5vh">
        <template slot="title">
          <div style="
              float: left;
              width: 0.5vw;
              height: 0.5vw;
              border-radius: 1vw;
              background: #0061ac;
              margin-top: 0.8vh;
            "></div>
          <div style="
              float: left;
              width: 95%;
              height: 75%;
              font-size: 1vw;
              margin-left: 0.5vw;
              color: #656768;
              font-weight: 600;
              font-family: MicrosoftYaHei-Bold;
            ">
            {{ jstitle }}
          </div>
        </template>

        <div>
          <div class="jsshu" style="font-size: 0.9vw; margin: 0 auto; width: 70%">
            <el-form ref="form" :model="form" label-width="120px" label-position="right">
              <el-form-item label="账号名称" :required="true">
                <el-input v-model="form.account" maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="姓名" :required="true">
                <el-input v-model="form.name" maxlength="200"></el-input>
              </el-form-item>
              <el-form-item label="密码" v-if="form.lb === '1' && type == 'ins'" :required="true">
                <el-input v-model="form.password" clearable show-word-limit show-password type="password"
                  maxlength="200">
                </el-input>
              </el-form-item>
              <!-- <el-form-item label="微信昵称">
                <el-input v-model="form.nick" maxlength="200"></el-input>
              </el-form-item>
              <el-form-item label="头像">
                <el-upload class="upload-demo" ref="upload" :action="url" :http-request="afterRead"
                  :before-upload="beforeRead" :on-preview="handlePreview" :on-remove="handleRemove"
                  :before-remove="beforeRemove" :show-file-list="false" :limit="99" :on-exceed="handleExceed"
                  :file-list="fileList" :on-success="handleAvatarSuccess" :data="{ path: 'yhtx' }">
                  <img v-if="tpdz != '' && tpdz != undefined" :src="tpdz" style="height: auto; width: 150px" />
                  <img v-if="tpdz == '' || tpdz == undefined" src="../../imges/sc.png"
                    style="height: 90px; width: 150px" />
                </el-upload>
              </el-form-item> -->
              <el-form-item label="联系方式">
                <el-input v-model="form.phone" maxlength="200"></el-input>
              </el-form-item>
              <el-form-item label="是否禁用">
                <el-switch v-model="jyztFlag"></el-switch>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div style="height: 3vw; clear: both"></div>
        <div style="width: 12vw; float: right">
          <button style="
              width: 4vw;
              height: 2vw;
              border: 1px solid #a7a8aa;
              background-color: #a7a8aa;
              color: #ffffff;
              border-radius: 0.3vw;
              font-size: 0.85vw;
            " @click="handleClose">
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
            " @click="submitForm">
            <div style="">确定</div>
          </button>
        </div>
        <div style="height: 3vw; clear: both"></div>
      </el-dialog>

      <!-- 修改密码 -->
      <el-dialog :visible.sync="dialogVisible2" width="60%" :before-close="handleClose" top="25vh" title="重置密码">
        <div class="jsshu" style="
            font-size: 0.9vw;
            margin: 3vw auto 6vw;
            width: 70%;
            height: 5vw;
          ">
          <el-form ref="form" label-width="120px" label-position="right">
            <el-form-item label="新的密码" :required="true">
              <el-input v-model="new_password" clearable show-password type="password" maxlength="200"></el-input>
            </el-form-item>
          </el-form>

          <!-- <span slot="footer" class="dialog-footer" > -->
          <div style="float: right; margin-top: 3vw">
            <button style="
                width: 4vw;
                height: 2vw;
                border: 1px solid #a7a8aa;
                background-color: #a7a8aa;
                color: #ffffff;
                border-radius: 0.3vw;
                font-size: 0.85vw;
                float: right;
              " @click="handleClose">
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
                float: right;
              " @click="updatePasswordFunc">
              <div style="">确定</div>
            </button>
          </div>
          <!-- </span> -->
          <div style="height: 5vw; clear: both"></div>
        </div>
      </el-dialog>

      <!-- 授权 -->
      <el-dialog :visible.sync="auth_show" width="60%" :before-close="handleClose" top="25vh" title="用户授权">
        <div class="jsshu" style="
            font-size: 0.9vw;
            margin: 3vw auto 6vw;
            width: 70%;
            height: 5vw;
          ">
          <el-form ref="form" label-width="120px" label-position="right">
            <el-form-item label="角色">
              <el-select v-model="selected_jsid" placeholder="请选择角色" style="width: 80%" multiple>
                <!-- <el-option label="普通用户" value="0"></el-option>
                  <el-option label="工作人员" value="1"></el-option> -->
                <el-option v-for="(v, i) in roleList" :key="i" :label="v.JSMC" :value="v.XLH"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <!-- <span slot="footer" class="dialog-footer" > -->
          <div style="float: right; margin-top: 3vw">
            <button style="
                width: 4vw;
                height: 2vw;
                border: 1px solid #a7a8aa;
                background-color: #a7a8aa;
                color: #ffffff;
                border-radius: 0.3vw;
                font-size: 0.85vw;
                float: right;
              " @click="handleClose">
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
                float: right;
              " @click="grantAuthorizeFunc">
              <div style="">确定</div>
            </button>
          </div>
          <!-- </span> -->
          <div style="height: 5vw; clear: both"></div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getTree,
  addUser,
  getUserById,
  updateUser,
  deteleUser,
  getUserList,
  updatePassword,
  changeType,
  grantAuthorize,
  getUserRoleList,
} from "../../api/userApi/jsglAx";
import { getJSlist } from "../../api/kcglApi/jsglAx";

import axios from "axios";
import config from "../../../config/config";

export default {
  data() {
    return {
      url: config.apiUrl + "/upload/fileupload",
      fileShowUrl: config.apiUrl,
      fileUpload: config.apiUrl + "/upload/fileupload",
      tpdz: "",
      srcFmtList: [],
      fileList: [],

      yhType: "2",
      new_password: "",
      loading: true,
      minheight: "",
      showStatus: false,
      hideStatus: true,
      tableKey: 0,
      rules: {
      },
      listLoading: false,
      /*列表end*/

      /*分页start*/
      total: null,
      listQuery: {
        curpage: 1,
        pagesize: 10,
        type: "2",
        account: "",
        name: "",
      },
      jslist: [], //工作人员列表
      JSID: "", //工作人员id
      xm: "", //工作人员名称

      defaultProps: {
        children: "children",
        label: "label",
      },
      zjdata1: [],
      checkList: [], // 选中的资源
      dialogVisible1: false, //资源转移的弹窗
      dialogVisible2: false, //资源转移的弹窗
      PLFJID: "",
      PLFJLX: "0",

      type: "ins",

      cdArr: [],
      cdArr1: [],
      arr: [],
      lsshow: false,
      jstitle: "新增工作人员",

      form: {},
      jyztFlag: false,

      clickpid: "",
      auth_show: false,
      clickyhmc: "",

      roleList: [],
      userRoleList: [],
      selected_jsid: "",
    };
  },
  components: {},
  created() {
    this.getHeight(10);
    this.handleFilter();
    //this.getHeight();
    this.getMenuList();
    this.getJSlistFunc();
  },
  methods: {
    jyFormatter(row, column) {
      let a = row.jyzk === "1" ? "是" : "否";
      return a;
    },
    lbFormatter(row, column) {
      let a = row.lb === "1" ? "工作人员" : "普通用户";
      return a;
    },
    getHeight(x) {
      this.minheight = window.innerHeight - 63 + "px";
    },
    //显示搜索框
    showClick() {
      this.showStatus = false;
      this.hideStatus = true;
      this.tableHeight = window.innerHeight - 250;
    },
    //隐藏搜索框
    hideClick() {
      this.showStatus = true;
      this.hideStatus = false;
      this.tableHeight = window.innerHeight - 193;
    },
    // //表格自适应高
    // getHeight() {
    //   this.height = window.innerHeight - 350 + "px";
    //   this.tableHeight = window.innerHeight - 300;
    //   // this.divheight = window.innerHeight - 165 + 'px'
    // },
    //消息提示  1成功 0 警告
    msg(type, title) {
      let t = ""; //默认消息
      if (type == 1) {
        t = "success";
        if (title == null || title == undefined) {
          title = "操作成功！";
        }
        // title = "操作成功！";
      } else if (type == 0) {
        t = "warning";
        if (title == null || title == undefined) {
          title = "操作失败！";
        }
        // title = "操作失败！";
      }
      this.$message({
        message: title,
        type: t,
        duration: 1500,
      });
    },

    //获取列表
    getList() {
      this.loading = true;
      this.listQuery.type = "2";
      getUserList(this.listQuery).then((res) => {
        this.total = res.data.outmap.count;
        for (let i = 0; i < res.data.outmap.list.length; i++) {
          if (res.data.outmap.list[i].jyzk == "1") {
            res.data.outmap.list[i].ifjyzk = true;
          } else {
            res.data.outmap.list[i].ifjyzk = false;
          }
        }
        this.jslist = res.data.outmap.list;
        this.loading = false;
      });
    },

    //获取菜单列表
    getMenuList() {
      getTree({ JSID: this.JSID }).then((res) => {
        this.zjdata1 = res.data.outmap.list;
      });
    },
    //新增按钮
    ins() {
      this.jstitle = "新增工作人员";
      this.form = {
        lb: "1",
      };
      this.type = "ins";
      this.dialogVisible1 = true;
      // this.resetChecked();
    },
    objIsEmpty(obj) {
      return obj === undefined || obj === null || obj === "";
    },
    // 判断密码是否符合要求
    // 密码至少8位、包含数字、大小写字母、特殊字符。"^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$"
    mmIsEmpty(mm) {
      var mmyq = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.]{8,}/;
      return mmyq.test(mm)
    },
    // 重置密码
    updatePasswordFunc() {

      if (this.objIsEmpty(this.new_password)) {
        this.msg(0, "请设置密码!");
        return false;
      }
      if (!this.mmIsEmpty(this.new_password)) {
        this.msg(0, "密码至少8位、包含数字、大小写字母、特殊字符!");
        return false;
      }
      this.$confirm("确认重置密码吗？")
        .then((_) => {
          updatePassword({
            password: this.new_password,
            pid: this.clickpid,
          }).then((res) => {
            if (res.errorCode === 0) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success",
              });
              this.new_password = "";
              this.dialogVisible2 = false;
              // this.resetChecked();
              //刷新页面
              this.handleFilter();
            } else {
              this.$message({
                showClose: true,
                message: res.data.result,
                type: "error",
              });
            }
          });
        })
        .catch(() => { });
    },
    addUser() {
      if (this.objIsEmpty(this.form.account)) {
        this.msg(0, "账号名称不能为空！");
        return false;
      }
      if (this.objIsEmpty(this.form.name)) {
        this.msg(0, "姓名不能为空！");
        return false;
      }
      if (this.objIsEmpty(this.form.password)) {
        this.msg(0, "密码不能为空！");
        return false;
      }
      if (!this.mmIsEmpty(this.form.password)) {
        this.msg(0, "密码至少8位、包含数字、大小写字母、特殊字符!");
        return false;
      }
      if (!this.objIsEmpty(this.form.phone)) {
        if (!this.sendPhone(this.form.phone)) {
          this.msg(0, "联系方式格式不正确！");
          return false;
        }
      }
      // if (!this.sendPhone(this.form.phone)) {
      //   this.msg(0, "联系方式格式不正确！");
      //   return false;
      // }
      // if (!this.objIsEmpty(this.form.email)) {
      //   var regEmail =
      //     /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      //   if (!regEmail.test(this.form.email)) {
      //     this.msg(0, "邮箱格式不正确!");
      //     return false;
      //   }
      // }
      // if (this.form.lb === "1" && this.objIsEmpty(this.form.mm)) {
      //   this.msg(0, "密码不能为空!");
      //   return false;
      // }
      // if (!this.sendEmail(this.form.email)) {
      //   this.msg(0, "邮箱格式不正确！");
      //   return false;
      // }
      this.form.jyzk = this.jyztFlag ? "1" : "0";
      this.form.type = "2"
      this.$confirm("确认新增吗？")
        .then((_) => {
          // updateUser()
          addUser(this.form).then((res) => {
            if (res.errorCode === 0) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success",
              });
              this.dialogVisible1 = false;
              // this.resetChecked();
              //刷新页面
              this.handleFilter();
            } else {
              this.$message({
                showClose: true,
                message: res.data.result,
                type: "error",
              });
            }
          });
        })
        .catch((_) => { });
    },
    getJSlistFunc() {
      getJSlist({}).then((res) => {
        // this.total = res.data.outmap.count;
        this.roleList = res.data.outmap.list;
      });
    },
    authorizeFunc(row) {
      this.clickpid = row.pid;
      this.clickyhmc = row.account;
      getUserRoleList({
        pid: this.clickpid,
      }).then((res) => {
        // this.total = res.data.outmap.count;
        for (let index = 0; index < res.data.data.length; index++) {
          res.data.data[index] = +res.data.data[index];
        }
        this.userRoleList = res.data.data;
        this.selected_jsid = res.data.data;
        this.auth_show = true;
      });
    },
    changeTypeFunc(pid, lb, tilte) {
      this.$confirm("确认设置为" + tilte + "？")
        .then((_) => {
          changeType({
            pid,
            lb,
          }).then((res) => {
            if (res.errorCode === 0) {
              this.$message({
                message: "设置成功",
                type: "success",
              });
              this.getList();
            } else {
              this.$message({
                message: "操作失败",
                type: "warning",
              });
            }
          });
        })
        .catch((_) => { });
    },
    //是否禁用
    changeJyzkFunc(pid, ifjyzk) {
      updateUser({
        pid,
        jyzk: ifjyzk ? "1" : "0",
      }).then((res) => {
        if (res.errorCode === 0) {
          // this.$message({
          //   showClose: true,
          //   message: "修改成功",
          //   type: "success",
          // });
        } else {
          this.$message({
            showClose: true,
            message: res.data.result,
            type: "error",
          });
        }
      });
      // .catch((_) => {

      //    this.$message({
      //       message: "发生异常,请稍后再试",
      //       type: "error",
      //     });
      // });
    },
    editUser(pid) {
      this.jstitle = "编辑工作人员";
      this.type = "upd";
      // this.JSID = pid;
      getUserById({ pid: pid }).then((res) => {
        this.form = res.data.data;
        this.jyztFlag = this.form.jyzk == "1" ? true : false;
      });
      this.dialogVisible1 = true;
    },
    updRole() {
      if (this.objIsEmpty(this.form.account)) {
        this.msg(0, "账号名称不能为空！");
        return false;
      }
      if (this.objIsEmpty(this.form.name)) {
        this.msg(0, "姓名不能为空！");
        return false;
      }
      if (!this.objIsEmpty(this.form.phone)) {
        if (!this.sendPhone(this.form.phone)) {
          this.msg(0, "联系方式格式不正确！");
          return false;
        }
      }
      this.form.type = "2"
      this.form.jyzk = this.jyztFlag ? "1" : "0";
      this.$confirm("确认修改吗？")
        .then((_) => {
          updateUser(this.form).then((res) => {
            if (res.errorCode === 0) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success",
              });
              this.dialogVisible1 = false;
              //刷新页面
              this.handleFilter();
            } else {
              this.$message({
                showClose: true,
                message: res.data.result,
                type: "error",
              });
            }
          });
        })
        .catch((_) => { });
    },
    sendEmail: function () {
      var regEmail =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!this.objIsEmpty(this.form.email) && regEmail.test(this.form.email)) {
        return true;
      }
      return false;
    },
    sendPhone: function () {
      var that = this;
      // var regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;     //带区号校验
      var regPhone =
        /^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/; //不带区号校验
      if (!this.objIsEmpty(this.form.phone) && regPhone.test(this.form.phone)) {
        return true;
        // this.msg("联系方式格式不正确",0);
      }
      return false;
    },
    //新增或者修改操作
    submitForm() {
      if (this.type == "ins") {
        this.addUser();
      } else {
        this.updRole();
      }
    },
    del(row) {
      this.$confirm("确认删除该用户吗？")
        .then((_) => {
          deteleUser({ pid: row.pid }).then((res) => {
            if (res.errorCode === 0) {
              this.$message({
                // showClose: true,
                message: "删除成功",
                type: "success",
              });

              this.dialogVisible1 = false;
              // this.resetChecked();
              //刷新页面
              this.handleFilter();
            } else {
              this.$message({
                // showClose: true,
                message: res.data.result,
                type: "error",
              });
            }
          });
        })
        .catch((_) => { });
    },
    //搜索
    handleFilter() {
      this.loading = true;
      this.listQuery.curpage = 1;
      this.listQuery.pagesize = 10;
      this.getList();
    },

    //重置
    handleReset() {
      this.listQuery.type = "2";
      this.listQuery.account = "";
      this.listQuery.name = "";
      this.listQuery.curpage = 1;
      this.listQuery.pagesize = 10;
      this.getList();
    },
    //分页
    handleSizeChange(val) {
      this.listQuery.pagesize = val;
      this.listQuery.curpage = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.curpage = val;
      this.getList();
    },

    //批量树形点击
    handleNodeClick1(data) {
      this.PLFJID = data.id;
      this.PLFJLX = data.type;
    },
    //弹窗关闭
    handleClose(done) {
      this.JSID = "";
      this.xm = "";
      this.form = {};
      this.cdArr = [];
      this.cdArr1 = [];
      this.new_password = "";
      this.selected_jsid = "";
      this.auth_show = false;
      this.dialogVisible2 = false;
      this.dialogVisible1 = false;
    },
    grantAuthorizeFunc() {
      this.$confirm("确认授权？")
        .then((_) => {
          grantAuthorize({
            jsid: this.selected_jsid.join(","),
            yhid: this.clickpid,
            yhmc: this.clickyhmc,
          })
            .then((res) => {
              if (res.errorCode === 0) {
                this.$message({
                  // showClose: true,
                  message: "授权成功",
                  type: "success",
                });
                this.auth_show = false;
              } else {
                this.$message({
                  message: res.data.result,
                  type: "warning",
                });
              }
            })
            .catch(() => { });
        })
        .catch(() => { });
    },
    //获取选中的菜单
    getMenuKeys() {
      this.cdArr = this.$refs.tree.getCheckedNodes();
      this.cdArr1 = this.$refs.tree.getHalfCheckedNodes();
      if (this.cdArr1.length != 0) {
        for (let i = 0; i < this.cdArr1.length; i++) {
          this.cdArr.push(this.cdArr1[i]);
        }
      }
    },
    //小组详情
    czmm(row) {
      // this.lsshow = true;
      // this.xm = row.xm;
      // this.JSID = row.pid;
      // this.$nextTick(() => {
      //   this.$refs.lsjs.jsJSID(this.JSID);
      // });
      this.clickpid = row.pid;
      this.dialogVisible2 = true;
    },
    // 使用 before-upload 限制用户上传的图片格式和大小。
    // 上传前  检查文件格式（jpeg、png、gif）
    beforeRead(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      let that = this;
      let isAllow = false;
      if (!isJPG) {
        this.$message.error("上传图标只能是 jpg、png、gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图标大小不能超过 2MB!");
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
    // 覆盖默认的上传行为，可以自定义上传的实现
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      var params = new FormData();
      params.append("file", file.file); //var token = Cookies.get("token")
      params.append("path", "xtgl");
      let cg = {
        headers: {
          //添加请求头
          "Content-Type": "multipart/form-data",
        },
      };
      axios.post(this.url, params, cg).then((res) => {
        this.form.portrait = res.data[0].url;
        this.tpdz = config.apiUrl + res.data[0].url;
      });
    },

    // 文件列表移除文件时的钩子
    //删除文件之后触发，将传入后台的值设为‘’
    handleRemove(file, fileList) {
      this.tpdz = "";
      this.form.portrait = "";
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning("只能上传一张图片，请删除当前图片后再上传图片");
    },
    // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
    beforeRemove(file, fileList) {
      //  return this.$confirm(`确定移除 ${file.name}？`);
      return true;
    },
    // 文件上传成功时的钩子
    handleAvatarSuccess(res, file, fileList) {
      // 原图
      this.IMG = config.apiUrl + res[0].url;
      this.form.portrait = res[0].url;
      this.fileList = [];
      // 课程缩略图
      // this.KCSLT = config.fileShowUrl + res.data.fileName;
    },
  },
};
</script>
<style scoped>
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
}
</style>
