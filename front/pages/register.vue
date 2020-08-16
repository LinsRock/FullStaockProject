<template>
  <div class="login-container">
    <el-form ref="registerForm" class="form" label-width="80px" :model="form" :rules="rules">
      <h3 class="title">
        Sign In
      </h3>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="验证码" prop="captcha" class="captcha-container">
        <el-input v-model="form.captcha" placeholder="请输入验证码" />
        <img :src="code.captcha" alt="" @click="updateCaptcha">
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="form.nickName" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="密码" prop="passwd">
        <el-input v-model="form.passwd" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="确认密码" prop="repasswd">
        <el-input v-model="form.repasswd" type="password" placeholder="请再次输入密码" />
      </el-form-item>
      <el-form-item class="btn-container">
        <el-button type="primary" @click.native.prevent="handleRegister">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
  layout: 'login',
  data () {
    return {
      form: {
        email: '731014288@qq.com',
        nickName: 'Heresy',
        captcha: '',
        passwd: '123456',
        repasswd: '123456'
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入正确格式的邮箱', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入昵称' }
        ],
        captcha: [
          { required: true, message: '请输入验证码' }
        ],
        passwd: [
          { required: true, message: '请输入密码' },
          { pattern: /^[\w_-]{6,12}$/g, message: '请输入6~12位密码', trigger: 'blur' }
        ],
        repasswd: [
          { required: true, message: '请再次输入密码' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.passwd) {
                callback(new Error('两次密码输入不一致，请重新输入'))
              }
              callback()
            },
            trigger: 'blur'
          }
        ]
      },
      code: {
        captcha: 'api/captcha'
      }
    }
  },
  methods: {
    /* 更新验证码 */
    updateCaptcha () {
      this.code.captcha = `api/captcha?_t=${Date.now()}`
    },
    /* 注册 */
    handleRegister () {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          const { email, nickName, passwd, captcha } = this.form
          const params = {
            email,
            nickName,
            captcha,
            passwd: md5(passwd)
          }

          // @todo 发送注册请求
          const { code, message } = await this.$http.post('/user/register', params)
          if (code === 0) {
            this.$alert('注册成功', '成功', {
              confirmButtonText: '去登录',
              callback: () => {
                this.$router.push('/login')
              }
            })
          } else {
            this.$message.error(message)
          }
        } else {
          console.log('校验失败')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
