App ({
  globalData: {
    gameId: 0
  },
  onLaunch () {
    // 使用自定义控件
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  text(e) {
    console.log(e)
  }
})