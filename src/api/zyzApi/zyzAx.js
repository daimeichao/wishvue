import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;
//查询志愿者列表，审核状态为条件，待审核列表和志愿列表
export const zyzlist = params => {
  return ax.pJson(URL + "/zyz/shlist", params);
};
//删除志愿者
export const delById = params => {
  return ax.pJson(URL + "/zyz/delById", params);
};
//志愿详情
export const getById = params => {
  return ax.pJson(URL + "/zyz/getById", params);
};
//审核志愿者
export const shById = params => {
  return ax.pJson(URL + "/zyz/shById", params);
};

