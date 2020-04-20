// pages/vip/vip.js
const openid = wx.getStorageSync('openid')
const phone = wx.getStorageSync('user') && wx.getStorageSync('user').cellphone

Page({
  data: {
    avatarUrl: '',
    nickName: '',
    openid,
    phone: ''
  },
  onShow() {
    this.setData({
      openid,
      phone: wx.getStorageSync('user') && wx.getStorageSync('user').cellphone
    })
  },
  onLoad: function (options) {
    this.setData({
      openid
    })
  },
  bindGetUserInfo(e) {
    const {
      userInfo
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