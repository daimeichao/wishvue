import * as ax from "../../instrance";
import config from "../../../../config/config.js";
import axios from "axios";
var URL = config.apiUrl;

export const addQs = params => {
    return ax.pJson(URL + "/qs/add", params);
};

export const updateQs = params => {
    return ax.pJson(URL + "/qs/update", params);
};

export const deleteQs = params => {
    return ax.gJson(URL + "/qs/delete", params);
};

export const getQsList = params => {
    return ax.pJson(URL + "/qs/list", params);
};
export const getQsAllList = params => {
    return ax.gJson(URL + "/qs/allList", params);
};

export const getQsById = params => {
    return ax.gJson(URL + "/qs/get", params);
};


export const getBfById = params => {
    return ax.gJson(URL + "/qs-son/get", params);
};
export const getBfList = params => {
    return ax.pJson(URL + "/qs-son/list", params);
};
export const getBfAllList = params => {
    return ax.gJson(URL + "/qs-son/allList", params);
};
export const deleteBf = params => {
    return ax.gJson(URL + "/qs-son/delete", params);
};
export const updateBf = params => {
    return ax.pJson(URL + "/qs-son/update", params);
};
export const updateBfZs = params => {
    return ax.pJson(URL + "/qs-son/updateZs", params);
};
export const addBf = params => {
    return ax.pJson(URL + "/qs-son/add", params);
};


export const addZp = params => {
    return ax.pJson(URL + "/zp/add", params);
};

export const updateZp = params => {
    return ax.pJson(URL + "/zp/update", params);
};

export const deleteZp = params => {
    return ax.gJson(URL + "/zp/delete", params);
};

export const updateZpZs = params => {
    return ax.pJson(URL + "/zp/updateZs", params);
};
export const getZpList = params => {
    return ax.pJson(URL + "/zp/list", params);
};

export const getZpById = params => {
    return ax.gJson(URL + "/zp/get", params);
};
export const createCode = params => {
    return ax.pJson(URL + "/zp/createCode", params);
};
export const createEwm = params => {
    return ax.pJson(URL + "/zp/createEwm", params);
};



