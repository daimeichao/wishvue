<template>
  <div v-bind:style="{
    minHeight: minheight,
    backgroundColor: 'rgb(245,245,245)',
    top: '0',
    left: '0',
    position: 'relative',
    width: '100%',
  }">
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
                    <div style="height: 1vh; font-size: 0.85vw">角色名称:</div>
                    <div>
                      <el-input v-model="listQuery.JSMC" placeholder="请输入角色名称" show-word-limit
                        style="width: 12vw; height: 1vh; margin-left: 0.5vw"></el-input>
                    </div>
                  </el-col>
                </div>

                <div class="disFlexCenter" style="margin-top: 5px">
                  <el-button style="background-color: #FFC0CB;color: #FFFFFF"  icon="el-icon-search" @click="handleFilter">搜索</el-button>
                  <el-button style="background-color: #63B184;color: #FFFFFF" icon="el-icon-refresh-right"@click="handleReset">重置</el-button>

                  <button style="background-color: rgb(50, 161, 247)" @click="ins">
                    新增角色
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
          <el-table ref="listdata" :header-cell-style="{background:'#e1fff1'}" stripe v-loading="loading" element-loading-text="加载中"
            element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255)" border
            :key="tableKey" :data="jslist" style="width: 97.6%">
            <!-- <el-table-column type="index" label="序号" width="120">
            </el-table-column> -->
            <el-table-column label="序号" width="50px" align="center">
              <template slot-scope="scope">
                {{ scope.$index + (listQuery.curpage - 1) * listQuery.pagesize + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="JSMC" label="角色名称" min-width="150">
            </el-table-column>
            <el-table-column prop="UC" label="用户数量" min-width="100">
            </el-table-column>
            <el-table-column prop="BZ" label="备注" min-width="200">
            </el-table-column>
            <el-table-column label="操作" min-width="246">
              <template slot-scope="scope">
                <el-button size="mini"  type="primary" @click.native="getJSxq(scope.row.XLH)">查看</el-button>
                <el-button size="mini" type="danger" @click.native="del(scope.row)">删除</el-button>
                <el-button size="mini" style="background-color: #FFC0CB;color: #FFFFFF" @click="lslb(scope.row)">人员管理</el-button>
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

    <div class="dialog_out">
      <el-dialog :visible.sync="dialogVisible1" width="40%" :before-close="handleClose1" top="5vh">
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
              height: 95%;
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
          <div class="jsshu" style="height: 41vw; width: 21vw; font-size: 0.9vw; margin: 0 auto">
            <div style="height: 14vw; width: 21vw">

              <div style="width: 6vw; height: 2vw; overflow: hidden">
                <span style="color: red">* </span>角色名称：
              </div>
              <div style="width: 20vw; height: 4vw; overflow: hidden">
                <el-input v-model="JSMC" placeholder="请输入角色名称" maxlength="20" show-word-limit style="width: 98%">
                </el-input>
              </div>

              <div style="width: 6vw; padding-top: 1vw; height: 2vw; overflow: hidden">
                <!-- <span style="color: red">* </span> -->
                备注：
              </div>
              <div style="width: 20vw; padding-top: 1vw; height: 5vw; overflow: hidden">
                <el-input v-model="BZ" placeholder="请输入备注" maxlength="200" show-word-limit style="width: 98%">
                </el-input>
              </div>

            </div>
            <!-- 树 -->
            <div style="
                height: 25vw;
                width: 21vw;
                background-color: white;
                /* padding-top: 7vw; */
              ">
              <div style="width: 6vw; height: 2.5vw; overflow: hidden">
                <span style="color: red">* </span>菜单权限：
              </div>
              <div style="
                  height: 25vw;
                  width: 19.8vw;
                  background-color: white;
                  padding: 0vw 0.2vw;
                  font-size: 1vw;
                  overflow-y: scroll;
                ">
                <el-tree :data="zjdata1" ref="tree" show-checkbox node-key="id" :props="defaultProps"
                  @node-click="handleNodeClick1" check-strictly :default-expand-all="true" :highlight-current="true">
                  <span slot-scope="{ node }">
                    <span :title="node.label" style="font-size: 0.8vw">{{
                        node.label
                    }}</span>
                  </span>
                </el-tree>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <button style="
              width: 4vw;
              height: 2vw;
              border: 1px solid #a7a8aa;
              background-color: #a7a8aa;
              color: #ffffff;
              border-radius: 0.3vw;
              font-size: 0.85vw;
            " @click="dialogVisible1 = false">
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
            " @click="caozuo">
            <div style="">确定</div>
          </button>
        </span>
      </el-dialog>
    </div>

    <!-- 用户列表弹窗 -->
    <el-dialog :title="JSMC + '-用户列表'" :visible.sync="lsshow" width="80%" top="5vh" v-if="lsshow"
      :before-close="beforeClose">
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
            height: 95%;
            font-size: 1vw;
            margin-left: 0.5vw;
            color: #656768;
            font-weight: 600;
            font-family: MicrosoftYaHei-Bold;
          ">
          {{ JSMC + "-用户列表" }}
        </div>
      </template>

      <LSJS ref="lsjs"></LSJS>
    </el-dialog>
  </div>
</template>

<script>
import { addXtczrz } from "../../api/byyt/rzglApi/xtczrzAx";
import {
  getJSlist,
  getTree,
  insJS,
  getJSXQ,
  updJS,
  delJS,
} from "../../api/kcglApi/jsglAx";
import config from "../../../config/config";
import LSJS from "./lsjs";

export default {
  data() {
    return {
      loading: true,
      minheight: "",
      showStatus: false,
      hideStatus: true,
      tableKey: 0,
      rules: {
        //验证规则
        JSMC: [
          {
            required: true,
            message: "请输入资源标签名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 8,
            message: "长度在 1 到 8个字符",
            trigger: "blur",
          },
        ],
      },
      listLoading: false,
      /*列表end*/

      /*分页start*/
      total: null,
      listQuery: {
        curpage: 1,
        pagesize: 10,
        JSMC: "",
      },
      jslist: [], //角色列表
      JSID: "", //角色id
      JSMC: "", //角色名称
      BZ: "", //角色备注

      defaultProps: {
        children: "children",
        label: "label",
      },
      zjdata1: [],
      checkList: [], // 选中的资源
      dialogVisible1: false, //资源转移的弹窗
      PLFJID: "",
      PLFJLX: "0",

      type: "ins",

      cdArr: [],
      cdArr1: [],
      arr: [],
      lsshow: false,
      jstitle: "新增角色",
    };
  },
  components: {
    LSJS,
  },
  created() {
    this.getHeight(10);
    this.handleFilter();
    //this.getHeight();
    this.getMenuList();
  },
  methods: {
    getHeight(x) {
      this.minheight = window.innerHeight - 63 + "px";
      console.log(this.minheight);
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
      getJSlist(this.listQuery).then((res) => {
        console.log('%c [ res ]-379-「e:/jiading/littlewish/littlewish-back/src/views/xtgl/jsgl」', 'font-size:13px; background:#e4f968; color:#ffffac;', res)
        this.total = res.data.outmap.count;
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
      this.jstitle = "新增角色";
      this.JSID = "";
      this.JSMC = "";
      this.BZ = "";
      this.cdArr = [];
      this.cdArr1 = [];
      this.type = "ins";
      this.dialogVisible1 = true;
      this.resetChecked();
    },
    insRole() {
      this.getMenuKeys();
      if (this.JSMC == "" || this.JSMC == null || this.JSMC == undefined) {
        this.$message({
          showClose: true,
          message: "角色名称不能为空！",
          type: "warning",
        });
        return;
      }
      if (
        this.cdArr == [] ||
        this.cdArr == null ||
        this.cdArr == undefined ||
        this.cdArr.length == 0
      ) {
        this.$message({
          showClose: true,
          message: "菜单权限不能为空！",
          type: "warning",
        });
        return;
      }
      this.$confirm("确认新增该角色吗？")
        .then((_) => {
          insJS({ JSMC: this.JSMC, BZ: this.BZ, cdArr: this.cdArr }).then((res) => {
            console.log('%c [ res ]-431-「e:/jiading/littlewish/littlewish-back/src/views/xtgl/jsgl」', 'font-size:13px; background:#27f454; color:#6bff98;', res)
            if (res.status=="success") {
              this.$message({
                showClose: true,
                message: "新增成功",
                type: "success",
              });
              let parms = {
                eqName: this.JSMC,
                name: "角色",
                czlx: 1, //czlx: 1添加  2修改  3删除
                TJR: localStorage.getItem("Name"),
                TJRID: localStorage.getItem("No"),
              };
              addXtczrz(parms).then((res) => { });
              this.dialogVisible1 = false;
              this.resetChecked();
              //刷新页面
              this.handleFilter();
            } else {
              this.$message({
                showClose: true,
                message: res.data.outmap.result,
                type: "error",
              });
            }
          });
        })
        .catch((_) => { });
    },
    getJSxq(XLH) {
      this.JSMC = "";
      this.BZ = "";
      this.cdArr = [];
      this.cdArr1 = [];
      this.jstitle = "编辑角色";
      this.type = "upd";
      this.JSID = XLH;
      getJSXQ({ JSID: XLH }).then((res) => {
        console.log('%c [ getJSXQ ]-469-「e:/jiading/littlewish/littlewish-back/src/views/xtgl/jsgl」', 'font-size:13px; background:#d9cdc5; color:#ffffff;', res)
        this.JSMC = res.data.outmap.JSMC;
        this.BZ = res.data.outmap.BZ;
        this.dialogVisible1 = true;
        this.cdArr = res.data.outmap.menulist;
        this.setCheckedKeys(this.cdArr);
      });
    },
    updRole() {
      this.getMenuKeys();
      if (this.JSMC == "" || this.JSMC == null || this.JSMC == undefined) {
        this.$message({
          showClose: true,
          message: "角色名称不能为空！",
          type: "warning",
        });
        return;
      }
      if (
        this.cdArr == [] ||
        this.cdArr == null ||
        this.cdArr == undefined ||
        this.cdArr.length == 0
      ) {
        this.$message({
          showClose: true,
          message: "菜单权限不能为空！",
          type: "warning",
        });
        return;
      }
      this.$confirm("确认修改该角色吗？")
        .then((_) => {
          updJS({ JSMC: this.JSMC, BZ: this.BZ, cdArr: this.cdArr, JSID: this.JSID }).then(
            (res) => {
              if (res.status=="success") {
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  type: "success",
                });
                let parms = {
                  eqName: this.JSMC,
                  name: "角色",
                  czlx: 2, //czlx: 1添加  2修改  3删除
                  TJR: localStorage.getItem("Name"),
                  TJRID: localStorage.getItem("No"),
                };
                addXtczrz(parms).then((res) => { });
                this.dialogVisible1 = false;
                this.resetChecked();
                //刷新页面
                this.handleFilter();
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.outmap.result,
                  type: "error",
                });
              }
            }
          );
        })
        .catch((_) => { });
    },
    //新增或者修改操作
    caozuo() {
      if (this.type == "ins") {
        this.insRole();
      } else {
        this.updRole();
      }
    },
    del(row) {
      this.$confirm("确认删除该角色吗？")
        .then((_) => {
          let parms = {
            eqName: row.JSMC,
            name: "角色",
            czlx: 3, //czlx: 1添加  2修改  3删除
            TJR: localStorage.getItem("Name"),
            TJRID: localStorage.getItem("No"),
          };
          addXtczrz(parms).then((res) => { });
          delJS({ JSID: row.XLH }).then((res) => {
            if (res.data.outmap.err == "success") {
              this.$message({
                showClose: true,
                message: "删除成功",
                type: "success",
              });

              this.dialogVisible1 = false;
              this.resetChecked();
              //刷新页面
              this.handleFilter();
            } else {
              this.$message({
                showClose: true,
                message: res.data.outmap.result,
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
      this.loading = true;
      this.listQuery.JSMC = "";
      this.listQuery.curpage = 1;
      this.listQuery.pagesize = 10;
      this.getList();
    },
    //分页
    handleSizeChange(val) {
      console.log(val);
      this.listQuery.pagesize = val;
      this.listQuery.curpage = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.listQuery.curpage = val;
      this.getList();
    },

    //批量树形点击
    handleNodeClick1(data) {
      console.log(this.KCID);
      this.PLFJID = data.id;
      this.PLFJLX = data.type;
    },
    //弹窗关闭
    handleClose1(done) {
      this.JSID = "";
      this.JSMC = "";
      this.cdArr = [];
      this.cdArr1 = [];
      this.dialogVisible1 = false;
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
      console.log(this.cdArr);
    },
    setCheckedKeys(arr) {
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(arr);
      });
    },
    //重置菜单树形
    resetChecked() {
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.arr);
      });
    },
    //人员管理
    lslb(row) {
      console.log(row);
      this.lsshow = true;
      this.JSMC = row.JSMC;
      this.JSID = row.XLH;
      this.$nextTick(() => {
        this.$refs.lsjs.jsJSID(this.JSID);
      });
    },
    beforeClose() {
      this.getList();
      this.lsshow = false;
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
}
</style>
