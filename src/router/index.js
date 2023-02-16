import Vue from "vue";
import Router from "vue-router";
const _import = require("./_import_" + process.env.NODE_ENV);

/* layout */
import layout from "../views/layout/layout";
import login from "../views/login/login";

Vue.use(Router);

// 获取原型对象上的push函数
const originalPush = Router.prototype.push
// 修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: "/",
      component: login,
      name: "登录页"
    },
    {
      path: "/xygl/xylist",
      component: layout,
      name: "",
      children: [
        {
          path: "/",
          name: "首页",
          component: _import("xygl/xylist")
        }
      ]
    },
    {
      path: "/xtgl",
      component: layout,
      name: "",
      children: [
        {
          path: "xgmm",
          name: "修改密码",
          component: reslove => require(["@/views/xtgl/xgmm"], reslove)
        },
        {
          path: "jsgl",
          name: "角色管理",
          component: reslove => require(["@/views/xtgl/jsgl"], reslove)
        },
        {
          path: "yhgl",
          name: "用户管理",
          component: reslove => require(["@/views/xtgl/yhgl"], reslove)
        },
        {
          path: "lbtgl",
          name: "banner管理",
          component: reslove => require(["@/views/xtgl/lbtgl"], reslove)
        }
      ]
    },
    {
      path: "/yhglm",
      component: layout,
      name: "",
      children: [
        {
          path: "yhlb",
          name: "用户列表",
          component: reslove => require(["@/views/yhglm/yhlb"], reslove)
        }
      ]
    },
    {
      path: "/redirect",
      // component: _import('redirect/redirect/index'),
      component: reslove =>
        require(["@/views/redirect/redirect/index"], reslove),
      name: "跳转"
    },

{
  path: "/xtgl",
    component: layout,
  name: "",
  children: [
  {
    path: "xgmm",
    name: "修改密码",
    component: reslove => require(["@/views/xtgl/xgmm"], reslove)
  },
  {
    path: "jsgl",
    name: "角色管理",
    component: reslove => require(["@/views/xtgl/jsgl"], reslove)
  },
  {
    path: "yhgl",
    name: "用户管理",
    component: reslove => require(["@/views/xtgl/yhgl"], reslove)
  },
  {
    path: "yhgl",
    name: "banner管理",
    component: reslove => require(["@/views/xtgl/yhgl"], reslove)
  },],},
  {
    path: "/xygl",
    component: layout,
    name: "",
    children: [
      {
        path: "xylist",
        name: "心愿列表",
        component: reslove => require(["@/views/xygl/xylist"], reslove)
      },
      {
        path: "wylb",
        name: "完愿列表",
        component: reslove => require(["@/views/xygl/wylb"], reslove)
      },
      {
        path: "fbxy",
        name: "发布心愿",
        component: reslove => require(["@/views/xygl/fbxy"], reslove)
      },
      {
        path: "sxxysh",
        name: "实现心愿审核",
        component: reslove => require(["@/views/xygl/sxxysh"], reslove)
      }
      ,
      {
        path: "fbxysh",
        name: "发布心愿审核",
        component: reslove => require(["@/views/xygl/fbxysh"], reslove)
      }]},
    {
      path: "/zyzgl",
      component: layout,
      name: "",
      children: [
        {
          path: "zyzlist",
          name: "志愿者列表",
          component: reslove => require(["@/views/zyzgl/zyzlist"], reslove)
        },
        {
          path: "zyzsh",
          name: "志愿者审核",
          component: reslove => require(["@/views/zyzgl/zyzsh"], reslove)
        },
      ]
    },
    {
      path: "/jfgl",
      component: layout,
      name: "",
      children: [
        {
          path: "jflist",
          name: "积分列表",
          component: reslove => require(["@/views/jfgl/jflist"], reslove)
        },
        {
          path: "jfphb",
          name: "积分排行榜",
          component: reslove => require(["@/views/jfgl/jfphb"], reslove)
        },
      ]
    },
    {
    path: "/goods",
  component: layout,
  name: "",
  children: [
  {
    path: "spgl",
    name: "商品列表",
    component: reslove => require(["@/views/goods/spgl"], reslove)
  },
]
},

]});
