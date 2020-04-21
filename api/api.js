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

const getMemberInfo = () => {
  return request.get('/o2oMember/info')
}

const getFeeInfo = data => {
  return request.post('/park/info', data, {
    toastMsg: '记录查询中...'
  }) // plateNo
}

// 签到
const sign = () => {
  return request.post('/o2oMemberSign/sign')
}

// 查询签到
const getSign = () => {
  return request.get('/o2oMemberSign/info')
}

// 缴费记录
const getFeeRecordsList = data => {
  return request.post('/parkingPaymentRecord/page', data)
}

export {
  getOpenid,
  getPhone,
  register,
  getMemberInfo,
  getFeeInfo,
  sign,
  getSign,
  getFeeRecordsList
}