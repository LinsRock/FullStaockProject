
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const jwt = app.middleware.jwt({ app })
  router.get('/', controller.home.index)

  // 验证码
  router.get('/captcha', controller.utils.captcha)
  router.get('/sendcode', controller.utils.sendcode)

  // 用户相关接口注册
  router.group({ name: 'user', prefix: '/user' }, router => {
    const { register, login, info, verify } = controller.user

    router.post('/register', register)
    router.post('/login', login)
    router.get('/verify', verify)
    router.get('/info', jwt, info)
  })
}
