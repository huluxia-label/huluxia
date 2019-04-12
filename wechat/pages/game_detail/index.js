let http = require('../../utils/http')
let app = getApp();
Page({
  data: {
    game: {},
    status: 'info',
    comments: [],
    appdescOpen: false,
    imgStatus: false,
    imgURL: 'https://i.loli.net/2019/04/03/5ca461c349388.png'
  },
  onLoad() {
    let that = this,
      url = `${http.dev}/game/detail/ANDROID/3.6`,
      data = {
        app_id: app.globalData.gameId,
        start: 0,
        count: 20
      }
    http.Ajax({
      url: url,
      data: data,
      success(data) {
        data.gameinfo.apptags = data.gameinfo.apptags.split(',')
        data.gameinfo.appdesc = data.gameinfo.appdesc.replace(/<br \/>/g, '\n')
        data.gameinfo.appsize = data.gameinfo.appsize + 'MB'
        data.gameinfo.appcrackdesc = data.gameinfo.appcrackdesc.replace(/<br \/>/g, '\n')
        that.setData({
          game: data
        })
      }
    })
    http.Ajax({
      url: `${http.dev}/game/comment/good/list/ANDROID/3.6`,
      data: data,
      success(data) {
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
  },
  // zoomIMG(e) {
  //   console.log('type in message')
  //   // this.setData({
  //   //   imgURL: e.currentTarget.dataset.img,
  //   //   imgStatus: true
  //   // })
  // }
})