Page ({
  data: {
    active: {
      menu: null
    }
  },
  onLaunch() {
    wx.getLaunchOptionsSync(e => {
      console.log(e)
    })
  },
  onLoad() {
    this.setData({
      active: {
        menu: 'home'
      }
    })
  }
})