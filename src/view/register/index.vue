<!-- 注册页面 -->
<template>
  <div class="box">
    <div class="reg">
      <!-- 标题 -->
      <div class="reg-title"></div>
      <!-- 注册组件 -->
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input type="password" v-model="form.repassword" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerFn" class="reg-bth">注册</el-button>
          <el-link type="info" @click="$router.push('/login')">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reguser } from '@/api/reg'
export default {
  name: 'my-reg',
  data () {
    const samePwdFn = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '', // 用户名
        password: '', // 密码
        repassword: '' // 再次输入密码
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
        ],
        // 再次输入密码验证
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: samePwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 注册事件点击
    registerFn () {
      // 兜底验证
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 通过验证
          const { data } = await reguser(this.form)
          console.log(data)
          // 注册失败 return阻止继续往下执行
          if (data.code !== 0) return this.$message.error(data.message)
          // 注册成功
          this.$message.success(data.message)
          this.$router.push('/login')
        } else {
          return false
        }
      })
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

  .reg {
    width: 470px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    padding: 0 30px;
    box-sizing: border-box;

    .reg-title {
      height: 60px;
      background: url('../../assets/images/login_title.png') no-repeat center;
    }

    .reg-bth {
      width: 100%;
    }
  }
}
</style>
