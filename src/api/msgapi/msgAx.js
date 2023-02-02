import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;

export const addMsg = params => {
    return ax.pJson(URL + "/msg/add", params);
};

export const updateMsg = params => {
    return ax.pJson(URL + "/msg/update", params);
};

export const deleteMsg = params => {
    return ax.gJson(URL + "/msg/delete", params);
};

export const getMsgList = params => {
    return ax.pJson(URL + "/msg/list", params);
};

export const getMsgById = params => {
    return ax.gJson(URL + "/msg/get", params);
};