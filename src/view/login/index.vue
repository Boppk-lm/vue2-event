<!-- 登录界面 -->
<template>
   <div class="box">
    <div class="log">
      <!-- 标题 -->
      <div class="log-title"></div>
      <!-- 注册组件 -->
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerFn" class="log-bth">登录</el-button>
          <el-link type="info" @click="$router.push('/register')">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-log',
  data () {
    return {
      form: {
        username: '', // 用户名
        password: '' // 密码

      },
      rules: {
        // 用户名验证
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的大小写字母或数字', trigger: 'blur' }
        ],
        // 密码验证
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15位', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // 加载背景图
  background-image: url('../../assets/images/login_bg.jpg');
  /* 背景图垂直、水平均居中 */
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  /* 设置背景颜色，背景图加载过程中会显示背景色 */
  background-color: #478fca;

  .log {
    width: 470px;
    height: 275px;
    background-color: #fff;
    border-radius: 3px;
    padding: 0 30px;
    box-sizing: border-box;

    .log-title {
      height: 60px;
      background: url('../../assets/images/login_title.png') no-repeat center;
    }

    .log-bth {
      width: 100%;
    }
  }
}
</style>
