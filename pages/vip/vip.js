Page({
  data: {
    openid: wx.getStorageSync('openid'),
    phone: wx.getStorageSync('user') && wx.getStorageSync('user').cellphone
  },
  onShow() {
    this.setData({
      openid: wx.getStorageSync('openid'),
      phone: wx.getStorageSync('user') && wx.getStorageSync('user').cellphone
    })
  },
  goToRegister() {
    wx.redirectTo({
      url: '/pages/register/register'
    })
  }
})