import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;

export const addGk = params => {
  return ax.pJson(URL + "/gk/add", params);
};

export const updateGk = params => {
  return ax.pJson(URL + "/gk/update", params);
};

export const deleteGk = params => {
  return ax.gJson(URL + "/gk/delete", params);
};

export const getGkList = params => {
  return ax.pJson(URL + "/gk/list", params);
};

export const getGkById = params => {
  return ax.gJson(URL + "/gk/get", params);
};
export const getOneList = params => {
  return ax.gJson(URL + "/gk/OneList");
};
export const searchList = params => {
  return ax.gJson(URL + "/gk/searchList", params);
};
