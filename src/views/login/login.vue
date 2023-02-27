<template>
  <div class="index-container">
    <div class="loginFrame">
      <div class="logoImgs">
<!--        <div class="zuo"></div>-->
      </div>
    </div>

    <div class="loginbox">
      <div class="img_mtlogo">志愿服务</div>
      <p class="yhdl">用户登录</p>
      <div class="loginform" @keydown.enter="login">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item>
            <div class="img_zh"></div>
            <el-input v-model="formLabelAlign.yhm" placeholder="请输入账号" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="img_mm"></div>
            <el-input v-model="formLabelAlign.pwd" show-password placeholder="请输入密码" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item>
            <div style="width: 50%;">
              <el-input v-model="formLabelAlign.yzm" placeholder="请输入验证码" maxlength="4"></el-input>
            </div>
            <div style="width: 45%;">
              <img :src="'data:image/gif;base64,'+ yzmimg" :alt="yzmts" title="看不清？换一张！"
                style="position: absolute; width: 38%; left: 55%; bottom: 15%;" @click="getYzm()">
            </div>
          </el-form-item>
        </el-form>
        <div class="loginbtn" @click="login">登 录</div>
      </div>
    </div>

<!--    <img class="loginbg" src="../../imges/login/背景.png" />-->
    <div class="loginbg"> </div>
  </div>
</template>
<script>
import { login, getYzm} from "../../api/projectApi/projectAx";
import validateCode from "@/components/ValidateCode";

export default {
  name: "login",

  created() {
    this.getYzm();
    if (
      localStorage.getItem("yhm") != "" &&
      localStorage.getItem("yhm") != null &&
      localStorage.getItem("yhm") != undefined
    ) {
      this.$router.replace("/xygl/xylist");
    }
  },
  components: {
    validateCode,
  },
  data() {
    return {
      yzmts: "验证码获取失败！",
      pid: "",
      user: "",
      yzmimg: "",
      pwd: "",
      yzm: "",
      checked: 2, // 1记住密码
      inputVal: "",
      result: "",
      time:'',
      labelPosition: "top",
      formLabelAlign: {
        yhm: "",
        key: "",
        pwd: "",
        yzm: "",
        yzmid: "",
      },
    };
  },
  methods: {
    getYzm() {
      // 请求后台验证码
      this.time = new Date().getTime();
      getYzm(this.time).then(letn => {
        // this.formLabelAlign.yzmid = letn.data.pid
        this.yzmimg = letn.data.imgBase
      }), (error) => {
        this.yzmts = "验证码获取失败！";
        this.$message({
          type: 'warning',
          message: '系统错误，请联系管理员!'
        });
      }
    },
    changeCode(value) {
      this.checkCode = value;
    },
    objIsEmpty(obj) {
      return obj == "" || obj == undefined || obj == null;
    },

    login() {
      if (this.objIsEmpty(this.formLabelAlign.yhm)) {
        this.$message({
          message: "请输入用户名！",
          type: "warning",
        });
        return;
      }
      if (this.objIsEmpty(this.formLabelAlign.pwd)) {
        this.$message({
          message: "请输入密码！",
          type: "warning",
        });
        return;
      }
      if (this.objIsEmpty(this.formLabelAlign.yzm)) {
        this.$message({
          message: "请输入验证码！",
          type: "warning",
        });
        return;
      }
      this.formLabelAlign.key = this.time;
      login(this.formLabelAlign).then((res) => {
        console.log('%c [ res ]-120-「e:/jiading/littlewish/littlewish-back/src/views/login/login」', 'font-size:13px; background:#6b76bd; color:#afbaff;', res)
        if (res.errorCode === 0) {
          let user = res.data.data;
          console.log('%c [ res ]-123-「e:/jiading/littlewish/littlewish-back/src/views/login/login」', 'font-size:13px; background:#daa513; color:#ffe957;', res)
          this.$message.success("登录成功");
          localStorage.setItem("yhm", user.account);
          localStorage.setItem("pid", user.pid);
          localStorage.setItem("No", user.pid);
          // localStorage.setItem("mm", user.mm);
          localStorage.setItem("checked", this.checked);

          this.$router.push("/xygl/xylist");
        } else {
          this.$message({
            message: res.data.result,
            type: "warning",
          });
        }

        // this.formLabelAlign.yhm = "";
        // this.formLabelAlign.pwd = "";

        // this.$refs["ref_validateCode"].draw();
      });
    },
    jzmm() {
      if (this.checked === 1) {
        this.checked = 2;
      } else {
        this.checked = 1;
      }
    },
  },
};
</script>

<style scoped>
.index-container {
  /* background: url(../../imges/login/login.jpg) no-repeat; */
  height: 100%;
  width: 100%;
  /* background-size: 100% 100%; */
}

.loginFrame {
   background-image: url(../../imges/login/背景.jpg);
  /*background-color: white;*/
  /*background-color: #008F93;*/
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  border-radius: 15px;
  right: 10%;
  top: 17%;
  width: 80%;
  height: 65%;
}

.logoImgs {
  background-image: url(../../imges/login/团队-8.png);
  /*background-color: #f19f4d;*/
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  /* right: 10%; */
  width: 50%;
  height: 100%;
}
.zuo{
  /*background-color: #f9cf00;*/
  background-color: #FFFFFF;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  width: 70%;
  height: 70%;
  margin-top: 5vw;
  margin-left: 5vw;
}
.loginbox {
  position: absolute;
  right: 10%;
  top: 14%;
  /*background-image: url("../../imges/login/you.jpg") ;*/
  /*background-repeat: no-repeat;*/
  /*background-size: 100% 100%;*/

  /* background-color: beige; */
  width: 38%;
  height: 70%;
  color: #000;
  /*background-color: #FECDC2;*/
}

.img_mtlogo {
  /*background-image: url("../../imges/wxy/logo黑.png");*/
  color:#FFFFFF ;
  font-size: 3vw;
  font-weight: 700;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 30%;
  top: 12%;
  width: 45%;
  height: 9%;
}

.yhdl {
  position: absolute;
  left: 8%;
  top: 25%;
  /* background: #fff; */
  /*color: rgb(46, 91, 174);*/
  color: #FFFFFF;
  font-size: 1.5vw;
  font-weight: 700;
  width: 80%;
}

.loginform {
  position: absolute;
  top: 36%;
  width: 80%;
  left: 8%;
}

/* .loginform>>>.el-form-item__label {
  font-size: 1.15vw;
  padding: 0;
} */

.loginform>>>.el-input__inner {
  font-size: 1.15vw !important;
  right: 10%;
  border: none;
  /* border-bottom: 1px solid #ccc; */
  border: 2px solid #ccc;
  border-radius: 25px;
  padding-left: 12%;
  outline: none;
  margin-bottom: 1%;
  height: 3.0vw;
  background: #fff;
}

.img_zh {
  z-index: 1;
  background-image: url("../../imges/login/用户.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 91%;
  top: 25%;
  width: 20px;
  height: 20px;
}

.img_mm {
  z-index: 1;
  background-image: url("../../imges/login/密码.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 91%;
  top: 25%;
  width: 20px;
  height: 20px;
}

.loginbtn {
  position: absolute;
  top: 105%;
  color: #fff;
  background-color: rgb(46, 91, 174);
  /* height: 2vw; */
  padding: 1vw 4vw;
  width: 100%;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
}


.main {
  width: 100%;
  position: absolute;
}

.loginmain {
  margin-top: 7vw;
}

.bt {
  position: absolute;
  margin-top: 13vw;
  margin-left: 5vw;
}

.loginBd {
  width: 32vw;
  height: 23vw;
  position: absolute;
  margin-top: 16vw;
  margin-left: 34vw;
}

.bkdiv {
  margin-left: 2vw;
  border: 3px solid #0ba1f8;
  width: 548px;
  height: 59px;
  margin-top: 1.5vw;
}

.bkdiv1 {
  margin-left: 2vw;
  border: 3px solid #0ba1f8;
  width: 306px;
  height: 59px;
  margin-top: 1.5vw;
}

.bkdiv2 {
  margin-left: 2vw;
  border: 3px solid #0ba1f8;
  width: 548px;
  height: 59px;
  margin-top: 1.5vw;
  background-color: #4aabfe;
}

.tpsty {
  float: left;
  margin-top: 0.5vw;
  margin-left: 1.5vw;
}

/* /deep/ .el-input__inner {
  height: 59px !important;
  background: transparent !important;
  border: none !important;
  color: #ffffff !important;
  font-family: Alibaba PuHuiTi;
  font-weight: 400 !important;
  font-size: 25px !important;
}
/deep/ .el-input__inner::placeholder {
  color: #fff;
  font-weight: 400 !important;
  font-size: 25px !important;
}

/deep/ .el-input__inner::-webkit-input-placeholder {
  color: #fff !important;
  font-weight: 400 !important;
  font-size: 25px !important;
}

/deep/ .el-input__inner:-moz-placeholder {
  color: #fff !important;
  font-weight: 400 !important;
  font-size: 25px !important;
}

/deep/ .el-input__inner:-ms-input-placeholder {
  color: #fff !important;
  font-weight: 400 !important;
  font-size: 25px !important;
}
/deep/ .el-button {
  border-color: transparent !important;
  background-color: transparent !important;
  width: 100% !important;
  height: 100% !important;
  color: #fff !important;
  font-size: 29px !important;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi-Regular !important;
}

/deep/ .el-checkbox__label {
  color: #fff;
  font-weight: 400 !important;
  font-size: 23px !important;
}
/deep/ .el-checkbox__inner {
  width: 1.4vw;
  height: 1.4vw;
  border: 3px solid #0ba1f8;
  background: #0687cd;
} */

.loginbg {
  height: 100%;
  width: 100%;
  position: absolute;
  /*background-color: #BFD8D2;*/
  /*background-image: url(../../imges/login/背景.jpg);*/
  background-image: url("../../imges/login/背景.jpg") ;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  top: 0;
  left: 0;
  z-index: -1;
}
</style>
