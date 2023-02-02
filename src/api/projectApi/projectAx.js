import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;

// //查询表t_xmjbxx
// export const getlist = params => {
//   return ax.pJson(URL + "/app/project/getlist", params);
// };

// //添加
// export const addproject = params => {
//   return ax.pJson(URL + "/app/project/addproject", params);
// };

// //更新
// export const updateproject = params => {
//   return ax.pJson(URL + "/app/project/updateproject", params);
// };

// //删除
// export const delbypid = params => {
//   return ax.pJson(URL + "/app/project/delbypid", params);
// };

// //签约入库
// export const sfqyrk = params => {
//   return ax.pJson(URL + "/app/project/sfqyrk", params);
// };

// //根据id获得详情
// export const getByPid = params => {
//   return ax.pJson(URL + "/app/project/getByPid", params);
// };

export const login = params => {
  return ax.pJson(URL + "/jbgs/login/login", params);
};
export const getYzm = params => {
  return ax.gJson(URL + "/jbgs/login/getCaptcha/"+ params);
};