import * as ax from "../../instrance";
import config from "../../../../config/config.js";
var URL = config.apiUrl;

export const getSbyxList = params => {
  return ax.pJson(URL + "/byyt/rzgl/getSbyxrzList", params);
};

export const getSbyxList1 = params => {
  return ax.pJson(URL + "/byyt/rzgl/getSbyxrzList1", params);
};

export const getSbInfoBySBID = params => {
  return ax.pJson(URL + "/byyt/rzgl/getSbInfoBySBID", params);
};
