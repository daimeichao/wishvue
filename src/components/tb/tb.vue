<template>
  <div
    style="
      font-family: 'MicrosoftYaHei';
      background-color: '#000000';
      width: 100%;
    "
  >
    <div class="deptag">
      <!-- 头部 -->
      <div style="height: 1.5vw; padding: 0 18vw; font-size: 0.7vw">
        <div
          style="color: white; line-height: 1.5vw; float: right; height: 1.5vw"
        >
          <div style="float: left">
            <img
              src="../../../src/imges/home/tx.png"
              style="padding-top: 0.2vw; width: 1vw"
            />
          </div>
          <a>
            <div style="float: left; margin-left: 0.5vw">你好，{{ Name }}</div>
          </a>
          <div @click="logout" style="float: left; cursor: pointer">
            <img
              src="../../../src/imges/home/zx.png"
              style="width: 2vw; margin-top: 0.25vw; margin-left: 0.5vw"
            />
          </div>
        </div>
      </div>

      <!-- 第二头部 -->
      <div style="height: 6vw; padding: 0 18vw">
        <div style="float: left; line-height: 5vw">
          <img src="../../../src/imges/home/LOGO.png" style="width: 29vw" />
        </div>
      </div>
    </div>

    <!-- 第三头部 -->
    <div
      class="deptag-dhl"
      style="height: 2.5vw; padding: 0 18vw; font-size: 0.9vw"
    >
      <div
        v-if="pageName === 'sy'"
        style="
          color: white;
          line-height: 2.5vw;
          float: left;
          height: 2.4vw;
          width: 9.14vw;
          cursor: pointer;
        "
      >
        <span style="border-bottom: 3px solid white">首页</span>
      </div>
      <div
        v-if="pageName !== 'sy'"
        @click="toSy"
        style="
          color: white;
          line-height: 2.5vw;
          float: left;
          height: 2.4vw;
          width: 9.14vw;
          cursor: pointer;
        "
      >
        首页
      </div>
      <div
        v-if="pageName === 'yyks'"
        style="
          color: white;
          line-height: 2.5vw;
          float: left;
          height: 2.4vw;
          width: 9.14vw;
          cursor: pointer;
        "
      >
        <span style="border-bottom: 3px solid white">预约考试</span>
      </div>
      <div
        v-if="pageName !== 'yyks'"
        @click="toYyks"
        style="
          color: white;
          line-height: 2.5vw;
          float: left;
          height: 2.4vw;
          width: 9.14vw;
          cursor: pointer;
        "
      >
        预约考试
      </div>
      <div
        v-if="pageName === 'cjcx'"
        style="
          color: white;
          line-height: 2.5vw;
          float: left;
          height: 2.4vw;
          width: 9.14vw;
          cursor: pointer;
        "
      >
        <span style="border-bottom: 3px solid white">常规考试成绩查询</span>
      </div>
      <div
        v-if="pageName !== 'cjcx'"
        @click="toCjcx"
        style="
          color: white;
          line-height: 2.5vw;
          float: left;
          height: 2.4vw;
          width: 9.14vw;
          cursor: pointer;
        "
      >
        常规考试成绩查询
      </div>

      <div
        v-if="pageName === 'wjcjcx'"
        style="
          color: white;
          line-height: 2.5vw;
          float: left;
          height: 2.4vw;
          width: 9.14vw;
          cursor: pointer;
        "
      >
        <span style="border-bottom: 3px solid white">随机考试成绩查询</span>
      </div>
      <div
        v-if="pageName !== 'wjcjcx'"
        @click="toWjcjcx"
        style="
          color: white;
          line-height: 2.5vw;
          float: left;
          height: 2.4vw;
          width: 9.14vw;
          cursor: pointer;
        "
      >
        随机考试成绩查询
      </div>

      <!-- <div v-if="pageName === 'zxcs'" style="color:white;line-height:2.5vw;float:left;height:2.4vw;width:9.14vw;cursor:pointer;">
        <span style="border-bottom:3px solid white;">在线测试</span>
      </div>
      <div v-if="pageName !== 'zxcs'" @click="toZxcs" style="color:white;line-height:2.5vw;float:left;height:2.4vw;width:9.14vw;cursor:pointer;">
        在线测试
      </div> -->
    </div>
  </div>
</template>

<script>
// import {
//   updateCH1,
// } from "../../../api/zhbApi/zhbAx";
import config from "../../../config/config";

export default {
  data() {
    return {
      search: "", //搜索框
      select: 0, //类型选择
      Name: localStorage.getItem("yhm"),
      i: "",
      LSLX: localStorage.getItem("Type"),
    };
  },
  name: "tb",
  props: {
    pageName: String, //这样可以指定传入的类型，如果类型不对，会警告
  },
  components: {},
  created() {
    var that = this;
    this.i = setInterval(function () {
      that.Name = localStorage.getItem("yhm");
      that.LSLX = localStorage.getItem("Type");
    }, 600);
    setTimeout(function () {
      clearInterval(that.i);
    }, 5000);
  },
  methods: {
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
          localStorage.removeItem("ifxzls");
          localStorage.removeItem("yhm");

          this.$router.push("/login");

          // removeToken()
          // sessionStorage.clear()
          // Cookies.remove('No');
          // Cookies.remove('Name');
          // Cookies.remove('FK_Dept');
          // Cookies.remove('FK_DeptName');
          // Cookies.remove('SID');
          // location.replace('https://sso.fjcpc.edu.cn/ZAS/ssologout?Referer=https://appzb.fjcpc.edu.cn/wlw-api/sso/login')
          //  location.replace('https://sso.fjcpc.edu.cn/ZAS/ssologout?Referer=http://211.80.233.107:8066/wlw-api/sso/login')

          // location.replace('https://sso.fjcpc.edu.cn/ZAS/ssologout?Referer=https://appzb.fjcpc.edu.cn/kszx-api/sso/login')
          //	 location.replace('https://appzb.fjcpc.edu.cn/mwcztymh/system/login.do')
        })
        .catch((action) => {});
    },

    toSy() {
      if (this.pageName !== "sy") {
        this.$router.replace("/sy");
      }
    },
    toYyks() {
      if (this.pageName !== "yyks") {
        if (this.pageName == "sy") {
          // this.toother('/yyks')
          this.$emit("toother", "/yyks");
        } else {
          this.$router.replace("/yyks");
        }
      }
    },
    toCjcx() {
      if (this.pageName !== "cjcx") {
        if (this.pageName == "sy") {
          this.$emit("toother", "/cjcx");
        } else {
          this.$router.replace("/cjcx");
        }
      }
    },

    toWjcjcx() {
      if (this.pageName !== "wjcjcx") {
        if (this.pageName == "sy") {
          this.$emit("toother", "/wjcjcx");
        } else {
          this.$router.replace("/wjcjcx");
        }
      }
    },

    toZxcs() {
      if (this.pageName !== "zxcs") {
        if (this.pageName == "sy") {
          this.$emit("toother", "/zxcs");
        } else {
          this.$router.replace("/zxcs");
        }
      }
    },
  },
};
</script>
<style>
.deptag {
  background: url(../../../src/imges/home/bg.jpg) no-repeat center center;
  background-size: 100vw 7vw;
  text-align: center;
  font-size: 2.5vw;
  width: 100%;
  height: 7vw;
  line-height: 6vw;
  -webkit-text-size-adjust: none;
}
.deptag-dhl {
  background: url(../../../src/imges/home/dhlbjt.png) no-repeat center center;
  background-size: 100vw 4vw;
  text-align: center;
  width: 100vw;
  height: 2.5vw;
  line-height: 2.5vw;
  -webkit-text-size-adjust: none;
}
.syssl input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #4b4e50;
}
.syssl input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: black;
}
.syssl input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: black;
}
.syssl input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: black;
}
</style>
