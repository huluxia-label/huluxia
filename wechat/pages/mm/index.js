let http = require('../../utils/http')
Page ({
  data: {
    data: null
  },
  onLoad() {
    let that = this
    http.Ajax({
      url: `${http.test}/space/list/ANDROID/2.1`,
      data: {
        count: 20,
        start: 1,
        _key: 'E54BA81041B8FF22DDEC9ECA8D0A563C99C2270F0AFD67589700E16D620349A6A04D31FBBACB82E60FD3749501F5D0C6C047C0E2FFC29D93'
      },
      success(data) {
        that.setData({
          data: data.spacelist
        })
      }
    })
  },
  zoom(e){
    this.setData({
      imgURL: e.currentTarget.dataset.img,
      imgStatus: true
    })
  }
})