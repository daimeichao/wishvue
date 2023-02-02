import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;

export const getIplogList = params => {
  return ax.pJson(URL + "/iplog/list", params);
};
//今天
export const getDayCount = params => {
  return ax.gJson(URL + "/iplog/daycount", params);};
  //昨天
  export const getYesCount = params => {
    return ax.gJson(URL + "/iplog/yescount", params);};
    //七天
    export const getWeekCount = params => {
      return ax.gJson(URL + "/iplog/weekcount", params);};
      //一个月
      export const getMonCount = params => {
        return ax.gJson(URL + "/iplog/moncount", params);
};
//获取区域
export const getPiePv = params => {
  return ax.gJson(URL + "/iplog/piePv", params);
};
export const getPieUv = params => {
  return ax.gJson(URL + "/iplog/pieUv", params);
};
export const getPieIp = params => {
  return ax.gJson(URL + "/iplog/pieIp", params);
};
//获取折现数据 24小时
export const getLineData = params => {
  return ax.gJson(URL + "/iplog/lineData", params);
};
