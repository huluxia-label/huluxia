// 网络请求封装
let that = this,
  tools = 'https://tools.huluxia.com',
  floor = 'https://floor.huluxia.com',
  test = 'http://localhost:7000',
  dev = 'http://localhost:8000',
  data = {
    platform: 2,
    gkey: 440000,
    app_version: '3.5.0.88.3',
    versioncode: 20141400,
    market_id: 'floor_web'
  }
function Ajax(obj) {
  wx.request({
    // url: 'https://cors-anywhere.herokuapp.com/'+(obj.url ? obj.url : 'http://floor.huluxia.com'),
    url: (obj.url ? obj.url : 'http://floor.huluxia.com'),
    method: obj.method ? obj.method.toUpperCase() : 'GET',
    header: {
      'content-type': 'application/JSON',
      'x-requested-with': 'XMLHttpRequest'
    },
    data: obj.data ? obj.data : '',
    success(data) {
      wx.showLoading({
        title: '加载中..',
        mask: true
      })
      let asynC = setInterval(()=>{
        if (data.statusCode == 200) {
          clearInterval(asynC)
          obj.success(data.data)
          wx.hideLoading()
        }
      },100)
    },
    fail() {
      wx.showToast({
        title: "连接服务器失败"
      });
    }
  })
}
module.exports = {
  Ajax: Ajax,
  tools: tools,
  floor: floor,
  test: test,
  dev: dev,
  data: data
}