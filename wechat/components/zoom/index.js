Component({
  properties: {
    url: {
      type: String,
      value: 'https://i.loli.net/2019/04/03/5ca461c349388.png'
    },
    event: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onOpen() {
      this.setData({
        event: false
      })
    },
    down() {
      let src = this.data.url
          wx.downloadFile({
            url: src,
            success: (result) => {
              console.log(result)
              wx.showToast({
                title: `下载成功\n${result}`,
                icon: 'success',
                duration: 1500,
                mask: true
              });
            },
            fail: () => {},
            complete: () => {}
          });
        
    }
  }
})