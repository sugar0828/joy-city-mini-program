//index.js
//获取应用实例
const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog'
import Toast from '@vant/weapp/toast/toast'
import { checkOpenid } from './../../utils/util'
import { getFeeInfo, getOpenid } from './../../api/api'

const openid = wx.getStorageSync('openid')
let _carCodeProvince = ''
let _carCodeCity = ''

Page({
  data: {
    motto: '欢迎进入扬州御龙湾商业广场',
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
  onConfirmCarProvince() {
    this.setData({
      showCarProvince: false,
      carProvince: _carCodeProvince || this.data.carProvince,
      carCity: _carCodeCity || this.data.carCity
    })
  },
  onCancelCarProvince() {
    this.setData({
      showCarProvince: false,
      carProvince: this.data.carProvince || wx.getStorageSync('carProvince') || '苏',
      carCity: this.data.carCity || wx.getStorageSync('carCity') || 'K'
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
    _carCodeProvince = this.data.carProvinceList[val[0]]
    _carCodeCity = this.data.carCityList[val[1]]
  },
  checkCost() {
    if (!this.data.carCodeEnd) {
      Dialog.alert({
        title: '提示',
        message: '请输入正确的车牌号！'
      })
      return
    }
    const { carProvince, carCity, carCodeEnd } = this.data
    wx.setStorageSync('carCodeEnd', carCodeEnd)
    wx.setStorageSync('carProvince', carProvince)
    wx.setStorageSync('carCity', carCity)

    getFeeInfo({
      plateNo: `${carProvince}${carCity}${carCodeEnd}`
    }).then(res => {
      if (res.success) {
        wx.setStorageSync('parkInfo', res.data)
        wx.navigateTo({
          url: '/pages/parkInfo/park',
        })
      } else {
        Dialog.alert({
          title: '提示',
          message: '没有查到泊车信息，如号牌无误，请前往出口处人工缴费！'
        })
      }
    })
  },
  onParkTickets() {
    wx.navigateTo({
      url: '/pages/parkTickets/ticket'
    })
  },
  onBalanceList() {
    wx.navigateTo({
      url: '/pages/costRecords/index'
    })
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
    // console.log(event.detail);
  },
  getUserInfo: function(e) {
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
  },
  onShow: function() {
    // 获取用户openid & 是否注册
    const user = wx.getStorageSync('user')
    if (user && user.cellphone) { // 已注册
    } else {
      if (user !== 0) {
        wx.login({
          success: res => {
            wx.setStorageSync('loginCode', res.code)
            getOpenid(res.code).then(res => {
              if (res.success) {
                wx.setStorageSync('openid', res.data.openid)
                wx.setStorageSync('user', res.data.user || 0)
              }
            })
          }
        })
      }
    }

    const carProvince = wx.getStorageSync('carProvince') || '苏'
    const carCity = wx.getStorageSync('carCity') || 'K'
    const carCodeEnd = wx.getStorageSync('carCodeEnd') || ''
    this.setData({
      carProvince,
      carCity,
      carCodeEnd
    })

  }
})
