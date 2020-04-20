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
  onLoad: function (options) {
    const parkInfo = wx.getStorageSync('parkInfo')
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