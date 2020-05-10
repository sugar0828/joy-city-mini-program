const config = {
  APP_ID: 'wxe78571878ff448db',
  SERVICE_URL: 'https://bis.yzjoycity.com/api',
  // SERVICE_URL: 'http://47.96.21.77:8888/api'
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
  const openid = wx.getStorageSync('openid')
  const header = {
     token: openid,
      ...options.header
  };
  wx.showLoading({
    title: options.toastMsg || '数据读取中...',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.SERVICE_URL + url,
      data: params,
      method: options.method || 'GET',
      success(res) {
        const isSuccess = isHttpSuccess(res.statusCode);
        if (isSuccess) { // 成功的请求状态
          if (res.data.code !== 200) {
            wx.hideLoading({
              complete: () => {
                if (!options.noErrorToast) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                  })
                }
              },
            })
          }
          if (res.data.code === 403) { // 无权限访问
            return
            try {
              wx.clearStorageSync() // 清空数据缓存
              wx.reLaunch({
                url: '/pages/index/index',
              })
            } catch (error) {
              wx.showToast({
                title: '缓存清除失败，请尝试重启小程序',
              })
            }
          }
          resolve(res.data);
        } else {
          reject(res.data)
        }
      },
      fail(err) {
        reject(err);
      },
      complete() {
        wx.hideLoading()
      },
      ...options,
      header: header
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