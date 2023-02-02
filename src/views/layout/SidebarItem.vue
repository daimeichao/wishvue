<template>
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
              <div class='1' style="background-color: #E1F2FF;">
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
      
      active: "",
      img1: require('../../imges/1.png'),
      img2: require('../../imges/4.png'),
      bigTitle: '',
      smallTitle: ''
    }
  },
  methods: {
    check_login () {



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
  background-color: #e1f2ff !important;
}
.el-menu .el-menu--inline {
  background-color: #ecf3f9 !important;
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

