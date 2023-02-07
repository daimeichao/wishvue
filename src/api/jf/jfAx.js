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
//商品列表
export const splist = params => {
  return ax.pJson(URL + "/jf/splist", params);
};
//新增商品
export const addsp = params => {
  return ax.pJson(URL + "/jf/addsp", params);
};
//修改商品
export const updsp = params => {
  return ax.pJson(URL + "/jf/updsp", params);
};
//删除商品
export const delsp = params => {
  return ax.pJson(URL + "/jf/delsp", params);
};
//商品详情
export const spById = params => {
  return ax.pJson(URL + "/jf/spById", params);
};
