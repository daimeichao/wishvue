<template>
  <div class="calendar-list-container">
    <el-row>
      <el-row>
        <el-col :span="24" class="app-container4">
          <div>
            <div v-if="hideStatus" style="margin-bottom:10px">
              <el-form ref="form" :model="listQuery">
                <el-row class="disFlexCenter">
                  <el-col :span="4">
                    <el-input v-model="listQuery.LSMC" placeholder="请输入用户名称" maxlength="50" show-word-limit style="width: 98%"></el-input>
                  </el-col>
                  <el-col>
                     <el-button style="background-color: #FFC0CB;color: #FFFFFF"  icon="el-icon-search"  @click="handleFilter">搜索</el-button>
                    <el-button style="background-color: #63B184;color: #FFFFFF" icon="el-icon-refresh-right"  @click="handleReset">重置</el-button>
                    <button v-if="JSID!=13" style="background-color: rgb(50, 161, 247);line-height:1.9vw" @click="ins">新增</button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- </div> -->

            <div class="demo-block-control" v-if="showStatus" @click="showClick">
              <i class="el-icon-caret-bottom"></i>
              <span style="font-size: 10px">显示</span>
            </div>

            <div class="demo-block-control" v-if="hideStatus" @click="hideClick">
              <i class="el-icon-caret-top"></i>
              <span style="font-size: 10px">隐藏</span>
            </div>
            <!-- 显示隐藏搜索框end -->

            <div style="margin-top: 10px; border: 0px solid #d8dce5" class="bg-purple filter-container calendar-list-container">
              <el-col :span="24">
                <div calss="bg-purple filter-container app-container3  calendar-list-container" style="line-height: 25px">
                  <el-table stripe border :key="tableKey" :data="lslist" ref="listdata" style="width: 100%;" highlight-current-row v-loading="loading"
                    element-loading-text="加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255)" header-row-class-name="tableHead" cell-class-name="tableHead" :header-cell-style="{ background: '#f2f2f3' }" :cell-style="{ padding: '8px' }">
                    <el-table-column type="index" label="序号" width="80" fixed="left" :show-overflow-tooltip="true"></el-table-column>
                    <!-- <el-table-column prop="LSID" label="联系方式" min-width="250" :show-overflow-tooltip="true"></el-table-column> -->
                    <el-table-column prop="yhmc" label="用户名称" min-width="100" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="操作" fixed="right" min-width="150" v-if="JSID!=13">
                      <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click.native="del(scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- 分页-->
                  <div v-show="!listLoading" class="blockPage">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.limit" background layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                  </div>
                </div>
              </el-col>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <!-- 绑定用户弹窗 -->
    <el-dialog title="绑定用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" style="max-height: 80vh; overflow-y: scroll" :append-to-body="true">
      <el-select v-model="selValue" filterable multiple placeholder="请选择要绑定的用户" style="margin-left: 10%; width: 80%">
        <el-option v-for="item in tlist" :key="item.id" :label="item.name" :value="item.id + '|' + item.name">
          <!-- + '|' + item.name -->
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">

        <button style="width: 4vw;height: 2vw;border: 1px solid #A7A8AA;background-color: #A7A8AA;color: #FFFFFF;border-radius: 0.3vw;font-size: 0.85vw" @click="dialogVisible=false">
          <div style="">取消</div>
        </button>
        <button style="width: 4vw;height: 2vw;border: 1px solid #0061AC;background-color:#0061AC;color: #FFFFFF;border-radius: 0.3vw;font-size: 0.85vw" @click="insJSLS">
          <div style="">确定</div>
        </button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getLSlist, insJSLSS, delJSLS, getAllTeacher, getAllUserList
} from "../../api/kcglApi/jsglAx";
import config from "../../../config/config";

export default {
  data () {
    return {
      loading:false,
      showStatus: false,
      hideStatus: true,
      tableKey: 0,
      listLoading: false,
      /*列表end*/

      /*分页start*/
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        LSMC: "",
        LSID: "",
        JSID: this.jsid,
      },
      lslist: [], //角色列表
      LSID: "",      //角色id
      LSMC: "",      //角色名称

      tlist: "",
      selValue: "",
      dialogVisible: false,
      JSID :""
    };
  },
  props: {
    jsid: String,
  },
  created () {
    this.listQuery.LSMC='';
    this.listQuery.LSID = '';
    //this.getHeight();
    // this.getTeacher();
    // this.getList();
  },
  methods: {
    //显示搜索框
    showClick () {
      this.showStatus = false;
      this.hideStatus = true;
      this.tableHeight = window.innerHeight - 250;
    },
    //隐藏搜索框
    hideClick () {
      this.showStatus = true;
      this.hideStatus = false;
      this.tableHeight = window.innerHeight - 193;
    },
    //表格自适应高
    getHeight () {
      this.height = window.innerHeight - 350 + "px";
      this.tableHeight = window.innerHeight - 300;
      // this.divheight = window.innerHeight - 165 + 'px'
    },
    //消息提示  1成功 0 警告
    msg (type, title) {
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
    jsJSID (JSID) {
      this.listQuery.JSID = JSID;
      this.JSID = JSID;
      this.getList();
    },
    getList () {
      getLSlist(this.listQuery).then((res) => {
        this.total = res.data.outmap.count;
        this.lslist = res.data.outmap.list;
      });
      this.getTeacher();
    },
    //获取可绑定用户列表
    getTeacher () {
      let cs = {
        JSID: this.JSID
      };
      getAllTeacher(cs).then((res) => {
        this.tlist = res.data.outmap.list;
      });
    },
    ins () {
      this.selValue = "";
      this.dialogVisible = true;

    },
    insJSLS () {
      if (this.selValue == "" || this.selValue == null || this.selValue == undefined) {
        this.$message({
          type: "warning",
          message: "用户不能为空!",
        });
        return;
      }
      let cs = {
        JSID: this.JSID, // 角色id
        LSIDS: this.selValue, // 要绑定的用户列表
        t: new Date()
      }
      this.$confirm("确认绑定用户吗？")
        .then((_) => {
          insJSLSS(cs).then((res) => {
            if (res.status == "success") {
              this.$message({
                type: "success",
                message: "绑定成功!",
              });
              this.dialogVisible = false;
              this.handleFilter();
            } else {
              this.$message({
                type: "warning",
                message: res.data.outmap.err,
              });
            }
          })
        })
        .catch((_) => { });

    },
    del (row) {
      this.$confirm("确认删除该用户吗？")
        .then((_) => {
          delJSLS({ "JSID": row.JSID, "LSID": row.yhid }).then((res) => {
            if (res.data.outmap.err == "success") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.handleFilter();
            } else {
              this.$message({
                type: "warning",
                message: res.data.outmap.err,
              });
            }
          });
        })
        .catch((_) => { });

    },
    //弹窗关闭
    handleClose (done) {
      done();
    },
    //搜索
    handleFilter () {
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
      this.getList();
    },

    //重置
    handleReset () {
      this.listQuery.LSID = "";
      this.listQuery.LSMC = "";
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
      this.getList();
    },
    //分页
    handleSizeChange (val) {
      this.listQuery.limit = val;
      this.listQuery.page = 1;
      this.getList();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
      this.getList();
    },

  },
};
</script>
<style>
@import "../../css/common.css";

.innerdialog {
  width: 100%;
  height: 80vh;
  overflow-y: hidden;
}
.el-transfer-panel {
  width: 38% !important;
}
.el-transfer-panel__body {
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
.el-transfer-panel__list.is-filterable {
  height: 100% !important;
}
.el-checkbox:last-of-type {
  margin-left: 0 !important;
  margin-right: 30px !important;
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
.el-textarea__inner {
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
.el-textarea__inner {
  background-color: #f1f1f1;
  resize: none;
  color: black;
}
.el-textarea.is-disabled .el-textarea__inner {
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
.el-input .el-input__count .el-input__count-inner {
  background: #f5f7fa !important;
}
</style>
