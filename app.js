import { getOpenid } from './api/api'

App({
  onLaunch: function () {
    /*
    小程序注册 表示 手机号和微信绑定 所以有手机号不代表就在微信小程序注册过 有可能是在管理后台手动录入或者老系统导入进来的老数据（这2部分数据也有手机号，但是没有和微信绑定所以并不算注册）
    所以这里要查询api来判断
    /o2oMember/info params token：openid
    接口逻辑：1 没有手机号是新用户要去注册 2 有手机号但是没有openid 表示在其他地方填写的信息依然要重新再小程序注册，注册的过程就是拿手机号和微信openid绑定 3 有手机号且有openid代表真正的注册会员才可以进入会员信息页面
    */
    /* 之前获取login code的逻辑放在index页面，但是出现一种情况无法满足，导致授权获取手机号接口报错：sessionkey不存在。如果用户从公众号进入小程序，但是是直接进入pages/vip/vip，导致无法获取login code。 所以 这个逻辑要在小程序launch时候执行 */
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
  },
  globalData: {
    userInfo: null,
    loginCode: ''
  }
})