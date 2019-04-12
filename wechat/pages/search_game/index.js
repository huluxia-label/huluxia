let http = require('../../utils/http'),
  app = getApp()
Page({
  data: {
    hots: [],
    valueInit: '',
    searchHistory: [],
    searchStatus: false
  },
  onLoad() {
    let that = this
    http.Ajax({
      url: `${http.dev}/search/recommend/list/ANDROID/3.6`,
      success(data) {
        that.setData({
          hots: data
        })
      }
    })
    let b = wx.getStorageSync('search_history') || []
    that.setData({
      searchHistory: b
    })
    console.log(that.data.searchHistory)
  },
  backTo() {
    wx.navigateBack({
      url: '../index/index'
    })
  },
  hotKeywords(e) {
    let data = e.currentTarget.dataset.keyword
    this.setData({
      valueInit: data
    })
  },
  searchEnter(e) {
    let local = wx.getStorageSync('search_history') || [],
        that = this
    that.setData({
      valueInit: e.detail.value,
      searchHistory: local,
      searchStatus: true
    })
    for (let i=0; i<local.length; i++) {
      if (local[i] == that.data.valueInit) {
        local.splice(i,1)
      }
    }
    local.unshift(that.data.valueInit)
    wx.setStorageSync('search_history',local)
    // ajax
    http.Ajax({
      url: `http://search.huluxia.com/game/search/ANDROID/1.1`,
      data: {
        keyword: e.detail.value
      },
      success(data) {
        that.setData({
          game: data.gameapps
        })
      }
    })
  },
  removeHistory() {
    wx.setStorageSync('search_history','')
    this.setData({
      searchHistory: ''
    })
  },
  searchInput(e) {
    if (!e.detail.value) this.setData({
      searchStatus: false
    })
  },
  downGame(e) {
    wx.setClipboardData({
      data: e.target.dataset.url,
      success: (result) => {
        console.log(`${e.target.dataset.url} 复制成功!`)
      },
      fail: () => {},
      complete: () => {}
    });
  },
  gameDetail(e) {
    // 如果只是使用 target 来获取会报错,此时需要使用 currentTarget
    console.log(`你查询的游戏id为: ${e.currentTarget.dataset.id}`)
    app.globalData.gameId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../game_detail/index'
    })
  },
})