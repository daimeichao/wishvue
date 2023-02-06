import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;
//查询积分列表，审核状态为条件，待审核列表和积分列表
export const jflist = params => {
  return ax.pJson(URL + "/jf/jflist", params);
};
//删除积分者
export const delById = params => {
  return ax.pJson(URL + "/jf/delById", params);
};
//积分详情
export const getById = params => {
  return ax.pJson(URL + "/jf/getById", params);
};
//积分信息修改
export const updById = params => {
  return ax.pJson(URL + "/jf/updById", params);
};
