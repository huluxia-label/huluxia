let http = require('../../utils/http'),
    app =  getApp()
Page ({
  data: {
    hotSearchKeywords: {
      in: '怪物猎人'
    },
    hotTag: [],
    colors: [
      "bg-gradual-red",
      "bg-gradual-orange",
      "bg-gradual-green",
      "bg-gradual-blue",
      "bg-gradual-purple",
      "bg-gradual-pink"
    ],
    curColor: "bg-gradual-green",
    game: [],
    active: {
      menu: null
    }
  },
  onLoad() {
    let that = this
    {
      // bar显示
      that.setData({
        active: {
          menu: 'index'
        }
      })
    }
    {
      // 搜索框hot
      http.Ajax({
        url: `${http.dev}/search/suggest/ANDROID/3.6`,
        success(data) {
          that.setData({
            hotSearchKeywords: {
              in: data.list[0]
            }
          })
        }
      })
    }
    {
      // 标签
      http.Ajax({
        url: `${http.dev}/game/navigator/ANDROID/3.7`,
        success(data) {
          that.setData({
            hotTag: data.btnlist
          })
        }
      })
    }
    {
      // 游戏推荐
      http.Ajax({
        url: `${http.dev}/bbs/recommend/ANDROID/3.6`,
        success(data) {
          that.setData({
            game: data.gameapps
          })
        }
      })
    }
  },
  navTo() {
    wx.navigateTo({
      url: '../search_game/index'
    })
  },
  gameDetail(e) {
    // 如果只是使用 target 来获取会报错,此时需要使用 currentTarget
    console.log(`你查询的游戏id为: ${e.currentTarget.dataset.id}`)
    app.globalData.gameId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../game_detail/index'
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
      
  }
})