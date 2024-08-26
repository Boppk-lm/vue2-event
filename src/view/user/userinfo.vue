<template>
  <div>
    <!-- 基本资料 -->
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>基本资料</span>
  </div>
  <div>
    <el-form ref="formref" :model="userform" :rules="rules" label-width="100px">
        <el-form-item prop="username" label="登录名称" style="width: 40%">
          <el-input v-model="userform.username" disabled></el-input>
        </el-form-item>
        <el-form-item prop="nickname" label="用户昵称" style="width: 40%">
          <el-input  v-model="userform.nickname" minlength="1" maxlength="10" ></el-input>
        </el-form-item>
        <el-form-item prop="email" label="用户邮箱" style="width: 40%">
          <el-input  v-model="userform.email" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交修改</el-button>
          <el-button >重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</el-card>
  </div>
</template>

<script>
export default {
  name: 'my-user',
  data () {
    return {
      userform: {
        username: this.$store.state.userinfo.username, // 用户名
        nickname: '', // 用户昵称
        email: '' // 用户邮箱
      },
      rules: {
        // 昵称验证
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '昵称必须是1-10的非空字符串', trigger: 'blur' }
        ],
        // 邮箱验证
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

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
  }
</style>
