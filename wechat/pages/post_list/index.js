let app = getApp(),
  http = require('../../utils/http'),
  utils = require('../../utils/format')
Page({
  data: {
    data: null
  },
  onLoad() {
    let that = this
    http.Ajax({
      url: `${http.test}/post/list/ANDROID/2.1`,
      data: {
        cat_id: app.globalData.forumId
      },
      success(data) {
        data.category.description = '\n' + data.category.description
        for (let i = 0; i < data.posts.length; i++) {
          let tmp = data.posts[i].activeTime,
            tmp2 = utils.time(tmp)
          data.posts[i].activeTime = tmp2
        }
        that.setData({
          data: data
        })
      }
    })
  },
  backTo() {
    wx.navigateBack({
      delta: 1
    });
  },
  zoomIMG(e) {
    this.setData({
      imgURL: e.currentTarget.dataset.img,
      imgStatus: true
    })
  }
})