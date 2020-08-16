const svgCaptcha = require('svg-captcha')
const BaseController = require('./base')

class UtilController extends BaseController {
  async captcha() {
    const { ctx } = this
    // 生成验证码svg
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 40,
      background: '#8f8b85',
      width: 120,
      height: 40,
      noise: 4,
    })

    // 将验证码校验信息存放在session
    ctx.session.captcha = captcha.text
    console.log(captcha.text)
    ctx.response.type = 'image/svg+xml'
    ctx.body = captcha.data
  }

  // 发送邮件验证码
  async sendcode() {
    const { ctx, service } = this
    const { email } = ctx.query

    const code = Math.random().toString().slice(2, 6)
    console.log('email', email, 'code', code)

    ctx.session.emailCode = code

    const subject = 'Heresy'
    const text = ''
    const html = `<h2>Hub社区</h2><a href="https://heresy.com"><span>${code}</span></a>`

    const hasSned = await service.tools.sendMail(email, subject, text, html)
    if (hasSned) {
      this.message('发送成功')
    } else {
      this.error('发送失败')
    }
  }
}

module.exports = UtilController
