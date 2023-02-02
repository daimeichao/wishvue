import * as ax from "../../instrance";
import config from "../../../../config/config.js";
var URL = config.apiUrl;


export const getXtczList = params => {
  return ax.pJson(URL + "/byyt/rzgl/getXtczrzList", params);
};

export const searchByThing = params => {
  return ax.pJson(URL + "/byyt/rzgl/searchByThing", params);
};

export const addXtczrz = params => {
  return ax.pJson(URL + "/byyt/rzgl/addXtczrz", params);
};
