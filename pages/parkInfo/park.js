import {
  getPayParams,
  paymentUsePoints
} from '../../api/api'
import Dialog from '@vant/weapp/dialog/dialog'

Page({
  data: {
    info: {
      wxPayment: 0
    },
    user: wx.getStorageSync('user')
  },
  toParkRecord() {
    const {
      orderNo,
      wxPayment,
      delayTime
    } = this.data.info
    if (wxPayment === 0) { // 使用积分缴费
      paymentUsePoints({
        orderNo
      }).then(res => {
        if (res.success) {
          Dialog.alert({
            title: '提示',
            message: `您有${delayTime}分钟时间离场，超时重新计费！`
          }).then(() => {
            wx.redirectTo({
              url: '/pages/costRecords/index',
            })
          })
        }
      })
    } else { // 微信付款
      getPayParams({
        orderNo
      }).then(res => {
        wx.hideToast()
        if (res.success) {
          const {
            timeStamp,
            nonceStr,
            packageValue,
            signType,
            paySign
          } = res.data
          wx.requestPayment({
            timeStamp,
            nonceStr,
            package: packageValue,
            signType,
            paySign,
            success(res) {
              Dialog.alert({
                title: '提示',
                message: `您有${delayTime}分钟时间离场，超时重新计费！`
              }).then(() => {
                wx.redirectTo({
                  url: '/pages/costRecords/index',
                })
              })
            },
            fail(res) {
              const isCancel = res.errMsg.includes('cancel')
              wx.showToast({
                title: `支付失败, 原因：${isCancel ? '主动取消支付' : '未知'}`,
                icon: 'none'
              })
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/costRecords/index',
                })
              }, 4 * 60 * 1000);
            },
            complete() {}
          })
        }
      })
    }

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
  },
  onLoad: function () {}
})