let app = getApp(),
  http = require('../../utils/http'),
  utils = require('../../utils/format')
Page({
  data: {
    data: null,
    imgURL: 'http://cdn.u1.huluxia.com/g3/M01/B3/2A/wKgBOVyxkA-ATfZBAAC0c1N9dHU037.jpg',
    imgStatus: false
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
  zoom(e) {
    this.setData({
      imgURL: e.currentTarget.dataset.img,
      imgStatus: true
    })
  },
  postInfo(e) {
    app.globalData.postId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../post_info/index'
    });
  }
})