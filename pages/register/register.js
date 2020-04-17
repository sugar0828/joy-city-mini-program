// pages/register/register.js
import Toast from '@vant/weapp/toast/toast.js';
import { getOpenid, getPhone, register } from '../../api/api'

Page({
  data: {
    name: '',
    phone: '',
    address: '',
    sex: '1',
    agree: true,
    openid: '',
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
  submitRegister() {
    const that = this
    const { name, phone, address, agree, userInfo, openid } = this.data
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
      "name": name,
      "cellphone": phone,
      "wxOpenId": openid,
      "wxNickeName": userInfo.nickName,
      "wxAvatarUrl": userInfo.avatarUrl,
      "wxGender": userInfo.gender,
      "wxCountry": userInfo.country,
      "wxProvince": userInfo.province,
      "wxCity": userInfo.city
    }).then(res => {
      Toast.clear()
      if (res.success) {
        wx.setStorageSync('openid', that.data.openid)
        Toast.success('注册成功')
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/vip/vip',
          })
        }, 2000);
      }
    })
  },
  getPhoneNumber(e) {
    const that = this
    const { encryptedData, iv } = e.detail
    const loginCode = wx.getStorageSync('loginCode')
    getOpenid(loginCode).then(data => {
      if (data.success) {
        that.setData({
          openid: data.data.openid
        })
        getPhone({
          encryptedData,
          iv,
          openid: data.data.openid
        }).then(res => {
          if (res.success) {
            that.setData({
              phone: res.data.phoneNumber
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* wx.login({
      success: (res) => {
        this.setData({
          loginCode: res.code
        })
      },
    }) */
    const openid = wx.getStorageSync('openid')
    if (openid) { // has been registed
      wx.navigateTo({
        url: '/pages/vip/vip',
      })
    } else {
      wx.getUserInfo({
        success: (res) => {
          this.setData({
            userInfo: res.userInfo
          })
        },
      })
    }  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})