Page ({
  data: {
    upPost: [
      {
        text: '测试文字测试文字测试文字测试文字',
        id: 111
      }
    ],
    tabs: [
      {
        text: '全部',
        id: 11
      },
      {
        text: '绿色软件',
        id: 4
      },
      {
        text: '原创工具',
        id: 5
      },
      {
        text: '人才',
        id: 666
      }
    ],
    lists: [
      {
        
      }
    ]
  },
  onLoad() {
    let that = this,
        data = that.data.upPost
    for (let i=0; i<5; i++) {
      data.push({
        text: 'eyes',
        id: 222
      }) 
    }
    that.setData({
      upPost: data 
    })
  }
})