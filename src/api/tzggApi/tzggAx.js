import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;

//添加通知公告
export const addTzgg = params => {
  return ax.pJson(URL + "/sfqx/tzgg/addTzgg", params);
};

//删除通知公告
export const delTzgg = params => {
  return ax.pJson(URL + "/sfqx/tzgg/delTzgg", params);
};
//删除通知公告list
export const delTzggList = params => {
  return ax.pJson(URL + "/sfqx/tzgg/delTzggList", params);
};
//修改通知公告
export const editTzgg = params => {
  return ax.pJson(URL + "/sfqx/tzgg/editTzgg", params);
};
//获取通知公告列表
export const getTzggList = params => {
  return ax.pJson(URL + "/sfqx/tzgg/getTzggList", params);
};
//通知公告信息
export const getTzById = params => {
  return ax.pJson(URL + "/sfqx/tzgg/getTzById", params);
};


