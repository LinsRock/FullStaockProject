<template>
  <div class="login-container">
    <el-form ref="loginForm" class="form" label-width="40px" :model="form" :rules="rules">
      <h3 class="title">
        Login In
      </h3>
      <el-form-item prop="email">
        <span slot="label" class="label-icon">
          <i class="el-icon-mobile" />
        </span>
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item prop="passwd">
        <span slot="label" class="label-icon">
          <i class="el-icon-lock" />
        </span>
        <el-input v-model="form.passwd" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item prop="captcha" class="captcha-container">
        <span slot="label" class="label-icon">
          <i class="el-icon-key" />
        </span>
        <el-input v-model="form.captcha" placeholder="请输入验证码" />
        <img :src="captchaUrl" alt="" @click="updateCaptcha">
      </el-form-item>

      <el-form-item prop="emailCode" class="captcha-container">
        <span slot="label" class="label-icon">
          <i class="el-icon-key" />
        </span>
        <el-input v-model="form.emailCode" placeholder="请输入邮箱验证码" />
        <el-button type="primary" :disabled="send.timer>0" @click="sendEmailCode">
          {{ sendText }}
        </el-button>
      </el-form-item>
      <el-form-item class="btn-container">
        <el-button type="primary" size="medium" @click.native.prevent="handleLogin">
          登录
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
      rules: {
        email: [
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入正确格式的邮箱', trigger: 'blur' }
        ],
        captcha: [{ required: true, message: '请输入验证码' }],
        emailCode: [{ required: true, message: '请输入邮箱验证码' }],
        passwd: [
          { required: true, message: '请输入密码' },
          { pattern: /^[\w_-]{6,12}$/g, message: '请输入6-12位密码', tirgger: 'blur' }
        ]
      },
      form: {
        email: '',
        passwd: '',
        captcha: '',
        emailCode: ''
      },
      send: {
        timer: 0
      },
      captchaUrl: 'api/captcha'
    }
  },
  computed: {
    sendText () {
      return this.send.timer <= 0 ? '发送' : `${this.send.timer}s后发送`
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const params = {
            ...this.form,
            passwd: md5(this.form.passwd)
          }

          const { code, data, message } = await this.$http.post('/user/login', params)

          if (code === 0) {
            this.$message.success('登录成功')
            // token 的存储
            localStorage.setItem('token', data.token)

            setTimeout(() => {
              this.$router.push('/')
            }, 500)
          } else {
            this.$message.error(message)
          }
        }
      })
    },
    async sendEmailCode () {
      // @todo 发送邮箱
      const { code } = await this.$http.get('/sendcode?email=' + this.form.email)

      if (code === 0) {
        this.$message.success('发送成功')
      } else {
        this.$message.error('发送失败')
      }

      this.send.timer = 10

      this.timer = setInterval(() => {
        this.send.timer -= 1

        if (this.send.timer <= 0) {
          clearInterval(this.timer)
        }
      }, 1000)
    },
    /* 更新验证码 */
    updateCaptcha () {
      this.captchaUrl = `api/captcha?_t=${Date.now()}`
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
