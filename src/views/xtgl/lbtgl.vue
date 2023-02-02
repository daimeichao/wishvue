<template>
    <div v-bind:style="{
        minHeight: minheight,
        backgroundColor: 'rgb(245,245,245)',
        top: '0',
        left: '0',
        position: 'relative',
        width: '100%',
    }">
        <!-- 新增轮播图 -->
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
                                <div class="disFlexCenter" style="margin-top: 5px">
                                    <button style="background-color: rgb(50, 161, 247)" @click="ins">
                                        新增轮播图
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

        <!-- 轮播图表格 -->
        <el-row>
          <div style="  background: rgb(255, 255, 255);
    margin-top: 0.7vw;
    margin-left: 0vw;
    width: 97.8%;
    margin-left: 1vw;
    padding-top: 1vw; ">
                <template>
                    <el-table ref="listdata" stripe v-loading="loading" element-loading-text="加载中"
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255)"
                        border :key="tableKey" :data="jslist" style="width: 97.6%">
                        <el-table-column label="序号" width="50px" align="center">
                            <template slot-scope="scope">
                                {{ scope.$index + (listQuery.curpage - 1) * listQuery.pagesize + 1 }}
                            </template>
                        </el-table-column>
                        <el-table-column label="封面" min-width="120">
                            <template slot-scope="scope">
                                <!-- <img :src="config.fileShowUrl + "> -->
                                <!-- <img :src="fileShowUrl + scope.row.url" style="width: 10vw" /> -->
                                <el-image :src="fileShowUrl + scope.row.url" style="width: 10vw"
                                    :previewSrcList="srcFmtList"
                                    v-if="scope.row.url != '' && scope.row.url != null && scope.row.url != undefined" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="typeName" label="类型" min-width="70">
                        </el-table-column>
                        <el-table-column prop="link" label="链接地址" min-width="100">
                        </el-table-column>
                        <el-table-column label="文本内容" min-width="350">
                            <template slot-scope="scope">
                                <div v-html="scope.row.content"></div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="100">
                            <template slot-scope="scope">
                                <btn :flag="1" @click.native="editBanner(scope.row.pid)"></btn>
                                <btn :flag="2" @click.native="del(scope.row)"></btn>
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
        </el-row>

        <div class="dialog_out">
            <el-dialog :visible.sync="banner_show" width="60%" :before-close="bannerClose" top="5vh">
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
                    ">{{ jstitle }}</div>
                </template>

                <div>
                    <div class="jsshu" style="font-size: 0.9vw; margin: 0 auto">
                        <el-form ref="banner" :model="banner" label-width="160px" label-position="right">
                            <el-form-item label="轮播图类型" :required="true">
                                <el-select placeholder="请选择轮播图类型" v-model="banner.type" style="width: 70%;"
                                    @change="selectLx">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="文本内容" v-if="this.banner.type == 0" :required="true">
                                <!-- <el-input type="textarea" autosize placeholder="请输入文本内容" style="width: 70%;"
                                    :autosize="{ minRows: 4 }" v-model="banner.content">
                                </el-input> -->
                                <editor id="editor_id3" height="250px" :content.sync="banner.content"
                                    :afterChange="afterChange()" :loadStyleMode="false"
                                    @on-content-change="onContentChange"></editor>
                            </el-form-item>
                            <el-form-item label="链接地址" v-if="this.banner.type == 1" :required="true">
                                <el-input v-model="banner.link" clearable style="width: 70%;" maxlength="255">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="封面图" :required="true">
                                <el-upload class="upload-demo" :action="fileUpload" :limit="99"
                                    :file-list="banner.fileList" :show-file-list="false" maxlength="200"
                                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                                    :data="{ path: 'fj' }">
                                    <el-image :src="IMG" v-if="IMG != '' && IMG != undefined"
                                        style="height: auto; width: 300px" />
                                    <!-- <el-image v-if="IMG == '' || IMG == undefined" src="../../imges/sc.png"
                                        style="height: 90px; width: 150px" /> -->
                                    <!-- <img v-if="IMG != '' && IMG != undefined" :src="IMG"
                                        style="height: auto; width: 150px" /> -->
                                    <img v-if="IMG == '' || IMG == undefined" src="../../imges/sc.png"
                                        style="height: 90px; width: 150px" />
                                </el-upload>
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
                    " @click="banner_show = false">
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
        </div>
    </div>
</template>

<script>
import {
    getTree,
    grantAuthorize,
} from "../../api/userApi/jsglAx";
import {
    addBanner,
    updateBanner,
    deleteBanner,
    getBannerList,
    getBannerById,
} from "../../api/lbtapi/lbtAx";
import config from "../../../config/config";
import editor from "@/components/Kindeditor/index.vue";

export default {
    data() {
        return {

            srcFmtList: [],
            IMG: "",
            fjData: { path: "fj" },
            fileShowUrl: config.apiUrl,
            fileUpload: config.apiUrl + "/upload/fileupload",
            url: config.apiUrl + "/upload/fileupload",
            zxnr: "",
            ftzxnr: "",
            ywzxnr: "",
            ljdz: "",
            jtbt: "",
            ftbt: "",
            ywbt: "",
            lx: 0,
            options: [{
                value: "0",
                label: '文本内容'
            },
            {
                value: "1",
                label: '链接地址'
            }],
            banner: {},
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
            jstitle: "新增轮播图",

            form: {},
            jyztFlag: false,

            clickpid: "",
            auth_show: false,
            clickyhmc: "",

            roleList: [],
            userRoleList: [],
            selected_jsid: "",
            banner_show: false,
        };
    },
    components: {
        editor,
    },
    created() {
        this.getHeight(10);
        this.handleFilter();
        //this.getHeight();
        this.getMenuList();
    },
    methods: {
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
                this.$message.error("上传的轮播图只能是 jpg、png、gif 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传的轮播图大小不能超过 2MB!");
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
        selectLx(selectValue) {
            if (selectValue == 0) {
                if (this.banner.link != undefined && this.banner.link != null && this.banner.link != "") {
                    this.banner.link = "";
                }
            } else {
                if (this.banner.content != undefind && this.banner.content != null && this.banner.content != "") {
                    this.banner.content = "";
                }
            }
        },
        handleAvatarSuccess(res, file, fileList) {
            // 原图
            this.IMG = config.apiUrl + res[0].url;
            this.banner.url = res[0].url;
            this.banner.fileList = [];
        },
        afterChange() {
        },
        onContentChange(val) {
            console.log('this.banner.textarea', this.banner.content)
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
            this.srcFmtList = [];
            this.loading = true;
            getBannerList(this.listQuery).then((res) => {
                console.log('%c [ res ]-396-「e:/jiading/littlewish/littlewish-back/src/views/xtgl/lbtgl」', 'font-size:13px; background:#0bb62a; color:#4ffa6e;', res)
                this.total = res.data.outmap.count;
                for (let i = 0; i < res.data.outmap.list.length; i++) {
                    if (res.data.outmap.list[i].url != null && res.data.outmap.list[i].url != "") {
                        this.srcFmtList.push(this.fileShowUrl + res.data.outmap.list[i].url);
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
            this.jstitle = "新增轮播图";

            // this.xm = "";

            // this.form = {
            //   lb: "1",
            // };
            this.banner = {};
            this.IMG = "";
            this.ljdz = "";
            this.type = "ins";
            this.banner_show = true;
            // this.resetChecked();
        },
        addBanner() {
            if (this.objIsEmpty(this.banner.url)) {
                this.msg(0, "请上传封面！");
                return false;
            }
            if (this.objIsEmpty(this.banner.type)) {
                this.msg(0, "请选择类型");
                return false;
            }
            if (this.banner.type == 0) {
                if (this.objIsEmpty(this.banner.content)) {
                    this.msg(0, "请输入文本内容");
                    return false;
                }
            } else {
                if (this.objIsEmpty(this.banner.link)) {
                    this.msg(0, "请输入链接地址");
                    return false;
                }
            }
            this.banner.ljdz = this.ljdz;
            this.$confirm("确认新增该轮播图吗？")
                .then((_) => {
                    // updateUser()
                    addBanner(this.banner).then((res) => {
                        if (res.errorCode === 0) {
                            this.$message({
                                showClose: true,
                                message: "添加成功",
                                type: "success",
                            });
                            this.banner_show = false;
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
                .catch((_) => {
                });
        },
        editBanner(pid) {
            this.jstitle = "编辑轮播图";
            this.type = "upd";
            // this.JSID = pid;
            getBannerById({ pid: pid }).then((res) => {
                this.banner = res.data.data;
                if (this.banner.url != undefined && this.banner.url != null && this.banner.url != '') {
                    this.IMG = this.fileShowUrl + this.banner.url;
                    //this.fmdz = this.fileShowUrl + this.form.fmdz;
                } else {
                    this.IMG = "";
                }
                //this.IMG = this.fileShowUrl + this.banner.dz;
                // this.jyztFlag = this.form.zszt == "1" ? true : false;
                this.banner_show = true;
            });
        },
        updRole() {
            if (this.objIsEmpty(this.banner.url)) {
                this.msg(0, "请上传封面！");
                return false;
            }
            if (this.objIsEmpty(this.banner.type)) {
                this.msg(0, "请选择类型");
                return false;
            }
            if (this.banner.type == 0) {
                if (this.objIsEmpty(this.banner.content)) {
                    this.msg(0, "请输入文本内容");
                    return false;
                }
            } else {
                if (this.objIsEmpty(this.banner.link)) {
                    this.msg(0, "请输入链接地址");
                    return false;
                }
            }
            // this.form.zszt = this.jyztFlag ? "1" : "0";
            this.$confirm("确认修改该轮播图吗？")
                .then((_) => {
                    // updateUser()
                    updateBanner(this.banner).then((res) => {
                        if (res.errorCode === 0) {
                            this.$message({
                                showClose: true,
                                message: "修改成功",
                                type: "success",
                            });
                            this.banner_show = false;
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
                .catch((_) => {
                });
        },
        sendEmail: function () {
            var regEmail =
                /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!this.objIsEmpty(this.form.email) && regEmail.test(this.form.email)) {
                return true;
            }
            return false;
        },
        objIsEmpty(obj) {
            return obj === undefined || obj === null || obj === "";
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
                this.addBanner();
            } else {
                this.updRole();
            }
        },
        del(row) {
            this.$confirm("确认删除该轮播图吗？")
                .then((_) => {
                    deleteBanner({ pid: row.pid }).then((res) => {
                        if (res.errorCode === 0) {
                            this.$message({
                                // showClose: true,
                                message: "删除成功",
                                type: "success",
                            });

                            this.banner_show = false;
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
                .catch((_) => {
                });
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
            this.listQuery.phone = "";
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
        bannerClose(done) {
            this.banner_show = false;
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
                        .catch(() => {
                        });
                })
                .catch(() => {
                });
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
