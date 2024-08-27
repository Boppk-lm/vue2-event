<template>
    <!-- 用户头像 -->
  <div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>更换头像</span>
  </div>
  <!-- 图片，用来展示用户选择的头像 -->
  <div @click="chooseImg">
    <img class="the_img" src="../../assets/images/avatar.jpg" alt="">
  </div>
  <!-- 按钮区域 -->
  <div class="bth-box">
    <!-- 选择图片 因为input[file]的原生样式不好改，所以隐藏起来 accept是限制提交的文件类型 -->
    <input ref="imgref" type="file" style="display: none" accept="image/*" @change="onfileChange">
    <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
    <el-button type="success" icon="el-icon-upload"  :disabled="avatar === ''">上传图片</el-button>
  </div>
</el-card>
  </div>
</template>
<script>
export default {
  name: 'user-avatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    // 在选择图片后触法的改变事件
    onfileChange (e) {
      const files = e.target.files
      if (files.length === 0) {
        this.avatar = ''
      } else {
        console.log(files[0])
        this.avatar = '111'
      }
    },
    // 选择图片 模拟点击事件
    chooseImg () {
      this.$refs.imgref.click()
    }
  }
}
</script>

<style lang="less" scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    .bth-box {
        margin-top: 7px;
    }
  }
</style>
