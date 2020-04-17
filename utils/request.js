// import { login } from '../api/info'

const config = {
  APP_ID: 'wxe78571878ff448db',
  SYSTEM_CODE: 'FACEPAY-MALL',
  SERVICE_URL: 'https://bis.yzjoycity.com/api'
}

// 不需要 token 白名单
const whiteList = [
  '/api/login',
  // 首页接口
  '/api/index/category'
]

/**
 * @description request 封装
 * @param {Object} options 
 * @returns {Promise}
 */
const request = async (url, params, options) => {

  // 必要参数注入 header
  /* const header = {
    BoundContext: config.SYSTEM_CODE,
    ...options.header
  };

  if (whiteList.findIndex(i => {return i === url}) === -1) {
    let token = wx.getStorageSync('token')
    if (!token) {
      token = await login()
      if (!token) return
      wx.setStorage({
        key: 'token',
        data: token
      })
    }
    header.Authorization = token
  } */
  
  wx.showLoading({
    title: '数据读取中...',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.SERVICE_URL + url,
      data: params,
      // header: header,
      method: options.method || 'GET',
      success(res) {
        const isSuccess = isHttpSuccess(res.statusCode);

        if (isSuccess) { // 成功的请求状态
          resolve(res.data);
        } else {
          if (res.data.code === 401) { // 身份验证失败
            // wx.removeStorageSync('token')
            wx.showToast({
              title: '身份验证失败，请重新尝试',
              icon: 'none'
            })
            reject(res.data);
          } else if (res.data.code === 402) { // 登录已过期
            // wx.removeStorageSync('token')
            wx.showToast({
              title: '登录已过期，请重新尝试',
              icon: 'none'
            })
            reject(res.data);
          }
          reject(res.data);
        }
      },
      fail(err) {
        reject(err);
      },
      complete() {
        wx.hideLoading()
      },
      ...options
    });
  })
}

/**
 * 判断请求状态是否成功
 * @param {number} status http状态码
 * @returns {Boolean}
 */
function isHttpSuccess(status) {
  return status >= 200 && status < 300 || status === 304;
}

export default {
  post(url, params, options = {}) {
    return request(url, params, { method: 'POST', ...options})
  },
  get(url, params, options = {}) {
    return request(url, params, { method: 'GET', ...options})
  }
}