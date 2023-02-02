// import {
// 	loginByEmail,
// 	logout,
// 	getInfo,
// 	getMenus,
// 	getRoleCode
// } from 'api/login';
// import { getUserButtonsList, getUserMenusList } from '../../api/userApi/userAx';
// import {
//   getMenuToUser,
//   getUserInfoByCount
// } from '../../api/loginApi/loginAx';
import {
  getToken,
  setToken,
  removeToken
} from '../../util/auth';
import config from "../../../config/config";
import { Form } from 'element-ui';
import md5 from 'js-md5';
import Cookies from 'js-cookie';

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    // token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    menus: undefined,
    eleemnts: undefined,
    permissionMenus: undefined,
    permissionButtons: undefined,
    setting: {
      articlePlatform: []
    },
    username: '',
    rolecode: '',
    id: '',
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus;
    },
    SET_ELEMENTS: (state, elements) => {
      state.elements = elements;
    },
    LOGIN_SUCCESS: () => {
    },
    LOGOUT_USER: state => {
      state.user = '';
    },
    SET_PERMISSION_MENUS: (state, permissionMenus) => {
      state.permissionMenus = permissionMenus;
    },
    SET_PERMISSION_BUTTONS: (state, permissionButtons) => {
      state.permissionButtons = permissionButtons;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_ROLECODE: (state, rolecode) => {
      state.rolecode = rolecode;
    },
    SET_ID: (state, id) => {
      state.id = id;
    }
  },

  actions: {

    getUserInfo ({ commit }) {
    },

    // 获取用户信息
    getMenus ({ commit }) {

      let cs = {
        LSID: localStorage.getItem("No")
      };
      getUserMenusList(cs).then(res => {
        // console.log(res)
        let data = []
        let menus = res.data.outmap.data;
        if (menus) {
          for (var i = 0; i < menus.length; i++) {
            var menu = {
              sid: menus[i].SID,
              sname: menus[i].CDMC,
              slink: menus[i].CDLJ,
              sdesc: menus[i].CDYS,
              sdescon: menus[i].CDONYS,
              chlist: []
            }
            var chlist = menus[i].children
            var chlist1 = []
            if (chlist) {
              for (var j = 0; j < chlist.length; j++) {
                if (chlist[j].children) {
                  if (chlist[j].children[0].SID) {
                    var menu1 = {
                      sid: chlist[j].SID,
                      sname: chlist[j].CDMC,
                      slink: chlist[j].CDLJ,
                      son: []
                    }
                    var chlist2 = chlist[j].children
                    var chlist3 = []
                    if (chlist2) {
                      for (var k = 0; k < chlist2.length; k++) {
                        var menu2 = {
                          sid: chlist2[k].SID,
                          sname: chlist2[k].CDMC,
                          slink: chlist2[k].CDLJ,
                        }
                        chlist3.push(menu2)
                      }
                    }
                    menu1.son = chlist3
                  } else {
                    var menu1 = {
                      sid: chlist[j].SID,
                      sname: chlist[j].CDMC,
                      slink: chlist[j].CDLJ,
                    }
                  }
                } else {
                  var menu1 = {
                    sid: chlist[j].SID,
                    sname: chlist[j].CDMC,
                    slink: chlist[j].CDLJ,
                  }
                }
                chlist1.push(menu1)


              }
              menu.chlist = chlist1
            }
            data.push(menu)
          }
        }
        //console.log(data)
        commit('SET_PERMISSION_MENUS', data);
      })

    },
    getButtons ({ commit }) {
      let cs = {
        USERID: localStorage.getItem("No")
      };
      getUserButtonsList(cs).then(res => {
        // console.log(res.data.outmap)
        let data = []
        if (res.data.outmap.list) {
          data.push(...res.data.outmap.list)
        }
        commit('SET_PERMISSION_BUTTONS', data);
      })
    },

  }
};

export default user;
