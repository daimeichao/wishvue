import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;
//发布心愿
export const addWish = params => {
  return ax.pJson(URL + "/wish/addwish", params);
};
//发布心愿新增
export const addWish1 = params => {
  return ax.pJson(URL + "/wish/addwish1", params);
};
//心愿列表修改
export const updateWish = params => {
  return ax.pJson(URL + "/wish/updatewish", params);
};
//心愿列表实现
export const updSX = params => {
  return ax.pJson(URL + "/wish/updSX", params);
};
//心愿列表修改
//
export const updatesort = params => {
  return ax.pJson(URL + "/wish/updatesort", params);
};
//审核发布心愿修改
export const updateWish1 = params => {
  return ax.pJson(URL + "/wish/updatewish1", params);
};
//心愿列表实现删除
export const deleteWish= params => {
  return ax.pJson(URL + "/wish/delwish", params);
};
//心愿审核表实现删除
export const deleteWish1= params => {
  return ax.pJson(URL + "/wish/delwish1", params);
};
export const getWishList = params => {
  return ax.pJson(URL + "/wish/list", params);
};
//审核发布心愿详情
export const getWishById = params => {
  return ax.pJson(URL + "/wish/getwish", params);
};
// --------------------------------------------实现心愿------------------------------
export const addSX = params => {
  return ax.pJson(URL + "/Sxwish/addwish", params);
};

export const updateSX = params => {
  return ax.pJson(URL + "/Sxwish/updatewish", params);
};
//审核实现心愿修改
export const updateSX1= params => {
  return ax.pJson(URL + "/Sxwish/updatewish1", params);
};
//审核实现心愿 对心愿状态的修改
export const updateSX2= params => {
  return ax.pJson(URL + "/Sxwish/updatewish2", params);
};
//删除实现心愿
export const deleteSX= params => {
  return ax.pJson(URL + "/Sxwish/delwish", params);
};

export const getSXList = params => {
  return ax.pJson(URL + "/Sxwish/list", params);
};
//审核实现心愿详情
export const getSXById = params => {
  return ax.pJson(URL + "/Sxwish/getwish", params);
};
//心愿审核----------------
export const getxySHList = params => {
  return ax.pJson(URL + "/wish/shenHe", params);
};
//认领审核
export const getsxSHList = params => {
  return ax.pJson(URL + "/Sxwish/shenHe", params);
};
//心愿列表wishlist
export const wishlist = params => {
  return ax.pJson(URL + "/wish/wishlist", params);
};
//心愿列表详情

export const getListById = params => {
  return ax.pJson(URL + "/wish/getone", params);
};
