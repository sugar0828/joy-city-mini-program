//index.js
//获取应用实例
const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog'
import Toast from '@vant/weapp/toast/toast'
import { checkOpenid } from './../../utils/util'

const openid = wx.getStorageSync('openid')

Page({
  data: {
    motto: '欢迎进入扬州御龙湾商业广场',
    carNo: '',
    show: false,
    actions: [
      {
        name: '选项'
      },
      {
        name: '选项'
      },
      {
        name: '选项',
        subname: '副文本',
        openType: 'getPhoneNumber'
      }
    ],
    // car
    carProvinceList: '苏浙京津沪陕冀豫云辽黑湘皖鲁新赣鄂桂甘晋蒙吉闽贵粤川青藏琼宁渝'.split(''),
    carCityList: 'KABCDEFGHIJLMNOPQRSTUVWXYZ'.split(''),
    carProvince: '苏',
    carCity: 'K',
    showCarProvince: false,
    carCodeEnd: ''
  },
  onShowCarProvince() {
    this.setData({
      showCarProvince: true
    })
  },
  onCloseCarProvince() {
    this.setData({
      showCarProvince: false
    })
  },
  onCancelCarProvince() {
    this.setData({
      showCarProvince: false,
      carProvince: '',
      carCity: ''
    })
  },
  onChangeCarCode(e) {
    const val = e.detail
    const valid = /^[0-9a-zA-Z]+$/.test(val)
    if (!valid) {
      Toast.fail('非法车牌号码')
    }
    this.setData({
      carCodeEnd: val.toLocaleUpperCase()
    })
  },
  onChangeCarProvinceAndCity: function (e) {
    const val = e.detail.value
    this.setData({
      carProvince: this.data.carProvinceList[val[0]],
      carCity: this.data.carCityList[val[1]]
    })
  },
  checkCost() {
    Dialog.alert({
      title: '提示',
      message: '没有查到泊车信息，如号牌无误，请前往出口处人工缴费！'
    })
  },
  onParkTickets() {
    if (openid) {
      wx.navigateTo({
        url: '/pages/parkTickets/ticket'
      })
    } else {
      checkOpenid()
    }
  },
  onBalanceList() {
    if (openid) {
      wx.navigateTo({
        url: '/pages/costRecords/index'
      })
    } else {
      checkOpenid()
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  showSheet() {
    this.setData({
      show: true
    })
  },
  showDialog() {
    Dialog.alert({
      title: '标题',
      message: '弹窗内容'
    }).then(() => {
      // on close
    });
  },
  onLoad: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onClose() {
    this.setData({ show: false });
  },
  onSelect(event) {
    console.log(event.detail);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  uploadPiao() {
    wx.navigateTo({
      url: '/pages/points/points',
    })
  }
})
