import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;

//获取项目列表
export const getXmList = params => {
  return ax.pJson(URL + "/jbgs/back/jbgsgl/getXmlist", params);
};

//获取项目详情
export const getXmInfo = params => {
  return ax.pJson(URL + "/xm/get", params);
};

//添加项目
export const addXm = params => {
  return ax.pJson(URL + "/jbgs/back/jbgsgl/addXm", params);
};

//编辑项目
export const editXm = params => {
  return ax.pJson(URL + "/jbgs/back/jbgsgl/editXm", params);
};

//修改项目信息
export const updXmInfo = params => {
  return ax.pJson(URL + "/jbgs/back/jbgsgl/updXmInfo", params);
};

//获取揭榜人列表
export const getJbrList = params => {
  return ax.pJson(URL + "/jbgs/back/jbgsgl/getJbrList", params);
};

//获取项目类型列表
export const getXmlxList = params => {
  return ax.pJson(URL + "/jbgs/back/jbgsgl/getXmlxList", params);
};

//添加项目类型列表
export const addXmlx = params => {
  return ax.pJson(URL + "/jbgs/back/jbgsgl/addXmlx", params);
};

//修改项目类型信息
export const updXmlxInfo = params => {
  return ax.pJson(URL + "/jbgs/back/jbgsgl/updXmlxInfo", params);
};

//根据项目id查询揭榜人列表
export const getJbrListByXmid = params => {
  return ax.pJson(URL + "/jbgs/back/jbgsgl/getJbrListByXmid", params);
};

//导出揭榜人名单
export const exportExcel = params => {
  return ax.pJson(URL + "/ExportExcel/exportExcel", params);
};

//导出揭榜人名单
export const delJbxmbyYhid = params => {
  return ax.pJson(URL + "/xmlx/delJbxmbyYhid", params);
};

//获取所有项目类型
export const getXmlxTree = params => {
  return ax.pJson(URL + "/xmlx/getXmlxTree", params);
};

//获取用户信息
export const getUserById = params => {
  return ax.pJson(URL + "/user/get2", params);
};