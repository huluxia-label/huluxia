let http = require('../../utils/http'),
    app = getApp()
Page ({
  onLoad() {
    let that = this
    http.Ajax({
      url: `${http.test}/activity/list/ANDROID/2.1`,
      data: {
        count: 20
      },
      success(data) {
        that.setData({
          data: data.list
        })
      }
    })
  },
  webview(e) {
    app.globalData.webview = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '../webview/index'
    });
  }
})