import { getFeeRecordsList } from '../../api/api'

Page({
  data: {
    total: 0,
    records: [],
    searchData: {
      current: 1,
      size: 10
    }
  },
  getList(type) {
    getFeeRecordsList(this.data.searchData).then(res => {
      wx.stopPullDownRefresh();
      if (res.success) {
        const { total = 0, records = [] } = res.data
        this.setData({
          total,
          records: type === 'reload' ? records : this.data.records.concat(records)
        })
      }
    })
  },
  onLoad: function (options) {
    this.getList('reload')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      searchData: {
        current: 1,
        size: 10
      }
    })
    this.getList('reload')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      searchData: {
        current: this.data.searchData.current + 1,
        size: 10
      }
    })
    this.getList()
  }
})