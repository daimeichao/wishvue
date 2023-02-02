import axios from "axios";
import qs from "qs";
import config from "../../config/config.js";

var URI = config.apiDomain

var ax = axios.create({
  baseURL: URI,
  timeout: 50000,
  headers: {
    // 'Content-Type':'application/x-www-form-urlencoded',
    // 'TOKEN': ''
  }
})

export var itr = (type, url, params) => {
  if (typeof params !== 'object') {
    params = {}
  }
  let arg = qs.stringify(params)
  return ax[type](url, arg)
}

// Ajax API start
export const g = (url, params) => {
  return base('get', url, params)
}

export const p = (url, params, mask, clear, silent) => {
  return base('post', url, params, mask, clear, silent)
}

export const d = (url, params) => {
  return base('delete', url, params)
}

export const u = (url, params) => {
  return base('put', url, params)
}
export const pa = (url, params) => {
  return base('patch', url, params)
}

export const op = (url, params) => {
  return base('options', url, params)
}
// Ajax API end

export function base(type, url, params, mask = false, clear = true, silent = false) {
  return new Promise((resolve, reject) => {
    itr(type, url, params).then((response) => {
      if (response.status === 200) {
        resolve(response.data)
      } else {
        reject(response.data)
      }
    }).catch((msg) => {
      if (!msg.response) {
        // alert('服务器连接超时')
      } else {
        // alert(msg.response.status + ':' + msg.response.statusText)
      }
      reject(msg.message)
    })
  })
}



// ----------------------------------------------传json
var axJson = axios.create({
  baseURL: URI,
  timeout: 200000,
  headers: {
    "Content-Type": "application/json",
    "AppId": "751629831",
    "SecretKey": "13969E6BB4E9B6AE61E0E241A97287AF",
    "Access-Token": "H4sIAI6MZGEA/83JPw5AQBCF8dFoXEKmJpk3u/5trdFocACFQkGEUpwdG5fwa96XPAqI6H759UIf7cn9vEzdNq7sWEWRQlIgRuWgDpYTHo5pb+rvFlVIlme2NGX1JgysaG4LNaJ8RfRbD+6UYeQAAQAA",
  }
});


var axGetJson = axios.create({
  baseURL: URI,
  timeout: 200000,
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
  }
});

//新增
export var instance2 = axios.create({
  baseURL: URI,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "AppId": "751629831",
    "SecretKey": "13969E6BB4E9B6AE61E0E241A97287AF",
    "Access-Token": "H4sIAI6MZGEA/83JPw5AQBCF8dFoXEKmJpk3u/5trdFocACFQkGEUpwdG5fwa96XPAqI6H759UIf7cn9vEzdNq7sWEWRQlIgRuWgDpYTHo5pb+rvFlVIlme2NGX1JgysaG4LNaJ8RfRbD+6UYeQAAQAA",
  }
});
// instance2({
//         method: 'get',
//         url: '/roomApi/FJRH.Campus/API/GetTerminalInfo',
//         params: {
//           ip: '10.20.109.22',
//         }
//       }).then(res => {
//         console.log(res)
//       })

export var itrJson = (type, url, params) => {
  if (typeof params !== 'object') {
    params = {}
  }
  let arg = JSON.stringify(params);
  return axJson[type](url, arg)
}



// Ajax API start
export const pJson = (url, params, mask, clear, silent) => {
  return baseJson('post', url, params, mask, clear, silent)
}
export const gJson = (url, params, mask, clear, silent) => {
  // return baseJson('get', url, params, mask, clear, silent)
  return baseGetJson(url, params, mask, clear, silent)

}

function baseGetJson( url, params, mask = false, clear = true, silent = false) {
  return new Promise((resolve, reject) => {
    axGetJson(
      { method: 'get', url, params }
    ).then((response) => {
      if (response.status === 200) {
        resolve(response.data)
      } else {
        reject(response.data)
      }
    }).catch((msg) => {
      if (!msg.response) {
        // alert('服务器连接超时')
      } else {
        // alert(msg.response.status + ':' + msg.response.statusText)
      }
      reject(msg.message)
    })
  })
}
// Ajax API end

export function baseJson(type, url, params, mask = false, clear = true, silent = false) {
  return new Promise((resolve, reject) => {
    itrJson(type, url, params).then((response) => {
      if (response.status === 200) {
        resolve(response.data)
      } else {
        reject(response.data)
      }
    }).catch((msg) => {
      if (!msg.response) {
        // alert('服务器连接超时')
      } else {
        // alert(msg.response.status + ':' + msg.response.statusText)
      }
      reject(msg.message)
    })
  })
}



// ----------------------------------------------传Blob 
var axJsonBlob = axios.create({
  baseURL: URI,
  timeout: 20000,
  // responseType: 'blob',
  headers: {
    "Content-Type": "application/json",
  }
});

export var itrJsonBlob = (type, url, params) => {
  if (typeof params !== 'object') {
    params = {}
  }
  let arg = JSON.stringify(params);
  // let arg = qs.stringify(params)
  return axJsonBlob[type](url, arg)
}

// Ajax API start
export const pJsonBlob = (url, params, mask, clear, silent) => {
  return baseJsonBlob('post', url, params, mask, clear, silent)
}
// Ajax API end

export function baseJsonBlob(type, url, params, mask = false, clear = true, silent = false) {
  return new Promise((resolve, reject) => {
    itrJsonBlob(type, url, params).then((response) => {
      if (response.status === 200) {
        resolve(response.data)
      } else {
        reject(response.data)
      }
    }).catch((msg) => {
      if (!msg.response) {
        // alert('服务器连接超时')
      } else {
        // alert(msg.response.status + ':' + msg.response.statusText)
      }
      reject(msg.message)
    })
  })
}