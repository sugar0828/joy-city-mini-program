import request from '../utils/request'

const getOpenid = code => {
  return request.get(`/wechat/info?code=${code}`)
}

const getPhone = data => {
  return request.post('/wechat/decodePhone', data)
}

const register = data => {
  return request.post('/o2oMember/register', data)
}

const getMemberInfo = data => {
  return request.get('/o2oMember/info/' + data)
}
export {
  getOpenid,
  getPhone,
  register,
  getMemberInfo
}