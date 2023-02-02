<template>
  <div id="app">
    <!-- <el-alert v-if="flag"
      title="警告！由于闲置时间过长，您的会话已经到期，请在刷新页面之前保存您输入的数据。"
      type="error"
    >
    </el-alert> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      lastTime: null, //最后一次点击的时间
      currentTime: null, //当前点击的时间
      timeOut: 20 * 60 * 1000, //设置超时时间： 20分钟
      flag: false, //闲置时间是否超过20分钟
    };
  },
  // mounted() {
  // 		// 监听浏览器的刷新事件
  // 		window.addEventListener('unload', this.unload)
  // 		// window.addEventListener('beforeunload', e => this.unload) // 注册一个匿名函数
  // },
  // //2销毁这个监听事件
  // destroyed() {
  //     // 销毁这个监听事件，需要找到这个函数，如果使用的是匿名函数的话，无法查找这个函数，这个事件也就没有办法被移除 ，在其他页面仍然会执行这个监听事件
  // 		window.removeEventListener('unload', this.unload)
  // },
  // watch: {
  //   // 监听路由跳转。
  //   $route(newRoute, oldRoute) {
  //     if(this.flag){
  //         localStorage.removeItem("code")
  //         localStorage.removeItem("No")
  //         localStorage.removeItem("Name")
  //         localStorage.removeItem("FK_Dept")
  //         localStorage.removeItem("FK_DeptName")
  //         localStorage.removeItem("Type")
  //         localStorage.removeItem("userId")
  //         localStorage.removeItem("ifxzls")

  //         location.replace('https://sso.fjcpc.edu.cn/ZAS/ssologout?Referer=https://appzb.fjcpc.edu.cn/zyzx-api/sso/zyzx_login') 
  //     }
  //   },
  // },
  methods: {
    isDo () {
      this.currentTime = new Date().getTime(); //记录这次点击的时间
      if (this.currentTime - this.lastTime > this.timeOut) {  //判断上次最后一次点击的时间和这次点击的时间间隔是否大于10分钟
        // 这里写状态已过期后执行的操作
        this.flag = true;
      } else {
        this.lastTime = new Date().getTime(); //如果在10分钟内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
      }
    },
    unload (e) {
      if (this.flag) {
        localStorage.removeItem("code")
        localStorage.removeItem("No")
        localStorage.removeItem("Name")
        localStorage.removeItem("FK_Dept")
        localStorage.removeItem("FK_DeptName")
        localStorage.removeItem("Type")
        localStorage.removeItem("userId")
        localStorage.removeItem("ifxzls")
      }
    },
  },
  created () {
    //this.lastTime = new Date().getTime();   //网页第一次打开时，记录当前时间
    // if(localStorage.getItem("userId")=="" || localStorage.getItem("userId")==null ||localStorage.getItem("userId")==undefined){
    //     location.replace('https://sso.fjcpc.edu.cn/ZAS/ssologout?Referer=https://appzb.fjcpc.edu.cn/zyzx-api/sso/zyzx_login') 
    // }
  }
}
</script>

<style lang="scss">
@import "./styles/index.scss"; // 全局自定义的css样式
* {
  margin: 0;
  padding: 0;
}
:root {
  height: 100%;
}
body {
  height: 100%;
  background: #eaedf7;
}
div {
  box-sizing: border-box;
}
.main {
  height: 100vh;
}
.ovh {
  overflow: hidden;
}
::-webkit-scrollbar {
  // width: 16px !important;
  //   height: 16px !important;
  //   background-color: #F5F5F5 !important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #5473e8;
  color: #fff;
}
button {
  cursor: pointer;
}
</style>
