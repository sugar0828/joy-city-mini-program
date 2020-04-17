
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
      const signList = [2, 3, 7]
      if (signList.includes(date) ) {
        day.type = 'selected'
        day.bottomInfo = '已签到'
      } else {
        day.type = 'disabled'
      }
      return day
    }
  },
  onLoad: function (options) {

  },
  onConfirm(event) {
    console.log(event);
    
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  }
})