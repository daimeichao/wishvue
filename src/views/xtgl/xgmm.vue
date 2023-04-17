<template>
  <div v-bind:style="{
    minHeight: minheight,
    top: '0',
    left: '0',
    position: 'relative',
    width: '100%',
  }">
    <el-row class="rowClass" style="width: 98.1%">
      <el-col :span="24">

        <el-col :span="12">
          <div style="
              background-color: white;
              height: 70vh;
              width: 100%;
              padding-top: 1.8vw;
            ">
            <div>
              <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="200px">
                <el-form-item label="旧密码：" prop="oldPass">
                  <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="pass">
                  <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="checkPass">
                  <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="button-container">
                  <el-button style="background-color: rgb(0, 97, 172);color: #FFFFFF;"  @click.prevent="submitForm('ruleForm')">
                    确定
                  </el-button>
                  <el-button icon="el-icon-refresh" style="background-color: #63B184;color: #FFFFFF" @click.prevent="resetPsw()">
                    重置
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>

        <el-col :span="11">
          <div style="height: 70vh"></div>
        </el-col>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {updateNowPassword} from "../../api/userApi/jsglAx";
import md5 from 'js-md5';

export default {
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      minheight: '',
      ruleForm: {},
      rules: {
        oldPass: [{ required: true, message: '请输入旧密码', trigger: 'blur' },],
        pass: [{ required: true, message: '请输入新密码', trigger: 'blur' },],
        checkPass: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }]
      },
    };
  },
  created () {
  },
  methods: {

    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    getHeight (x) {
      this.minheight = window.innerHeight - 63 + "px";
    },
    //修改密码
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认修改?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            let params = {
              pid: localStorage.getItem("No") == null ? "" : localStorage.getItem("No"),
              // password: md5(this.ruleForm.xcxPass),
              oldPassWord: md5(this.ruleForm.oldPass),
              password: md5(this.ruleForm.pass),
            }
            console.log("params", params)
            updateNowPassword(params).then(res => {
              if (res.status == 'success') {
                if (res.data.outmap.status == "success") {
                  this.$message.success("密码修改成功")
                  // this.ruleForm.xcxPass=''
                  this.ruleForm = {}
                } else {
                  this.$message.error(res.data.outmap.msg)
                }
              } else {
                this.$message.error("服务器错误，请联系管理员!")
              }

            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        } else {
          return false;
        }
      });
    },
    resetPsw(){
      this.ruleForm={}
    }
  }
}
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

/*/deep/ .el-textarea__inner {*/
/*  font-size: 1vw;*/
/*  height: 6vw;*/
/*  color: black;*/
/*}*/

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

/deep/ .el-table th > .cell {
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
</style>
