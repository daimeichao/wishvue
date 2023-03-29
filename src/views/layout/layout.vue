<template>
  <div class="app-wrapper" :class="{ hideSidebar: !sidebar.opened }">
    <div class="navBar" style="" v-if="big != '首页' && big != null && ishow == true">
      <i class="el-icon-s-fold" style="cursor: pointer" @click="zzjmethod"></i>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>{{ big }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="!breadcrumb" class="noUrl">{{
            smallName
        }}</el-breadcrumb-item>

        <!--点击详情页时候-->
        <el-breadcrumb-item v-if="breadcrumb" @click.native="close" :to="{ path: breadUrl }">{{ smallName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="breadcrumb" class="noUrl">{{
            breadName
        }}</el-breadcrumb-item>

        <!-- <el-breadcrumb-item>教室详情</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 65px;
        z-index: 2000;
        background: #63B184;
      " id="logo_top">
<!--      <img src="../../imges/下载加载.mp4" style="-->
<!--            float: left;-->
<!--            height: 3vw;-->
<!--            width: 3vw;-->
<!--            margin-top: 0.2vw;-->
<!--            margin-right:1vw;-->
<!--            background-size: 100%-->
<!--          " />-->
    <div  style="
            float: left;
            margin-left: -2vw;
            margin-top: -7vw;" >
      <lottie :options="defaultOptions"  :height="300" :width="350" style="margin-bottom: 0.1vw !important;" @animCreated="handleAnimation" /></div>
      <div style="margin-top: 1.2vw;margin-left: 15vw">
      <span style="font-size: 36px;color:#FFFFFF;font-family: Lucida Calligraphy, cursive, serif, sans-serif;font-weight: bolder;"> 社区志愿后端管理
      </span>
        <div style="position: fixed;top: 0;right: 1vw">
          <div style="float: right; margin-right: 10px">
        <div @click="logout" style="
            cursor: pointer;
            color: #fff;
            float: right;
            height: 28px;
            margin-top: 24.5px;
            margin-right: -20px;
            width: 32px;
            height: 15px;
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          ">
          <span style="margin-left: -0.5vw;font-size: 20px;">退出</span>
        </div>
        <img @click="logout" src="../../imges/tc_01.png" style="
            cursor: pointer;
            float: right;
           margin-top: 1vw;
            margin-right:1vw;
            background-size: 100%;
            width: 1.5vw;
            height: 1.5vw;
          " />
        <img src="../../imges/yhm_01.png" style="
            float: left;
            height: 3vw;
            width: 3vw;
            margin-top: 0.2vw;
            margin-right:1vw;
            background-size: 100%
          " />
        <div style="
            color: #fff;
            float: left;
            margin-top: 1vw;
            font-size: 20px;
            line-height: 26px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            margin-right: 1vw;
          ">
          {{ name }}
        </div>
        <img src="../../imges/line.png" style="
            float: left;
            height: 2vw;
            margin-top: 1vw;
            margin-right: 1vw;
             width: 1px; " />
      </div>
        </div>
      <!-- <div style="float:right">
				  <img src="../../imges/xx.jpg"  style="float:right;height:64px;"/>
			</div> -->
      </div>  </div>

    <sidebar v-show="ishow" class="sidebar-container" style="margin-top: 65px" @hiddlen="hiddlen" @bigTitle="bigTitle"
      @smallTitle="smallTitle" ref="sidebar"></sidebar>

    <div class="main-container" v-if="ishow == true" style="background-color: #f5f5f5">
      <div style="
          position: absolute;
          right: 2%;
          top: 15px;
          z-index: 2000;
          color: #ff0000;
          width: 400px;
        "></div>
      <div style="">
        <div class="user-main">
          <app-main @detailName="detailName" @returnUrl="returnUrl"></app-main>
        </div>
      </div>
    </div>

    <div class="main-containershow" style="background-color: #f5f5f5" v-if="ishow == false">
      <div class="hidd" @mouseover="mouseover" style="
          position: absolute;
          z-index: 2000;
          width: 2vw;
          height: 91%;
          margin-left: -1vw;
          margin-top: -0.5vw;
        "></div>
      <div style="">
        <div class="user-main">
          <div style="position: absolute; z-index: 9999; width: 1vw"></div>
          <app-main @detailName="detailName" @returnUrl="returnUrl"></app-main>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" width="80%" custom-class="cla1" :before-close="handleClose">
      <iframe ref="xxinfo" seamless width="100%" style="height: 59vh" :src="iframUrl" frameborder="0"></iframe>
    </el-dialog>
  </div>
</template>

<script>
  import lottie from 'vue-lottie'
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AppMain from "./AppMain";
import * as animationData from '../../imges/下载加载.json';


import Cookies from "js-cookie";
import { getToken, setToken, removeToken, getAllCookie } from "../../util/auth";
import { mapGetters } from "vuex";

import config from "../../../config/config";
const fileShowUrl = config.fileShowUrl;

export default {
  // name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    lottie,
  },
  computed: {
    sidebar() {
      // sidebar.opened = true
      return this.$store.state.app.sidebar;
    },
    ...mapGetters([
      "sidebar",
      // 'name',
      "avatar",
    ]),
  },
  data() {
    return {
      defaultOptions: { animationData: animationData },
      ishow: true,
      // name:'',
      dialogVisible: false,
      FQRBM: "",
      TSTAMP: "",
      BT: "",
      TZNR: "",
      WJM: "",
      WJLJ: "",
      vueUrl: config.vueUrl,
      iframUrl: config.vueUrl + "Tzgg",
      name: "",
      ss2: "",
      bigName: "", // 侧边栏选中的大标题
      smallName: "", // 侧边栏选中的小标题
      big: "", // 判断面包屑导航栏是否显示
      breadcrumb: false, // 是否显示面包屑导航栏最后一个部分
      breadUrl: "", // 面包屑导航栏路径
      breadName: "", // 面包屑导航栏名字
    };
  },
  created() {
    var that = this;
    var newsId = localStorage.getItem("newsId");
    if (newsId != "" && newsId != null && newsId != undefined) {
      // getCbdDetail({ XXID: newsId }).then((res) => {
      //   if (res.data.outmap.result == 'success') {
      //     if (res.data.outmap.cbdDetail != '' && res.data.outmap.cbdDetail != null) {
      //       that.dialogVisible = true;
      //     }
      //   }
      // });
    }
    this.cre1();
    this.smallName = localStorage.getItem("small");
    // this.big = localStorage.getItem('big')
    this.big = "首页";
  },
  mounted() {
    window.xxinfo = this.xxinfo;
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    mouseover() {
      this.ishow = true;
    },
    zzjmethod() {
      if (this.ishow == false) {
        this.ishow = true;
      } else {
        this.ishow = false;
      }
    },

    // 点击详情页改变面包屑导航栏的内容
    detailName(data) {
      this.breadcrumb = true;
      this.breadName = data;
    },
    returnUrl(data) {
      this.breadUrl = data;
    },
    // 关闭第三级的面包屑导航栏
    close() {
      this.breadcrumb = false;
    },
    cre1() {
      var that = this;
      this.ss2 = setInterval(function () {
        that.name = localStorage.getItem("yhm");
        //that.name = '管理员';

        if (that.name != null && that.name != undefined && that.name != "") {
          that.cre2();
        }
      }, 1000);
    },
    cre2() {
      clearInterval(this.ss2);
    },
    //操作说明点击事件
    tiaozhuan() {
      this.$router.push({ path: "/sysm/smxq" });
    },
    handleClose() {
      this.iframUrl = "";
      this.dialogVisible = false;
    },
    xxinfo(newsId) {
      this.iframUrl = config.vueUrl + "Tzgg";
      //	this.$refs.xxinfo.contentWindow.location.href=this.iframUrl;

      localStorage.setItem("newsId", newsId);

      this.dialogVisible = true;
    },
    openfile() {
      window.open(fileShowUrl + this.WJLJ);
    },
    logout() {
      this.$confirm("确认要退出登录吗", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          localStorage.removeItem("code");
          localStorage.removeItem("No");
          localStorage.removeItem("Name");
          localStorage.removeItem("FK_Dept");
          localStorage.removeItem("FK_DeptName");
          localStorage.removeItem("Type");
          localStorage.removeItem("userId");
          localStorage.removeItem("yhm");

          // this.$router.push("/login");
          this.$router.push("/");

          //removeToken()
          // sessionStorage.clear()
          // Cookies.remove('No');
          // Cookies.remove('Name');
          // Cookies.remove('FK_Dept');
          // Cookies.remove('FK_DeptName');
          // Cookies.remove('SID');
          // location.replace('https://sso.fjcpc.edu.cn/ZAS/ssologout?Referer=https://appzb.fjcpc.edu.cn/wlw-api/sso/login')
          // location.replace('https://sso.fjcpc.edu.cn/ZAS/ssologout?Referer=http://211.80.233.107:8066/wlw-api/sso/login')

          //	 location.replace('https://appzb.fjcpc.edu.cn/mwcztymh/system/login.do')
        })
        .catch((action) => { });
    },
    bigTitle(bigTitle) {
      this.bigName = bigTitle;
    },
    smallTitle(smallTitle) {
      this.big = this.bigName || localStorage.getItem("big");
      this.smallName = smallTitle;
      localStorage.setItem("small", this.smallName);
      localStorage.setItem("big", this.big);
      this.close();
    },
    hiddlen() {
      // this.ishow = false;
    },
  },
};
</script>
<style>
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.hideSidebar {
    .sidebar-container {
      width: 48px;
      padding: 0 !important;
      overflow: inherit;
    }

    .main-container {
      margin-left: 48px;
      // margin-top: 60px;
    }
  }

  .sidebar-container {
    transition: width 0.28s ease-out;
    width: 14vw;
    // height: 93%;
    min-height: 100%;
    position: fixed;
    // top: 70px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s ease-out;
    margin-left: 14vw;
    padding-top: 62px;
    padding-left: 0.7vw;
  }

  .main-containershow {
    min-height: 100%;
    transition: margin-left 0.28s ease-out;
    margin-left: 0vw;
    padding-top: 62px;
    padding-left: 0.7vw;
  }

  .imgPic {
    width: 100%;
    overflow: hidden;
    height: 70px;
    line-height: 70px;
    background-color: #63B184;
    position: fixed;
    height: auto;
    overflow-y: auto;
    z-index: 1001;
  }

  .user-navbar {
    position: fixed;
    width: 100%;
    height: auto;
    overflow-y: auto;
    overflow: hidden;
    z-index: 1001;
    // top: 70px;
    top: 65px;
  }

  .user-navbar2 {
    position: fixed;
    width: 100%;
    height: auto;
    overflow-y: auto;
    overflow: hidden;
    z-index: 1001;
    // top: 70px;
    top: 65px;
  }

  .user-main {
    // padding-top: 59px;
    // margin-top: 65px;
    background: white;
  }

  // .user-avatar {
  // 	width: 40px;
  // 	height: 40px;
  // 	border-radius: 10px;
  // }

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    position: absolute;
    margin-top: 15px;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    height: 100%;
  }

  .linkeytable table {
    border-collapse: collapse;
    border: 1px solid #000;
    word-wrap: break-word;
    word-break: break-all;
  }

  .linkeytable td {
    border-collapse: collapse;
    border: 1px solid #000;
    padding: 4px;
    font-size: 12pt;
    font-family: "宋体", "Arial";
  }

  .linkeytable td.texttd {
    text-align: right;
    background: #f1f7fe;
    font-size: 12pt;
    font-family: "宋体", "Arial";
  }

  .linkeytable {
    vertical-align: middle;
    margin: 0 auto;
    width: 80%;
  }

  .linkeytable caption {
    text-align: center;
    padding: 20px;
    font-size: 32pt;
    font-weight: bold;
    font-family: "楷体", Arial;
  }

  .linkeytable tr th {
    width: 15%;
    text-align: right;
  }

  .paper p {
    margin: 10px 0;
  }

  .fileitem {
    font-size: 16px;
    padding-left: 20px;
    margin: 0.5vw 0;
  }

  .curp {
    cursor: pointer;
  }
}

.navBar {
  position: relative;
  top: 65px;
  right: 0px;
  left: 14vw;
  height: 40px;
  background: #fff;
  margin-bottom: 12px;
  // width: 85vw;
  // width: 85.9vw;
  width: 85.9%;
  display: flex;
  color: #8c9092;
}

.navBarshow {
  position: relative;
  top: 65px;
  right: 0px;
  left: 0vw;
  height: 40px;
  background: #fff;
  margin-bottom: 12px;
  width: 100%;
  display: flex;
  color: #8c9092;
}

.navBar i {
  line-height: 40px;
  padding-left: 15px;
  padding-right: 15px;
}

.navBar /deep/ .el-breadcrumb__inner {
  color: #8c9092;
}

.navBar /deep/ .el-breadcrumb__inner:hover {
  color: #8c9092;
}

.navBar /deep/ .el-breadcrumb__inner.is-link {
  font-weight: 400;
}

.noUrl /deep/ .el-breadcrumb__inner {
  color: #72d3a3;
  font-weight: 400;
}
</style>
