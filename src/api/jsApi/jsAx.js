import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;

//获取教室列表
export const getJsList = params => {
  return ax.pJson(URL + "/iotpt/dmtjs/jsgl/getJsList", params);
};

export const getJsList1 = params => {
  return ax.pJson(URL + "/iotpt/dmtjs/jsgl/getJsList1", params);
};

//获取教室列表
export const getFzJsList = params => {
  return ax.pJson(URL + "/iotpt/dmtjs/jsgl/getFzJsList", params);
};

//获取筛选条件List
export const getSXList = params => {
  return ax.pJson(URL + "/iotpt/dmtjs/jsgl/getSXList", params);
};

//获取大楼List
export const getDLList = params => {
  return ax.pJson(URL + "/iotpt/dmtjs/jsgl/getDLList", params);
};

//获取终端状态
export const GetTerminalInfo = params => {
  return ax.pJson(URL + "/iotpt/dmtjs/jsgl/GetTerminalInfo", params);
};

//调用海康接口
export const getHKUrl = params => {
  return ax.pJson(URL + "/iotpt/dmtjs/jsgl/geturl", params);
};

//通过外部接口获取所有教室设备状态
export const GetDeviceStateInfo = params => {
  return ax.pJson(URL + "/iotpt/dmtjs/jsgl/GetDeviceStateInfo", params);
};
export const getLTdevInfo = params => {
  return ax.pJson(URL + "/handle/nettyApi", params);
};
//获取摄像头树形
export const getBjjkTree = params => {
  return ax.pJson(URL + "/iotpt/dmtjs/jsgl/getBjjkTree", params);
};
//获取排课信息
export const getPKInfo = params => {
  return ax.pJson(URL + "/iotpt/dmtjs/jsgl/getPKInfo", params);
};