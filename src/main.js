// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/index.css';

//引入兼容
import 'babel-polyfill'

import router from './router'
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import btn from "./components/btn";
Vue.component("btn", btn);
ElementUI.Dialog.props.closeOnClickModal.default = false
import 'babel-polyfill';//支持IE执行原生script

import 'normalize.css/normalize.css';// normalize.css 样式格式化
import 'element-ui/lib/theme-chalk/index.css';
import './assets/custom-theme/index.css'; // 换肤版本element-ui css
import './css/common.css'; // 换肤版本element-ui css
import md5 from 'js-md5';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import vueWaves from './directive/waves';// 水波纹指令

import store from './store';
import config from "../config/config";

import Cookies from 'js-cookie'
import echarts from 'echarts'

import Video from 'video.js'
import 'video.js/dist/video-js.css'
import App from './App'

Vue.prototype.$video = Video

Vue.prototype.$echarts = echarts
Vue.use(vueWaves);
Vue.use(ElementUI)
Vue.use(Vuex);
Vue.use(Vant);

//消息提示  1成功 0 危险 2 警告
Vue.prototype.$msg = (type, title, time) => {
  let t = ""; //默认消息
  let duration = (time == null || time == undefined) ? 3000 : time
  if (type == 1) {
    t = "success";
    if (title == null || title == undefined) {
      title = "操作成功！";
    }
    // title = "操作成功！";
  } else if (type == 2) {
    t = "warning";
    if (title == null || title == undefined) {
      title = "操作失败！";
    }
    // title = "操作失败！";
  } else if (type == 0) {
    t = "error";
    if (title == null || title == undefined) {
      title = "操作失败！";
    }
    // title = "操作失败！";
  }
  Vue.prototype.$message({
    message: title,
    type: t,
    duration: duration,
  });
},

  // router.beforeEach((to, from, next) => {
  //   if (to.path !== '/') {
  //     if (localStorage.getItem("hbouser")) {
  //       // getKey({key: getToken()}).then((res) => {
  //       //   if(!res.result) {
  //       //     next('/');
  //       //   } else {
  //       //     setKeyExpire({key: getToken(), expireTime: 1800});
  //       //   }
  //       // });
  //       next()
  //     } else {
  //       next('/');
  //     }
  //   }
  //   next();
  // });

  router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('yhm');  // 获取token
    if (token) {     // 如果token不为null 就放行，如果为空 就不放行
      next();
    } else {
      if (to.path === '/' || to.path === '/login') {  // 在为空的情况下，我们路由跳转的是'/' 就放行。'/'代表我们登录页
        next()
      } else {           // 在为空的情况下，访问的不是'/'， 就直接跳转到'/'
        next({
          path: '/'
        })
      }
    }
  })



// store.dispatch('getMenus')//获取用户菜单
// store.dispatch('getButtons')//获取用户按钮菜单

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

