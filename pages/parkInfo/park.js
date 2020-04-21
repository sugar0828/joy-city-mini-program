Page({
  data: {
    info: {
      wxPayment: 0
    },
    user: wx.getStorageSync('user')
  },
  toParkRecord() {
    wx.showToast({
      title: '功能开发中...',
      icon: 'none'
    })
  },
  onShow: function (options) {
    const parkInfo = wx.getStorageSync('parkInfo')
    this.setData({
      user: wx.getStorageSync('user')
    })
    if (Object.keys(parkInfo).length) {
      const time = parseFloat(parkInfo.freeTime)
      const info = {
        ...parkInfo,
        hour: time / 60,
        minutes: time % 60,
        deductionIntegral: parseFloat(parkInfo.deductionIntegral)
      }
      this.setData({
        info
      })
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }
  }
})