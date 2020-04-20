import { getOpenid } from './api/api'

App({
  onLaunch: function () {
    // 登录
    // 先判断是否有用户注册信息
    const user = wx.getStorageSync('user')
    if (user && user.cellphone) { // 已注册
    } else {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.setStorageSync('loginCode', res.code)
          getOpenid(res.code).then(res => {
            if (res.success) {
              wx.setStorageSync('openid', res.data.openid)
              wx.setStorageSync('user', res.data.user || '')
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    loginCode: ''
  }
})