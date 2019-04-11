let http = require('../../utils/http')
Page({
  data: {
    hot: {},
    fList: [],
    active: {menu: null}
  },
  onLoad() {
    let that = this,dd = http.data,arr = [
      'blue',
      'red',
      'orange',
      'yellow',
      'olive',
      'green',
      'cyan',
      'purple',
      'mauve',
      'pink',
      'brown',
      'black'
    ]
    {
      that.setData({
        active: {
          menu: 'forum'
        }
      })
    }
    const ranDom = () => arr[Math.floor(Math.random() * (arr.length - 1))] 
    {
      // hot
      http.Ajax({
        url: `${http.test}/category/list/ANDROID/2.0`,
        data: dd,
        success(data) {
          // postInfo
          {
            let tmp = data.postInfo,e = '' 
              {
                let a = new Date(),
                    b = new Date(tmp.activeTime),
                    c = a - b,
                    d = Math.floor(c / 1000 / 60)
                e = `${d}分钟前`
              }
            tmp.activeTime = e
            that.setData({
              hot: tmp
            })
          }
          // 论坛列表
          {
            let tmp = data.categories
            tmp.splice(0,3)
            tmp.splice(tmp.length-3,1)
            for (let i=0; i<tmp.length; i++) {
              let b = ranDom()
              tmp[i].color = b
            }
            that.setData({
              fList: tmp
            })
          }
        }
      })
    }
  }
})