<!-- 重置密码 /jbgsgl/czmm -->
<template>
    <div v-bind:style="{
        //   minHeight: minheight,
        minHeight: '590px',
        backgroundColor: 'rgb(245,245,245)',
        top: '0',
        left: '0',
        position: 'relative',
        width: '100%',
    }">
        <div class="jsshu" style=" font-size: 0.9vw;
        width: 70%;
        height: 5vw;
        padding-top: 10%;
        padding-left: 20%;
        top: 30%; ">
            <el-form ref="form" label-width="120px" label-position="right">
                <el-form-item label="旧密码" required="true">
                    <el-input v-model="old_password" clearable show-password type="password" maxlength="200">
                    </el-input>
                </el-form-item>
                <el-form-item label="新密码" required="true">
                    <el-input v-model="new_password" clearable show-password type="password" maxlength="200">
                    </el-input>
                </el-form-item>
                <el-form-item label="请再次输入密码" required="true">
                    <el-input v-model="new_passwordB" clearable show-password type="password" maxlength="200">
                    </el-input>
                </el-form-item>
            </el-form>

            <!-- <span slot="footer" class="dialog-footer" > -->
            <div style="float: right; margin-top: 3vw">
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
    grantAuthorize, updateNowPassword,
    getUserRoleList,
} from "../../api/userApi/jsglAx";
import { getJSlist } from "../../api/kcglApi/jsglAx";
import config from "../../../config/config";

export default {
    data() {
        return {
            userpid: "",
            old_password: "",
            new_password: "",
            new_passwordB: "",
            loading: true,
            minheight: "",
            showStatus: false,
            hideStatus: true,
            tableKey: 0,
            rules: {
                //验证规则
                // xm: [
                //   {
                //     required: true,
                //     message: "请输入资源标签名称",
                //     trigger: "blur",
                //   },
                //   {
                //     min: 1,
                //     max: 8,
                //     message: "长度在 1 到 8个字符",
                //     trigger: "blur",
                //   },
                // ],
            },
            listLoading: false,
            /*列表end*/

            /*分页start*/
            total: null,
            listQuery: {
                curpage: 1,
                pagesize: 10,
                xm: "",
                phone: "",
                lb: "1",
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

        this.userpid = localStorage.getItem("No") == null ? "" : localStorage.getItem("No");
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

            this.xm = "";

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
            if (this.new_password != this.new_passwordB) {
                this.msg(0, "两次输入的密码不一致，请重新输入!");
                return false;
            }
            let cs = {
                new_password: this.new_password,
                old_password: this.old_password,
                pid: this.userpid,
            }
            this.$confirm("确认重置密码吗？")
                .then((_) => {
                    updateNowPassword({
                        new_password: this.new_password,
                        old_password: this.old_password,
                        pid: this.userpid,
                    }).then((res) => {
                        if (res.errorCode === 0) {
                            this.$message({
                                showClose: true,
                                message: "修改成功",
                                type: "success",
                            });
                            this.old_password = "";
                            this.new_password = "";
                            this.new_passwordB = "";
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
            if (this.objIsEmpty(this.form.zhmc)) {
                this.msg(0, "账号名称不能为空！");
                return false;
            }
            if (this.objIsEmpty(this.form.xm)) {
                this.msg(0, "姓名不能为空！");
                return false;
            }
            if (this.objIsEmpty(this.form.mm)) {
                this.msg(0, "密码不能为空！");
                return false;
            }
            if (!this.mmIsEmpty(this.form.mm)) {
                this.msg(0, "密码至少8位、包含数字、大小写字母、特殊字符!");
                return false;
            }
            this.form.jyzk = this.jyztFlag ? "1" : "0";

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
                            // let parms = {
                            //   eqName: this.xm,
                            //   name: "工作人员",
                            //   czlx: 2, //czlx: 1添加  2修改  3删除
                            //   TJR: localStorage.getItem("yhm"),
                            //   TJRID: localStorage.getItem("No"),
                            // };

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
            this.clickyhmc = row.xm;
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
            if (this.objIsEmpty(this.form.zhmc)) {
                this.msg(0, "账号名称不能为空！");
                return false;
            }
            if (this.objIsEmpty(this.form.xm)) {
                this.msg(0, "姓名不能为空！");
                return false;
            }
            // if (!this.objIsEmpty(this.form.email)) {
            //   var regEmail =
            //     /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            //   if (!regEmail.test(this.form.email)) {
            //     this.msg(0, "邮箱格式不正确!");
            //     return false;
            //   }
            // }
            // if (!this.sendEmail(this.form.email)) {
            //   this.msg(0, "邮箱格式不正确！");
            //   return false;
            // }
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
                            // let parms = {
                            //   eqName: this.xm,
                            //   name: "工作人员",
                            //   czlx: 2, //czlx: 1添加  2修改  3删除
                            //   TJR: localStorage.getItem("yhm"),
                            //   TJRID: localStorage.getItem("No"),
                            // };

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
            this.listQuery.xm = "";
            this.listQuery.zhmc = "";
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
        handleClose1(done) {
            this.JSID = "";
            this.xm = "";
            this.cdArr = [];
            this.cdArr1 = [];
            this.dialogVisible1 = false;
        },
        handleClose2(done) {
            this.new_password = "";
            this.dialogVisible2 = false;
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
        handleClose3(done) {
            this.selected_jsid = "";
            this.auth_show = false;
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
        // setCheckedKeys(arr) {
        //   this.$nextTick(() => {
        //     this.$refs.tree.setCheckedKeys(arr);
        //   });
        // },
        //重置菜单树形
        // resetChecked() {
        //   this.$nextTick(() => {
        //     this.$refs.tree.setCheckedKeys(this.arr);
        //   });
        // },
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
  