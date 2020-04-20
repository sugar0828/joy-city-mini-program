// pages/register/register.js
import Toast from '@vant/weapp/toast/toast.js';
import { getPhone, register } from '../../api/api'

const openid = wx.getStorageSync('openid')

Page({
  data: {
    name: '',
    phone: '',
    address: '',
    sex: '1',
    agree: true,
    openid,
    userInfo: {},
    sessionKey: ''
  },
  bindGetUserInfo(e) {
    const {
      userInfo
    } = e.detail
    this.setData({
      userInfo
    })
  },
  onChangeName(e) {
    this.setData({
      name: e.detail
    })
  },
  onChangeAddress(e) {
    this.setData({
      address: e.detail
    })
  },
  onChangeSex(event) {
    this.setData({
      sex: event.detail
    });
  },
  toPointDesc() {
    wx.navigateTo({
      url: '/pages/pointDesc/pointDesc',
    })
  },
  checkboxChange(e) {
    this.setData({
      agree: !!e.detail.value[0]
    })
  },
  getPhoneNumber(e) {
    const that = this
    const { encryptedData, iv } = e.detail
    getPhone({
      encryptedData,
      iv,
      openid
    }).then(res => {
      if (res.success) {
        that.setData({
          phone: res.data.phoneNumber
        })
      }
    })
  },
  submitRegister() {
    const { name, phone, address, agree, userInfo } = this.data

    if (!agree) {
      Toast('请阅读并同意积分章程')
      return
    }
    if (!name) {
      Toast('请输入姓名')
      return
    }
    if (!phone) {
      Toast('请授权获取手机号')
      return
    }
    if (!address) {
      Toast('请输入地址')
      return
    }
    if (!userInfo.nickName || !userInfo.avatarUrl) {
      Toast('请点击获取昵称头像信息')
      return
    }

    Toast.loading({
      mask: false,
      message: '提交中...'
    });

    register({
      name,
      address,
      cellphone: phone,
      wxOpenId: openid,
      wxNickeName: userInfo.nickName,
      wxAvatarUrl: userInfo.avatarUrl,
      wxGender: userInfo.gender,
      wxCountry: userInfo.country,
      wxProvince: userInfo.province,
      wxCity: userInfo.city
    }).then(res => {
      Toast.clear()
      if (res.success) {
        wx.setStorageSync('openid', openid)
        wx.setStorageSync('user', res.data)
        Toast.success('注册成功')
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/vip/vip',
          })
        }, 1500);
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('user') && wx.getStorageSync('user').cellphone) { // has been registed
      wx.navigateTo({
        url: '/pages/vip/vip',
      })
    } else {
      wx.getUserInfo({
        lang: 'zh_CN',
        success: (res) => {
          this.setData({
            userInfo: res.userInfo
          })
        },
      })
    }  
  }
})