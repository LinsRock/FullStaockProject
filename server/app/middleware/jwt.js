// 解析token中间件，可以使用egg-jwt
const jwt = require('jsonwebtoken')

module.exports = ({ app }) => {
  return async function verify(ctx, next) {
    if (!ctx.request.header.authorization) {
      ctx.body = {
        code: -600,
        message: '用户未登录',
      }
      return
    }

    const token = ctx.request.header.authorization.replace('Bearer ', '')

    try {
      const ret = await jwt.verify(token, app.config.jwt.secret)
      console.log(ret)
      ctx.state.email = ret.email
      ctx.state.userId = ret._id
      await next()
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        ctx.body = {
          code: -666,
          message: '登录已过期',
        }
      } else {
        ctx.body = {
          code: -1,
          message: '用户信息出错',
        }
      }
    }
  }
}
