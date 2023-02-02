import * as ax from "../instrance";
import config from "../../../config/config.js";
var URL = config.apiUrl;

export const addBanner = params => {
    return ax.pJson(URL + "/banner/add", params);
};

export const updateBanner = params => {
    return ax.pJson(URL + "/banner/update", params);
};

export const deleteBanner = params => {
    return ax.gJson(URL + "/banner/delete", params);
};

export const getBannerList = params => {
    return ax.pJson(URL + "/banner/list", params);
};

export const getBannerById = params => {
    return ax.gJson(URL + "/banner/get", params);
};