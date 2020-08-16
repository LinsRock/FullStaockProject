// 基础接口

const { Controller } = require('egg')

class BaseController extends Controller {
  success(data = {}, message = '操作成功') {
    this.ctx.body = {
      code: 0,
      data,
      message,
    }
  }

  message(message) {
    this.ctx.body = {
      code: 0,
      message,
    }
  }

  error(message = '系统异常', code = -1, errors = {}) {
    this.ctx.body = {
      code,
      message,
      errors,
    }
  }
}

module.exports = BaseController
