<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <levelbar></levelbar>
      <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>
    </el-menu>
  </div>

</template>

<script>
import {
  mapGetters
} from 'vuex';
import Levelbar from './Levelbar';
import TabsView from './TabsView';
import Hamburger from '../../components/Hamburger';
// import Screenfull from 'components/Screenfull';
import ErrorLog from '../../components/ErrLog';
import errLogStore from '../../store/errLog';
import config from '../../../config/config';
import { getToken, setToken, removeToken, getAllCookie } from '../../util/auth';
import Cookies from 'js-cookie'
export default {
  components: {
    Levelbar,
    TabsView,
    Hamburger,
    ErrorLog,
    // Screenfull
  },
  data () {
    return {
      // log:'0'
      apiUrl: config.apiUrl,
      log: errLogStore.state.errLog,
      imgUrl: require('../../imges/wenhao.png'),
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    tiaozhuan () {
      // this.dialogVisible = true
      this.$router.push({ path: '/sysm/smxq' });
      //window.open(this.apiUrl+'/read.html')
    },
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },


  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  border-right: solid 1px #e6e6e6;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #fff;
  // background-color: #F2F2F3;
}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0 !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .errLog-container {
    display: inline-block;
    position: absolute;
    right: 150px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
