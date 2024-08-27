<template>
  <div>
    <!-- 重置密码 -->
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>重置密码</span>
  </div>
  <div>
    <el-form ref="pwdref" :model="pwdform" :rules="rules" label-width="100px">
        <el-form-item prop="old_pwd" label="原密码" style="width: 40%">
          <el-input v-model="pwdform.old_pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="new_pwd" label="新密码" style="width: 40%">
          <el-input  v-model="pwdform.new_pwd" type="password" ></el-input>
        </el-form-item>
        <el-form-item prop="re_pwd" label="确认新密码" style="width: 40%">
          <el-input  v-model="pwdform.re_pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFn">修改密码</el-button>
          <el-button @click="resetFn">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</el-card>
  </div>
</template>

<script>
import { updatePwd } from '@/api/user'
export default {
  name: 'user-pwd',
  data () {
    // 新密码与原密码判断
    const same0PwdFn = (rule, value, callback) => {
      if (value === this.pwdform.old_pwd) {
        callback(new Error('新密码不能和原密码一致！'))
      } else {
        callback()
      }
    }
    // 新密码与确认新密码判断
    const samePwdFn = (rule, value, callback) => {
      if (value !== this.pwdform.new_pwd) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      pwdform: {
        old_pwd: '', // 原密码
        new_pwd: '', // 新密码
        re_pwd: '' // 确认新密码
      },
      rules: {
        // 原密码验证
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符串', trigger: 'blur' }
        ],
        //  新密码验证
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符串', trigger: 'blur' },
          { validator: same0PwdFn, trigger: 'blur' }
        ],
        //  确认新密码验证
        re_pwd: [
          { required: true, message: '请再次确认密码', trigger: 'blur' },
          { validator: samePwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 修改密码
    submitFn () {
      // 兜底验证
      this.$refs.pwdref.validate(async valid => {
        if (valid) {
          const { data: res } = await updatePwd(this.pwdform)
          console.log(res)
          if (res.code !== 0) return this.$message.error('修改密码失败')
          this.$message.success('修改成功！')
          // 重置表单
          this.resetFn()
        } else {
          return false
        }
      })
    },
    resetFn () {
      this.$refs.pwdref.resetFields()
    }
  }
}
</script>

<style>

</style>
