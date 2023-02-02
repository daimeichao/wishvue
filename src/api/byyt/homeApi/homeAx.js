import * as ax from "../../instrance";
import config from "../../../../config/config.js";
var URL = config.apiUrl;

export const getShowData = params => {
    return ax.pJson(URL + "/xcx/home/getShowData", params);
};

export const getShowData1 = params => {
    return ax.pJson(URL + "/jbgs/back/jbgsgl/getCountByCity", params);
};

export const getShowData2 = params => {
    return ax.pJson(URL + "/jbgs/back/jbgsgl/getLzCountByCity", params);
};

export const getShowData3 = params => {
    return ax.pJson(URL + "/jbgs/back/jbgsgl/getTjhzCount", params);
};


