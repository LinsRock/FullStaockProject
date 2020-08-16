const { Service } = require('egg')
const nodemailer = require('nodemailer')


const userEmail = 'heresy_hub@126.com'
const transporter = nodemailer.createTransport({
  service: '126',
  secureConnection: true,
  auth: {
    user: userEmail,
    pass: 'WWSCWNTETGEOLLQN',
  },
})

class ToolService extends Service {
  // 发送邮件
  async sendMail(email, subject, text, html) {
    const mailOptions = {
      from: userEmail,
      cc: userEmail,
      to: email,
      subject,
      text,
      html,
    }

    try {
      await transporter.sendMail(mailOptions)
      return true
    } catch (err) {
      console.log('email error', err)
      return false
    }
  }
}

module.exports = ToolService
