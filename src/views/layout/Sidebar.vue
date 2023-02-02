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
      menus: [
        // {
        //   sid: 'qxgl',
        //   sname: '权限管理',
        //   slink: '/qxgl',
        //   // sdesc:'./static/new/0.png',
        //   // sdesc2:'../../../static/new/0o.png',
        //   chlist: [
        //     {
        //       sid: 'jswh',
        //       sname: '角色维护',
        //       slink: '/qxgl/jswh',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //     {
        //       sid: 'sbtj',
        //       sname: '老师角色',
        //       slink: '/qxgl/lsjs',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //   ]

        // },
        // {
        //   sid: 'sb',
        //   sname: '设备管理',
        //   slink: '/sb',
        //   // sdesc:'./static/new/0.png',
        //   // sdesc2:'../../../static/new/0o.png',
        //   chlist: [
        //     {
        //       sid: 'sblb',
        //       sname: '设备列表',
        //       slink: '/sb/sblb',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //     {
        //       sid: 'sbtj',
        //       sname: '设备添加',
        //       slink: '/sb/sbtj',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //   ]

        // },



        // {
        //   sid: 'jcxx',
        //   sname: '基础信息维护',
        //   slink: '/jcxx',
        //   chlist: [
        //     {
        //       sid: 'lx',
        //       sname: '设备类型维护',
        //       slink: '/jcxx/lx',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //     {
        //       sid: 'cj',
        //       sname: '厂家维护',
        //       slink: '/jcxx/cj',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //   ]

        // },


        // {
        //   sid: 'sbfz',
        //   sname: '设备分组管理',
        //   slink: '/sbfz',
        //   // sdesc:'./static/new/0.png',
        //   // sdesc2:'../../../static/new/0o.png',
        //   chlist: [
        //     {
        //       sid: 'sbfzlb',
        //       sname: '设备分组列表',
        //       slink: '/sbfz/sbfzlb',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //   ]

        // },
        // {
        //   sid: 'zdyfz',
        //   sname: '自定义分组',
        //   slink: '/zdyfz',
        //   chlist: [
        //     {
        //       sid: 'zdyfzlb',
        //       sname: '自定义分组列表',
        //       slink: '/zdyfz/list',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //   ]

        // },
        // {
        //   sid: 'rzgl',
        //   sname: '日志管理',
        //   slink: '/rzgl',
        //   chlist: [
        //     {
        //       sid: 'xtczrz',
        //       sname: '系统操作日志',
        //       slink: '/rzgl/xtczrz',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //     {
        //       sid: 'sbyxrz',
        //       sname: '设备运行日志',
        //       slink: '/rzgl/sbyxrz',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //   ]
        // },
        // {
        //   sid: 'lbsb',
        //   sname: '录播设备管理',
        //   slink: '/lbsb',
        //   chlist: [
        //     {
        //       sid: 'equipmentList',
        //       sname: '录播设备列表',
        //       slink: '/lbsb/equipmentList',
        //       sdesc: require('../../imges/4.png'),
        //     }
        //   ]
        // },
        // {
        //   sid: 'opc',
        //   sname: '在线巡课',
        //   slink: '/opc',
        //   chlist: [
        //     {
        //       sid: 'opcList',
        //       sname: '在线巡课',
        //       slink: '/opc/liveCourseList',
        //       sdesc: require('../../imges/4.png'),
        //     }
        //   ]
        // },
        // {
        //   sid: 'teacherCourse',
        //   sname: '教师课表',
        //   slink: '/teacherCourse',
        //   chlist: [
        //     {
        //       sid: 'teacherTimetable',
        //       sname: '教师课表',
        //       slink: '/teacherCourse/teacherTimetable',
        //       sdesc: require('../../imges/4.png'),
        //     }
        //   ]
        // },
        // {
        //   sid: 'videoAdmin',
        //   sname: '视频管理',
        //   slink: '/videoAdmin',
        //   chlist: [
        //     {
        //       sid: 'videoList',
        //       sname: '视频管理',
        //       slink: '/videoAdmin/videoList',
        //       sdesc: require('../../imges/4.png'),
        //     }
        //   ]
        // },
        // {
        //   sid: 'liveAdmin',
        //   sname: '直播课程管理',
        //   slink: '/liveAdmin',
        //   chlist: [
        //     {
        //       sid: 'liveCourseList',
        //       sname: '直播课程管理',
        //       slink: '/liveAdmin/liveCourseList',
        //       sdesc: require('../../imges/4.png'),
        //     }
        //   ]
        // },

        // {
        //   sid: 'jsgl',
        //   sname: '教室管理',
        //   slink: '/jsgl',
        //   chlist: [
        //     {
        //       sid: 'jslb',
        //       sname: '教室列表',
        //       slink: '/jsgl/list',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //     // {
        //     //   sid: 'cj',
        //     //   sname: '厂家维护',
        //     //   slink: '/jcxx/cj',
        //     //   sdesc: require('../../imges/4.png'),
        //     // },
        //   ]

        // },
        // {
        //   sid: 'znmjgl',
        //   sname: '智能门禁管理',
        //   slink: '/znmjgl',
        //   chlist: [
        //     {
        //       sid: 'mjsbgl',
        //       sname: '门禁设备管理',
        //       slink: '/znmjgl/mjsbgl',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //     {
        //       sid: 'mjjkgl',
        //       sname: '门禁监控管理',
        //       slink: '/znmjgl/mjjkgl',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //     {
        //       sid: 'mjrzgl',
        //       sname: '门禁日志管理',
        //       slink: '/znmjgl/mjrzgl',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //     {
        //       sid: 'mjqxgl',
        //       sname: '门禁权限管理',
        //       slink: '/znmjgl/mjqxgl',
        //       sdesc: require('../../imges/4.png'),
        //     },
        //   ]

        // },
        // // {
        // //   sid: 'zdyfz',
        // //   sname: '自定义分组',
        // //   slink: '/zdyfz',
        // //   chlist: [
        // //     {
        // //       sid: 'zdyfz',
        // //       sname: '自定义分组列表',
        // //       slink: '/zdyfz/list',
        // //       sdesc: require('../../imges/4.png'),
        // //     },
        // //   ]

        // // },
      ],

      // menus: [
      //    {
      //     sid: 'kcgl',
      //     sname: '课程管理',
      //     slink: '/kcgl',
      //     sdesc: require('../../imges/6.png'),
      //     chlist: [

      //       {
      //         sid: 'kcgj',
      //         sname: '课程共建',
      //         slink: '/kcgl/kcgj',
      //         sdesc: require('../../imges/4.png'),
      //       },
      //       {
      //         sid: 'zjgl',
      //         sname: '课程管理',
      //         slink: '/kcgl/zjgl',
      //         sdesc: require('../../imges/4.png'),
      //       },
      //     ]
      //   },

      //   ]
      // }
      // menus:[],
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
  background-color: #0061ac;
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
