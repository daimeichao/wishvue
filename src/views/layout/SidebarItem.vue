<template>
  <div>
    <div style="width: 100%;height: 4vw;background-color:white">
      <img  style="background-color:white;
            height: 4vw;
            width: 4vw;
            margin-top: -1vw;
            margin-right:6vw;
            float: right;
            background-size: 100%
          " src="../../imges/yhm_01.png"/>
      <div
        style="
            color: #999191;
            margin-left: -0.5vw;
            margin-top: 1vw;
            margin-bottom: 1vw;
           font-size: 20px;
           font-weight: 400;
           text-align: center;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;">
        {{ name }}
      </div>
    </div>
  <div class='menu-wrapper' style="background-color: white;

	">
    <template v-for="item in routes">
      <el-submenu :index="item.sid" :key="item.sname" @click.native="openBig(item.sname)">
        <template slot="title">
          <i :class="item.sdesc"></i>
          <span style=" font-family: Microsoft YaHei, Microsoft YaHei-Regular;">{{item.sname}}</span>
        </template>

        <!-- <el-menu-item-group> -->
        <template v-for="child in item.chlist">
          <div style="cursor:pointer;" @click="handleClick(child.sid,child.slink,child.sname,item.sname)" v-if="child.slink!=null" :key="child.sname">

            <el-menu-item :index="'/'+item.sid+'/'+child.sid">
              <div class='1' style="background-color: #e1fff1;color:#1D7E4D">
                <i :class="child.sdesc"></i>
                <span class=''>{{child.sname}}</span>
              </div>
            </el-menu-item>

          </div>
        </template>
        <!-- </el-menu-item-group> -->
      </el-submenu>
    </template>
  </div>
  </div>
</template>

<script>
import md5 from 'js-md5';
import timeoutVue from '../../components/timeout/timeout.vue';
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
  data () {
    return {
      name: "",
      ss2: "",
      active: "",
      img1: require('../../imges/1.png'),
      img2: require('../../imges/4.png'),
      bigTitle: '',
      smallTitle: ''
    }
  },
  created() {
    var that = this;
    this.cre1();
  },
  methods: {
    check_login () {



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
    handleClick (sid, link, name, fname) {
      // alert(333)
      this.childMethod();

      this.smallTitle = name
      this.$emit('smallTitle', this.smallTitle)
      this.$emit('bigTitle', fname)
      this.active = sid;
      console.log("active" + this.active);
      if (sid == 'bxgllb') {
        // 211.80.233.116:8089/zcyw/f/api/loginSingle?userid=1980001&key=64c902e771b64236a1ae6267dd2e43fa
        var userid = localStorage.getItem('No');
        var md5uid = md5(userid);
        console.log('http://211.80.233.116:8090/zcyw/f/api/loginSingle?userid=' + userid + '&key=' + md5uid);

        window.open('http://211.80.233.116:8090/zcyw/f/api/loginSingle?userid=' + userid + '&key=' + md5uid);
        return;
        // this.$router.go(-1);
      } else {
        this.$router.push(link);
      }

    },
    openBig (name) {
      this.bigTitle = name
      this.$emit('bigTitle', this.bigTitle)
    },
    childMethod() {
        // alert(666)
        this.$emit('changeishow');
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.el-menu-item {
  background-color: #e1fff1 !important;
}
.el-menu .el-menu--inline {
  background-color: #e1fff1 !important;
}
//菜单关闭
>>> .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  -webkit-transform: rotateZ(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotateZ(-90deg);
}
/deep/ .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  -webkit-transform: rotateZ(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotateZ(-90deg);
}
//菜单展开
>>> .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
  -webkit-transform: rotateZ(0deg);
  -ms-transform: rotate(0deg);
  transform: rotateZ(0deg);
}
/deep/ .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
  -webkit-transform: rotateZ(0deg);
  -ms-transform: rotate(0deg);
  transform: rotateZ(0deg);
}

>>> .el-submenu__icon-arrow {
  // position: absolute;
  // top: 50%;
  // left: 20px;
  // margin-top: -7px;
  // -webkit-transition: -webkit-transform .3s;
  // transition: -webkit-transform .3s;
  // transition: transform .3s;
  // transition: transform .3s,-webkit-transform .3s;
  font-size: 14px;
  font-weight: bold;
}

/deep/ .el-submenu__icon-arrow {
  // position: absolute;
  // top: 50%;
  // left: 20px;
  // margin-top: -7px;
  // -webkit-transition: -webkit-transform .3s;
  // transition: -webkit-transform .3s;
  // transition: transform .3s;
  // transition: transform .3s,-webkit-transform .3s;
  font-size: 14px;
  font-weight: bold;
}
// .menu-wrapper .el-submenu{
// 	background: url(../../../src/imges/home/bg.png) no-repeat top center;
// 	background-size: 210px 56px;
// }

</style>

