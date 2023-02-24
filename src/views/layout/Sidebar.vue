<template>

  <div>

    <el-menu ref="main2" model="vertical" unique-opened theme="dark" :default-active="$route.path" active-text-color="#409EFF">
      <!-- <sidebar-item :routes='permissionMenus'></sidebar-item> -->
      <sidebar-item :routes='menus' @bigTitle="bigTitle" @smallTitle="smallTitle" @changeishow="changeishow"></sidebar-item>
    </el-menu>

  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
import {
  getMenuListByLSID
} from "../../api/kcglApi/jsglAx";

import Cookies from 'js-cookie';
// import {
//   getCbdList, getCbdDetail
// } from '../../api/cbdApi/cbdAx'

export default {
  data () {
    return {
      ishow: false,
      isCollapse: true,
      s2: '',
      s3: '',
      // LSID:"",
      LSID: localStorage.getItem("pid"),
      menus: [],
      ss2: "",
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'permissionMenus'
    ]),
    // isCollapse () {
    //   return !this.sidebar.opened
    // }
  },
  methods: {
    changeishow () {
      // alert(333)
      this.$emit('hiddlen');
    },
    handleOpen () {
      console.log(key, keyPath);
    },

    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },

    fatherMethod () {
      if (this.menus != "" && this.menus != null && this.menus != undefined) {
        //this.$router.replace('/pcsqgl')
        console.log("this.menus[0].chlist[0].slink:" + this.menus[0].chlist[0].slink);
        // this.$router.replace(this.menus[0].chlist[0].slink)

      } else {
        // this.$router.replace("/jsgl/zwqx")
        // console.log("暂无权限");
      }

    },

    fatherMethod2 (x) {
      //快捷通道

    },
    handleSelect (key, keyPath) {
      //console.log(key,keyPath);
    },
    getMenu () {
      console.log('localStorage.getItem("pid")', localStorage.getItem("pid"))
      let cs = {
        // LSID: this.LSID,
        LSID: localStorage.getItem("pid"),
      };
      getMenuListByLSID(cs).then((res) => {
        console.log('%c [ getMenuListByLSID ]-366-「e:/jiading/littlewish/littlewish-back/src/views/layout/Sidebar」', 'font-size:13px; background:#2d70fd; color:#71b4ff;', res)
        this.menus = res.data.outmap.list;
        if (this.menus != "" && this.menus != null && this.menus != undefined) {
          //this.$router.replace('/pcsqgl')
          // this.$router.replace(this.menus[0].chlist[0].slink);
        } else {
          // this.$router.replace("/jsgl/zwqx");
        }
      });
    },
    cre1 () {
      var that = this;
      this.ss2 = setInterval(function () {
        that.LSID = localStorage.getItem("No");
        that.LSID = '1980001';

        if (that.LSID != null && that.LSID != undefined && that.LSID != "") {
          that.cre2();
        }
      }, 1000);
    },
    cre2 () {
      clearInterval(this.ss2);
      this.getMenu();
    },
    bigTitle (bigTitle) {
      this.$emit('bigTitle', bigTitle)
    },
    smallTitle (smallTitle) {
      this.$emit('smallTitle', smallTitle)
    }
  },
  mounted () {
    window.fatherMethod = this.fatherMethod;
    window.fatherMethod2 = this.fatherMethod2;
    window.getList = this.getList;
  },
  created () {
    this.cre1();
  },

}

</script>
<style scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 45px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
}
.sidebar-title {
  display: inline-block;
  margin: 0;
  color: #fff;
  font-weight: 600;
  line-height: 50px;
  font-size: 14px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
}
*,
*:before,
*:after {
  box-sizing: initial !important;
}
</style>


<style scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
}
.sidebar-title {
  display: inline-block;
  margin: 0;
  color: #fff;
  font-weight: 600;
  line-height: 50px;
  font-size: 14px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
}
*,
*:before,
*:after {
  box-sizing: initial !important;
}

/deep/ .el-submenu__title:hover {
  background-color: #63B184;
  color: white;
  font-size: 13px;
}

/deep/ .el-submenu__title:hover i {
  color: white !important;
}

/deep/ .el-menu-item {
  color: #6e7173;
  font-size: 12px;
}

/deep/ .el-menu {
  background-color: white;
  border-right: none;
}

/deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px !important;
  min-height: 400px !important;
}
</style>
