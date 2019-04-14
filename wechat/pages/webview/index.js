let app = getApp()
Page ({
  data: {
    url: ''
  },
  onLoad() {
    this.setData({
      url: app.globalData.webview
    })
  }
})