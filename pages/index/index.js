//index.js
//获取应用实例
const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog'
import Toast from '@vant/weapp/toast/toast'
import {
  getFeeInfo,
  getOpenid,
  getMemberInfo
} from './../../api/api'

let _carCodeProvince = ''
let _carCodeCity = ''

Page({
  data: {
    motto: '欢迎进入扬州御龙湾商业广场',
    show: false,
    actions: [{
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
    carProvince: '苏',
    carCity: 'K',
    showCarProvince: false,
    carCodeEnd: '',
    boardType: 1,
    carnum: '',
    showKeyboard: false,
  },
  inputCarNum() {
    this.setData({
      showKeyboard: true
    })
  },
  onOk(e) {
    // console.log(e.detail, '输入的车牌号');
    this.setData({
      carnum: e.detail,
      showKeyboard: false
    })
  },
  onCancel() {
    this.setData({
      showKeyboard: false
    })
  },
  /* onFocusCarCode() {
    const that = this
    wx.hideKeyboard({
      complete: res => {
        console.log('hideKeyboard res', res)
        that.setData({
          showKeyBoard: true
        })
      }
    })
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
  }, */
  checkCost() {
    if (!this.data.carnum) {
      Dialog.alert({
        title: '提示',
        message: '请输入有效车牌号！'
      })
      return;
    }
    const {
      carnum
    } = this.data;
    /*     wx.setStorageSync('carCodeEnd', carCodeEnd)
        wx.setStorageSync('carProvince', carProvince)
        wx.setStorageSync('carCity', carCity) */

    getFeeInfo({
      plateNo: carnum
    }).then(res => {
      if (res.success) {
        wx.setStorageSync('parkInfo', res.data)
        if (res.data.payable === 0) {
          Dialog.alert({
            title: '提示',
            message: '您当前时刻没有未缴费用，请直接前往停车场出口！'
          })
        } else {
          wx.navigateTo({
            url: '/pages/parkInfo/park',
          })
        }
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
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  showSheet() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  /* getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }, */
  uploadPiao() {
    wx.navigateTo({
      url: '/pages/points/points',
    })
  },
  onLoad: function () {
    // 在没有 open-type=getUserInfo 版本的兼容处理 必须使用 button open-type 让用户主动授权才可以success
    wx.getUserInfo({
      success: res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      },
      complete(res) {
        console.log(res);
      }
    })
    // 注册页面获取微信手机号时候调用获取手机号接口出现sessionKey不存在就是因为loginCode失效导致的这里保险起见每次都重新拿loginCode (临时解决问题的方案，不是最好的方式)
    /* wx.login({
      success: res => {
        wx.setStorageSync('loginCode', res.code)
        getOpenid(res.code).then(res => {
          if (res.success) {
            wx.setStorageSync('openid', res.data.openid)
            wx.setStorageSync('user', res.data.user || 0)
          }
        })
      }
    }) */
  },
  onShow: function () {
    // 获取用户openid & 是否注册
    const user = wx.getStorageSync('user')
    if (user && user.cellphone) {
      /*
      小程序注册 表示 手机号和微信绑定 所以有手机号不代表就在微信小程序注册过 有可能是在管理后台手动录入或者老系统导入进来的老数据（这2部分数据也有手机号，但是没有和微信绑定所以并不算注册）
      所以这里要查询api来判断
      /o2oMember/info params token：openid
      接口逻辑：1 没有手机号是新用户要去注册 2 有手机号但是没有openid 表示在其他地方填写的信息依然要重新再小程序注册，注册的过程就是拿手机号和微信openid绑定 3 有手机号且有openid代表真正的注册会员才可以进入会员信息页面
      */

    } else { // 根据session是否过期获取新的loginCode

    }

    /* const carProvince = wx.getStorageSync('carProvince') || '苏'
    const carCity = wx.getStorageSync('carCity') || 'K'
    const carCodeEnd = wx.getStorageSync('carCodeEnd') || ''
    this.setData({
      carProvince,
      carCity,
      carCodeEnd
    }); */
  },
})