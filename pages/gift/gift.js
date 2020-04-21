import { sign, getSign } from '../../api/api'
// 时间处理 计算本月开始-结束日期
const now = new Date()
const nowYear = now.getFullYear()
const nowMonth = now.getMonth()
//获得某月的天数
function getMonthDays(myMonth) {
  var monthStartDate = new Date(nowYear, myMonth, 1);
  var monthEndDate = new Date(nowYear, myMonth + 1, 1);
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}
//获得本月的开始日期
function getMonthStartDate() {
  var monthStartDate = new Date(nowYear, nowMonth, 1);
  return monthStartDate.getTime();
}
//获得本月的结束日期
function getMonthEndDate() {
  var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
  return monthEndDate.getTime();
}

Page({
  data: {
    minDate: getMonthStartDate(),
    maxDate: getMonthEndDate(),
    formatter(day) {
      const date = day.date.getDate();
      day.type = 'disabled'
      if (date === new Date().getDate()) {
        day.text = '今天'
      }
      return day
    },
    isSignedToday: false
  },
  
  sign() {
    sign().then(res => {
      if (res.success) {
        wx.showToast({
          title: '签到成功',
        })
        this.setData({
          isSignedToday: true,
          formatter: function(day) { // 当天日期seleted
            const date = day.date.getDate();
            if (date === new Date().getDate()) {
              day.type = 'selected'
              day.bottomInfo = '已签到'
            } else {
              day.type = 'disabled'
            }
            if (date === new Date().getDate()) {
              day.text = '今天'
            }
            return day
          }
        })
      }
    })
  },
  onLoad: function (options) {
    getSign().then(res => {
      if (res.success) {
        const daysOfCurrentMonth = res.data ? res.data.daysOfCurrentMonth : []

        this.setData({
          formatter: function(day) {
            const date = day.date.getDate();
            if (daysOfCurrentMonth.includes(date)) {
              day.type = 'selected'
              day.bottomInfo = '已签到'
            } else {
              day.type = 'disabled'
            }
            if (date === new Date().getDate()) {
              day.text = '今天'
            }
            return day
          },
          isSignedToday: daysOfCurrentMonth.includes(new Date().getDate())
        })
      }
    })
  }
})