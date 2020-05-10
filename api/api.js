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

// 查询用户信息中的手机号码是否和微信openid绑定，只有绑定了才算是会员；只有手机号没有绑定需要重新注册
const getMemberInfo = () => {
  return request.get('/o2oMember/info')
}

const getFeeInfo = data => {
  return request.post('/park/info', data, {
    toastMsg: '记录查询中...',
    noErrorToast: true // 某些情况下不需要toast错误信息
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

const getPayParams = data => {
  return request.post('/wx/pay/createOrder', data, {
    toastMsg: '正在下单...'
  })
}

const paymentUsePoints = data => {
  return request.post('/park/paymentUsePoints', data)
}

export {
  getOpenid,
  getPhone,
  register,
  getMemberInfo,
  getFeeInfo,
  sign,
  getSign,
  getFeeRecordsList,
  getPayParams,
  paymentUsePoints
}