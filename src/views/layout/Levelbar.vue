<template>
  <el-breadcrumb class="app-levelbar">
    <el-breadcrumb-item v-for="(item,i)  in levelList" :key="i">
      <span>{{item.name}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  created () {
    this.getBreadcrumb()
  },
  data () {
    return {
      levelList: null
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name);
      console.log(matched)
      //加首页
      // const first = matched[0];
      // if (first && (first.name !== '首页' || first.path !== '')) {
      //   matched = [{ name: '首页', path: '/' }].concat(matched)
      // }
      this.levelList = matched;
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb();
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-levelbar.el-breadcrumb {
  display: inline-block;
  font-size: 16px;
  line-height: 50px;
  margin-left: 10px;
  outline: none !important;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #303133 !important;
  font-weight: 400 !important;
}
</style>
