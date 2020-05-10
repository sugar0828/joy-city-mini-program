import Dialog from '@vant/weapp/dialog/dialog'

Page({
  data: {
    photo: '',
    showUpload: false,
    uploadOk: false
  },
  takePhoto() {
    const self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        self.setData({
          photo: res.tempFilePaths,
          showUpload: true,
          uploadOk: false
        });
      }
    })
  },
  upload() {
    const that = this
    wx.showLoading({
      title: '上传中，请稍后',
    })
    wx.uploadFile({
      url: 'https://bis.yzjoycity.com/api/o2oTicketAudit/upload',
      filePath: that.data.photo[0],
      name: 'file',
      header: {
        token: wx.getStorageSync('openid')
      },
      success(res){
        // const data = res.data
        if (res.statusCode === 200 && res.errMsg === "uploadFile:ok") {
          Dialog.alert({
            title: '提示',
            message: '上传成功，客服后台验证后积分计入您的账户'
          })
          that.setData({
            showUpload: false,
            uploadOk: true
          })
        }
      },
      fail() {
        wx.showToast({
          title: '上传失败，请重试',
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  }
})