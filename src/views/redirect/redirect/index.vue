<template>
  <div class="redirect">

  </div>
</template>
 
<script>
import config from "../../../../config/config";
export default {
  name: "redirect",
  data () {
    return {
      dataObjectUrl: ''
    }
  },
  created () {
    console.log(1111)
    this.upload_callback();
  },
  methods: {
    getParameter () {
      // 获取到重定向发送过来的信息
      //   var uri = decodeURI(window.location.search);
      //   //有%3A之类的乱码，需要用正则处理一下
      //   uri = uri.replace(/%3A/g, ":").replace(/%2F/g, "/").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&");
      //   //具体对数据的处理，看后台传过来的类型，最后得到一个json就可以，其中有两个属性，成功的时候，一个error,一个url
      //   console.log(uri);
      //  return uri.length > 5 ? JSON.parse(uri.substring(3)) : null  


      let tempStr = window.location.href;
      let tempArr = tempStr.split('?')[1] ? tempStr.split('?')[1].split('&') : []
      let returnArr = {}
      var that = this;
      // console.log(tempArr[0])
      tempArr.forEach(element => {
        returnArr[element.split('=')[0]] = element.split('=')[1]
      })
      console.log(returnArr)
      let error = returnArr.error
      let url = returnArr.url
      console.log(error);
      console.log(url);
      return returnArr;

    },
    upload_callback () {
      let tempStr = window.location.href;
      let tempArr = tempStr.split('?')[1] ? tempStr.split('?')[1].split('&') : []
      let returnArr = {}
      var that = this;
      // console.log(tempArr[0])
      tempArr.forEach(element => {
        returnArr[element.split('=')[0]] = element.split('=')[1]
      })
      console.log(returnArr)
      let error = returnArr.error
      let url = returnArr.url
      url = decodeURIComponent(url);
      // url=config.fileShowUrl+url;
      console.log(error);
      console.log(url);
      var dataObject;
      if (error == 0) {
        dataObject = { "error": 0, "url": config.apiUrl+url };

      } else {
        dataObject = { "error": 1, "message": "错误信息" };
      }
      var data = JSON.stringify(dataObject)
      //这里是对数据处理之后，走完这个js会回到kindeditor的js中，继续执行，注意如果后台返回了url,但是弹窗提醒是undef，
      // 可能是因为，自己这边传递接受的error的值不是number类型
      // ，为kindeditor源码里面对error的值的判断都是用的全等，值和类型都相等的情况
      document.getElementsByTagName("body")[0].innerHTML = '<pre>' + data + '</pre>';
    },
  }
}
</script>

<style scoped>
</style>
