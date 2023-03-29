<template>
  <div v-bind:style="{
    minHeight: minheight,
    backgroundColor: 'rgb(245,245,245)',
    top: '0',
    left: '0',
    position: 'relative',
    width: '100%',
  }">

    <div class="rowClass">
    <el-form ref="roleData" :model="form" :rules="rules" label-width="120px" >
        <el-form-item label="发布人昵称:" prop="wishuserid" style="padding-top: 20px" >
          <el-select  v-model='form.wishuserid' placeholder="请选择昵称(姓名)" clearable @change="getName()">
            <el-option  v-for='item in namelist' :key='item.id'
                        :label="item.nick" :value="item.pid"></el-option>
          </el-select>
        </el-form-item>
<!--      新增许愿人姓名-->
      <el-form-item label="许愿人姓名:" prop="wishusername">
        <el-input v-model="form.wishusername" placeholder="姓名" clearable style="width: 50%">
        </el-input>
      </el-form-item>
      <el-form-item label="许愿人地址:" prop="adder">
          <el-input v-model="form.adder" placeholder="请输入" maxlength="200" clearable style="width: 50%">
          </el-input>
        </el-form-item>
      <el-form-item label="许愿时间:" prop="wish_time">
        <el-date-picker
          v-model="form.wish_time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="心愿内容:" prop="seats_total">
          <el-input  type="textarea"
                     :autosize="{ minRows: 2, maxRows: 4}" v-model="form.wish_content" placeholder="" maxlength="255" style="width: 50%"></el-input>
        </el-form-item>
    </el-form>
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
            " @click="reset()">
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
            " @click="onSubmit('roleData')" v-if="type == 1">
      <div style="">提交</div>
    </button></span>
    </div>
    </div>
</template>

<script>
  import {
    getname,
    addWish1,
  } from "../../api/xygl/xyglAx";
  export default {
    data () {

      return {
        minheight:'',
        namelist:[],
        nicklist:[],
        Input: "",
        title: "",
        type: 1,
        labelPosition: "right",
        form: {
          wishuserid:"",
          wishusername:"",
          adder:'',
          wish_content:'',
        },

        // minHeight:"",
        total: 0,
        rules: {
          wishusername: [
            { required: true, message: "请输入许愿人姓名", trigger: "blur" },
          ],
          wishuserid: [
            { required: true, message: "请选择发布人昵称", trigger: "blur" },
          ],
          wish_content: [
            { required: true, message: "请输入许愿内容", trigger: "blur" },
          ],
          adder: [
            { required: true, message: "请输入地址", trigger: "blur" },
          ],
          wish_time: [
            { required: true, message: "请选择许愿时间", trigger: "blur" },
          ],
        },
        name:'',//昵称
      };
    },
    methods: {
      filterTime(time) {
        var date = new Date(time);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        var h = date.getHours();
        h = h < 10 ? "0" + h : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var s = date.getSeconds();
        s = s < 10 ? "0" + s : s;
        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + s;
      },
      onSubmit (formName) {
        this.form.operatorid=localStorage.getItem("pid");
        this.form.wish_time=this.filterTime(this.form.wish_time)
        console.log("add form",this.form)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm("是否新增心愿?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                addWish1(this.form).then((res) => {

                  if (res.status=="success") {
                    this.$message({
                      type: "success",
                      message: "新增成功!",
                    });
                    this.form.adder="";
                    this.form.wish_content="";
                    this.form.wishusername="";
                    this.form.wish_time="";
                    this.form.wishuserid="";
                  } else {
                    this.$message({
                      type: "error",
                      message: "新增失败!",
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
      getname(){

        getname().then((res) => {
          this.namelist=res.name;
        })},
      //查找名字
    getName(){
        for(let i=0;i<this.namelist.length;i++){
          if(this.namelist[i].pid === this.form.wishuserid){
            this.form.wishusername = this.namelist[i].name;
          }
        }

    },
reset(){
        this.form.wishuserid='';
        this.form.wishusername="";
        this.form.wish_content="";
        this.form.adder="";
        this.form.wish_time=""
}
    },

    //初始渲染
    created () {
      this.getname();
    },
  };
</script>

<style>
  .el-table_6_column_44 el-table__cell {
    width: 160px;
  }
</style>
