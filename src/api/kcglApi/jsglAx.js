import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;

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
export const getJSXQ = params => {
    return ax.pJson(URL + "/jbgs/back/qxgl/getJSXQ", params);
};
//修改角色
export const updJS = params => {
    return ax.pJson(URL + "/jbgs/back/qxgl/updJS", params);
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

export const getXmlxList = params => {
    return ax.pJson(URL + "/xmlx/getXmlxList", params);
};

export const updateXmlx = params => {
    return ax.pJson(URL + "/xmlx/updateXmlx", params);
};

export const addXmlx = params => {
    return ax.pJson(URL + "/xmlx/addXmlx", params);
};

export const getRylbList = params => {
    return ax.pJson(URL + "/xmlx/getRylbList", params);
};

export const updateRylb = params => {
    return ax.pJson(URL + "/xmlx/updateRylb", params);
};

export const addRylb = params => {
    return ax.pJson(URL + "/xmlx/addRylb", params);
};