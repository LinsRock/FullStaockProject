const BaseController = require('./base')
const jwt = require('jsonwebtoken')
const md5 = require('md5')

const HashSalt = ':Heresy@hub.&&'
const registerRules = {
  email: { type: 'email' },
  nickName: { type: 'string' },
  passwd: { type: 'string' },
  captcha: { type: 'string' },
}

class UserController extends BaseController {
  // 用户注册
  async register() {
    const { ctx } = this
    try {
      // 请求参数类型校验
      ctx.validate(registerRules)
    } catch (e) {
      return this.error('请求参数错误', -1, e.errors)
    }

    const { email, nickName, passwd, captcha } = ctx.request.body

    // 验证码校验
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('验证码错误')
    }

    // 邮箱是否重复
    if (await this.checkEmail(email)) {
      return this.error('该邮箱已注册过')
    }

    const ret = await ctx.model.User.create({
      email,
      nickName,
      passwd: md5(passwd + HashSalt),
    })


    if (ret._id) {
      this.success({ name: nickName }, '注册成功')
    }
  }

  // 用户登录
  async login() {
    const { ctx, app } = this
    const { email, captcha, emailCode, passwd } = ctx.request.body

    // 验证码校验
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('验证码错误')
    }

    // 邮箱验证码校验
    if (emailCode !== ctx.session.emailCode) {
      return this.error('邮箱验证码错误')
    }

    // 查询邮箱和密码
    const user = await ctx.model.User.findOne({
      email,
      passwd: md5(passwd + HashSalt),
    })

    if (!user) {
      return this.error('用户名或密码错误')
    }

    // 用户的信息加密成token返回
    const token = jwt.sign({
      _id: user._id,
      email,
    }, app.config.jwt.secret, {
      expiresIn: '1h',
    })

    this.success({ token, email, nickName: user.nickName })
  }

  async checkEmail(email) {
    const user = await this.ctx.model.User.findOne({ email })
    return user
  }

  async verify() {
    // 校验方法
  }

  // 查询用户信息
  async info() {
    const { ctx } = this
    const { email } = ctx.state

    const user = await this.checkEmail(email)
    this.success(user)
  }
}

module.exports = UserController
