<template>
  <div class="out">
    <div class="btn" v-if="flag == 99">
      <img src="../imges/cz.png" alt="" />
      <div>新增</div>
    </div>
    <div class="btn" v-if="flag == 0">
      <img src="../imges/cz.png" alt="" />
      <div>操作</div>
    </div>
    <div class="btn" style="background: #16932b" v-if="flag ==23">
      <img src="../imges/cz.png" alt="" />
      <div>实现</div>
    </div>
    <div class="btn" style="background: #ef8b48" v-if="flag == 1">
      <img src="../imges/update.png" alt="" />
      <div>编辑</div>
    </div>
    <div class="btn" style="background: #ef8b48" v-if="flag == 9">
      <img src="../imges/update.png" alt="" />
      <div>审核</div>
    </div>
    <div class="btn" style="background: #ef8b48" v-if="flag == 10">
      <img src="../imges/sblb.png" alt="" />
      <div>排序</div>
    </div>

    <div class="btn" style="background: #ee5d5d" v-if="flag == 2">
      <img src="../imges/del.png" alt="" />
      <div>删除</div>
    </div>
    <div class="btn" style="background: #1eb988" v-if="flag == 3">
      <img src="../imges/xhwh.png" alt="" />
      <div style="width: 67px">型号列表</div>
    </div>

    <div class="btn" style="background: #32a1f7" v-if="flag == 4">
      <img src="../imges/rylb1.png" alt="" />
      <div style="width: 67px">人员管理</div>
    </div>
    <div class="btn" style="background: #32a1f7" v-if="flag == 5">
      <img src="../imges/ck.png" alt="" />
      <div>查看</div>
    </div>
    <div class="btn" style="background: #32a1f7" v-if="flag == 48">
      <img src="../imges/ck.png" alt="" />
      <div style="width: 67px">驳回原因</div>
    </div>
    <div class="btn" style="background: #1eb988" v-if="flag == 'sh0'">
      <img src="../imges/sh.png" alt="" />
      <div>审核</div>
    </div>
    <div class="btn" style="background: #1eb988" v-if="flag == 'sh1'">
      <img src="../imges/sh.png" alt="" />
      <div>审核</div>
    </div>

    <div class="btn" style="background: #ee5d5d" v-if="flag == 'close'">
      <img src="../imges/k.png" alt="" />
      <div>关</div>
    </div>

    <div class="btn" style="background: #0061ac" v-if="flag == 'open'">
      <img src="../imges/g.png" alt="" />
      <div>开</div>
    </div>

    <div class="btn" style="background: #0061ac" v-if="flag == 'oOpen'">
      <img src="../imges/k.png" alt="" />
      <div>常开</div>
    </div>

    <div class="btn" style="background: #ee5d5d" v-if="flag == 'oClose'">
      <img src="../imges/g.png" alt="" />
      <div>常关</div>
    </div>

    <div class="btn" style="background: #ee5d5d" v-if="flag == 'rylb'">
      <img src="../imges/rylb1.png" alt="" />
      <div style="width: 67px">人员列表</div>
    </div>

    <div class="btn" style="background: #ee5d5d" v-if="flag == 'kszb'">
      <img src="../imges/kszb.png" alt="" />
      <div style="width: 67px">查看设备</div>
    </div>

    <div class="btn" style="background: #32a1f7" v-if="flag == 'xz'">
      <img src="../imges/xz.png" alt="" />
      <div>下载</div>
    </div>

    <div class="btn" style="background: #1eb988" v-if="flag == 'look'">
      <img src="../imges/xq.png" alt="" />
      <div>播放</div>
    </div>

    <div class="btn" style="background: #ef8b48" v-if="flag == 'spjj'">
      <img src="../imges/jj.png" alt="" />
      <div style="width: 67px">视频剪辑</div>
    </div>

    <div class="btn" style="background: #32a1f7" v-if="flag == 999">
      <img src="../imges/chongzhi.png" alt="" />
      <div style="width: 67px">重置密码</div>
    </div>

    <div class="btn" style="background: #1eb988" v-if="flag == 1000">
      <img src="../imges/rylb1.png" alt="" />
      <div style="width: 101px">设置为工作人员</div>
    </div>

    <div class="btn" style="background: #1eb988" v-if="flag == 1001">
      <img src="../imges/rylb1.png" alt="" />
      <div style="width: 101px">设置为普通用户</div>
    </div>

    <div class="btn" style="background: #0061ac" v-if="flag == 1002">
      <img src="../imges/sh.png" alt="" />
      <div>授权</div>
    </div>

    <div class="btn" style="background: #1eb988" v-if="flag == 1003">
      <img src="../imges/ck.png" alt="" />
      <div style="width: 67px">查看藏品</div>
    </div>

    <div class="btn" style="background: #0061ac" v-if="flag == 1004">
      <img src="../imges/sh.png" alt="" />
      <div style="width: 87px">生成二维码</div>
    </div>

    <div class="btn" style="background: #1eb988" v-if="flag == 1005">
      <img src="../imges/ck.png" alt="" />
      <div style="width: 67px">查看部分</div>
    </div>

    <div class="btn" style="background: #1eb988" v-if="flag == 1006">
      <img src="../imges/add_circle.png" alt="" />
      <div style="width: 67px">添加藏品</div>
    </div>


    <div class="btn" style="background: #0061ac" v-if="flag == 1007">
      <img src="../imges/add_circle.png" alt="" />
      <div style="width: 87px">生成二维码</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["flag"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.out {
  display: inline-block;
  margin-top: 3%;
  margin-bottom: 3%;
}

.btn {
  height: 25px;
  background: #0061ac;
  color: #fff;
  line-height: 25px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-family: Microsoft YaHei;
  cursor: pointer;
  padding-left: 7%;
}

.btn div {
  min-width: 40px;
  padding-left: 5px;
}

.btn img {
  width: 19px;
  height: 18px;
  margin-right: 0.26%;
  background-size: 100% 100%;
}
</style>
