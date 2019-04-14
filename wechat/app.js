App ({
  globalData: {
    gameId: 0,
    forumId: 43,
    postId: 0
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
  goTo (e) {
    wx.navigateTo({
      url: `./pages/${e}`
    });
  },
  backTo (num) {
    num ? wx.navigateBack({
      delta: num
    }) :  wx.navigateBack({
      delta: 1
    });
  }
})