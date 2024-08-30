<template>
    <!-- 用户头像 -->
  <div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>更换头像</span>
  </div>
  <!-- 图片，用来展示用户选择的头像 -->
  <div @click="chooseImg">
    <img v-if="!avatar"  class="the_img" src="../../assets/images/avatar.jpg" alt="">
    <img v-else class="the_img" :src="avatar" alt="">
  </div>
  <!-- 按钮区域 -->
  <div class="bth-box">
    <!-- 选择图片 因为input[file]的原生样式不好改，所以隐藏起来 accept是限制提交的文件类型 -->
    <input ref="imgref" type="file" style="display: none" accept="image/*" @change="onfileChange">
    <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
    <el-button type="success" icon="el-icon-upload"  :disabled="avatar === ''" @click="uploadFn">上传图片</el-button>
  </div>
</el-card>
  </div>
</template>
<script>
import { updateAvatar } from '@/api/user'
export default {
  name: 'user-avatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    // 在选择图片后触发的改变事件
    onfileChange (e) {
      const files = e.target.files
      if (files.length === 0) {
        this.avatar = ''
      } else {
        // 文件->内存临时地址 (不能传给后端)
        // this.avatar = URL.createObjectURL(files[0])

        // 文件->base64字符串 (可以传给后端)
        const fr = new FileReader()
        fr.readAsDataURL(files[0]) // 传入文件对象开始读
        fr.onload = (e) => {
          this.avatar = e.target.result
        }
      }
    },
    // 选择图片 模拟点击事件
    chooseImg () {
      this.$refs.imgref.click()
    },
    async uploadFn () {
      const { data: res } = await updateAvatar(this.avatar)
      if (res.code !== 0) return this.$message.error('上传头像失败')
      this.$message.success('上传成功！')
      // 让vuex重新获取最新的用户头像
      this.$store.dispatch('getUserinfo')
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
