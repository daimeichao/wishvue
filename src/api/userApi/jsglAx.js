import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;





//获取所有的角色（分页）
export const getUserList = params => {
  return ax.pJson(URL + "/user/list", params);
};

//获取所有的角色（不分页）
export const getAllUserList = params => {
    return ax.gJson(URL + "/user/allList", params);
  };
//获取所有的角色
export const getBdxz = params => {
    return ax.gJson(URL + "/xcx/home/bdxz", params);
  };
//获取所有的角色
export const editBdxz = params => {
    return ax.pJson(URL + "/xcx/home/editbdxz", params);
  };
//获取所有的角色
export const getAllXmList = params => {
    return ax.gJson(URL + "/xm/getShzt2AllList", params);
  };


//获取所有的角色
export const getJSlist = params => {
  return ax.pJson(URL + "/jbgs/back/qxgl/getJSlist", params);
};
//获取菜单树
export const getTree = params => {
    return ax.pJson(URL + "/jbgs/back/qxgl/getTree", params);
  };
//新增角色
export const insJS = params => {
    return ax.pJson(URL + "/jbgs/back/qxgl/insJS", params);
};
//角色详情
export const getUserById = params => {
    return ax.gJson(URL + "/user/get", params);
};
//修改角色
export const updateUser = params => {
    return ax.pJson(URL + "/user/update", params);
};
//添加角色
export const addUser = params => {
    return ax.pJson(URL + "/user/addUserFromAdmin", params);
};
//更改角色密码
export const updatePassword = params => {
    return ax.pJson(URL + "/user/updatePassword", params);
};
//更改角色密码
export const updateNowPassword = params => {
    return ax.pJson(URL + "/user/updateNowPassword", params);
};
// //更改角色密码
// export const updatePasswordAndLb = params => {
//     return ax.pJson(URL + "/user/updatePasswordAndLb", params);
// };
//更改类别
export const changeType = params => {
    return ax.pJson(URL + "/user/changeType", params);
};
//授权
export const grantAuthorize = params => {
    return ax.gJson(URL + "/user/grantAuthorize", params);
};
//授权
export const getUserRoleList = params => {
    return ax.gJson(URL + "/user/getUserRoleList", params);
};



//删除角色
export const deteleUser = params => {
    return ax.gJson(URL + "/user/delete", params);
};


//通过角色id获取老师列表
export const getLSlist = params => {
    return ax.pJson(URL + "/jbgs/back/qxgl/getLSlist", params);
};
//角色绑定老师
export const insJSLSS = params => {
    return ax.pJson(URL + "/jbgs/back/qxgl/insJSLSS", params);
};
//角色删除老师
export const delJSLS = params => {
    return ax.pJson(URL + "/jbgs/back/qxgl/delJSLS", params);
};
//角色删除
export const delJS = params => {
    return ax.pJson(URL + "/jbgs/back/qxgl/delJS", params);
};

//获取所有老师
export const getAllTeacher = params => {
    return ax.pJson(URL + "/jbgs/back/qxgl/getAllTeacher", params);
};

//通过老师id获取菜单
export const getMenuListByLSID = params => {
    return ax.pJson(URL + "/jbgs/back/qxgl/getMenuListByLSID", params);
};

//获取所有字段
export const getAllZd = params => {
    return ax.pJson(URL + "/paxy/back/qxgl/getAllZd", params);
};

//获取所有字段
export const ifSH = params => {
    return ax.pJson(URL + "/jbgs/back/qxgl/ifSH", params);
};

