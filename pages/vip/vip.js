// pages/vip/vip.js
import Dialog from '@vant/weapp/dialog/dialog'
const openid = wx.getStorageSync('openid')
console.log(openid)

Page({
  data: {
    avatarUrl: '',
    nickName: '',
    openid
  },
  onShow() {
    this.setData({
      openid: wx.getStorageSync('openid')
    })
  },
  onLoad: function (options) {
    this.setData({
      openid: wx.getStorageSync('openid')
    })
  },
  bindGetUserInfo(e) {
    const {
      userInfo,
      rawData,
      signature,
      encryptedData,
      iv
    } = e.detail
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName
    })
  },
  goToRegister() {
    wx.redirectTo({
      url: '/pages/register/register',
    })
  }
})