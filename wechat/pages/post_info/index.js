let app =  getApp(),
    http = require('../../utils/http'),
    utils = require('../../utils/format'),
    url = `${http.test}/post/detail/ANDROID/2.3`
Page ({
  data: {
    data: null,
    start: 1,
    total: 1,
    size: 20,
    up: '',
    imgStatus: false,
    imgURL: ''
  },
  onLoad() {
    console.log(app.globalData)
    let that = this
    http.Ajax({
      url: url,
      data: {
        post_id: app.globalData.postId,
        post_size: that.data.size,
        page_no: that.data.start
      },
      success(data) {
        that.setData({
          data: data,
          total: data.totalPage,
          up: data.post.user.nick
        })
      }
    })
  },
  onPullDownRefresh() {
    let that = this
    wx.showNavigationBarLoading()
    http.Ajax({
      url: url,
      data: {
        post_id: app.globalData.postId
      },
      success(data) {
        that.setData({
          data: data
        })
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  onReachBottom() {
    let that = this
    if (that.data.start >= that.data.totalPage) return
    that.setData({
      start: that.data.start+1
    })
    http.Ajax({
      url: url,
      data: {
        post_id: app.globalData.postId,
        page_size: that.data.size,
        page_no: that.data.start
      },
      success(data) {
        let tmp = that.data.data.comments,
            tmp1 = tmp.concat(data.comments)
        console.log(tmp1)    
        that.setData({
          data: {
            comments: tmp1
          }
        })
      }
    })
  },
  zoom(e) {
    console.log(e)
    this.setData({
      imgStatus: true,
      imgURL: e.currentTarget.dataset.img
    })
  },
  backTo() {
    wx.navigateBack({
      delta: 1
    });
  }
})