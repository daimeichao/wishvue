import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;

export const addAbout = params => {
  return ax.pJson(URL + "/about/add", params);
};

export const updateAbout = params => {
  return ax.pJson(URL + "/about/update", params);
};

export const deleteAbout = params => {
  return ax.gJson(URL + "/about/delete", params);
};

export const getAboutList = params => {
  return ax.pJson(URL + "/about/list", params);
};
export const getOneList = params => {
  return ax.gJson(URL + "/about/OneList");
};

export const getAboutById = params => {
  return ax.gJson(URL + "/about/get", params);
};
