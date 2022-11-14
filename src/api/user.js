import request from '@/util/request'

export function login(data) {
  return request('/stj/user/login', 'post', data)
}

export function getInfo() {
  return request('/stj/user/userinfo', 'get', null)
}
