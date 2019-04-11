let http = require('../../utils/http')
let app =  getApp();
Page({
  data: {
    game: {},
    status: 'info',
    comments: [],
    appdescOpen: false
  },
  onLoad() {
    let dd = http.data,that = this
    dd.app_id = app.globalData.gameId
    let tmp = dd, url = `${http.dev}/game/detail/ANDROID/3.6`
    tmp.start = 0
    tmp.count = 20
    http.Ajax({
      url: url,
      data: dd,
      success(data) {
        data.gameinfo.apptags = data.gameinfo.apptags.split(',')
        data.gameinfo.appdesc = data.gameinfo.appdesc.replace(/<br \/>/g,'\n')
        data.gameinfo.appsize = data.gameinfo.appsize + 'MB'
        data.gameinfo.appcrackdesc = data.gameinfo.appcrackdesc.replace(/<br \/>/g,'\n')
        that.setData({
          game: data
        })
      }
    })
    http.Ajax({
      url: `${http.dev}/game/comment/good/list/ANDROID/3.6`,
      data: tmp,
      success(data) {
        console.log(data)
        that.setData({
          comments: data.comments
        })
      }
    })
  },
  checkCard(e) {
    this.setData({
      status: e.target.dataset.open
    })
  },
  appOpen() {
    this.setData({
      appOpen: !this.data.appOpen
    })
  },
  backTo() {
    wx.navigateBack()
  },
  downUrl(e) {
    wx.setClipboardData({
      data: e.target.dataset.url
    })
  }
})