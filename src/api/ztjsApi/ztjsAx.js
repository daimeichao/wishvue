import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;

//添加展厅介绍
export const addConfig = params => {
  return ax.pJson(URL + "/sfqx/config/addConfig", params);
};

//删除展厅介绍
export const delConfig = params => {
  return ax.pJson(URL + "/sfqx/config/delConfig", params);
};
//删除展厅介绍list
export const delConfigList = params => {
  return ax.pJson(URL + "/sfqx/config/delConfigList", params);
};
//修改展厅介绍
export const editConfig = params => {
  return ax.pJson(URL + "/sfqx/config/editConfig", params);
};
//获取展厅介绍
export const getConfigList = params => {
  return ax.pJson(URL + "/sfqx/config/getConfigList", params);
};

