import Vue from 'vue'
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

const service = axios.create({
  baseURL: '/api'
})

export default ({ store, redirect }) => {
  // 请求拦截器
  service.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')

      if (token) {
        config.headers.common['Authorization'] = 'Bearer ' + token
      }

      return config
    }
  )

  // 响应拦截器
  service.interceptors.response.use(
    response => {
      const { data } = response

      if (data.code === -600) {
        Message.info('用户未登录')
        redirect({ path: 'login' })
      } else if (data.code === -666) {
        MessageBox.confirm('登录已过期', '过期', {
          confirmButtonText: '确认登录',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          localStorage.removeItem('token')
          redirect({ path: 'login' })
        })
      }

      return data
    }
  )
}

Vue.prototype.$http = service

export const http = service
