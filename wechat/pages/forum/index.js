Page ({
  data: {
    hot: {
      score: 10,
      title: "每日一分享-美图",
      detail: "测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本",
      name: "陈某",
      time: '5分钟前',
      eyes: 120,
      common: 80
    },
    fList: [
      {
        name: '三楼活动',
        logo: 'http://cdn.u2.huluxia.com/g3/M01/FC/00/wKgBOVuFQ3SADzhKAAAOLa2biTo477.png',
        id: 30,
        color: 'blue',
        hot: '100万',
        post: '200万'
      }
    ]
  },
  onReady() {
    let a = this.data.fList
    for (let i=0; i< 25; i++) {
      a.push({
        name: '三楼活动',
        logo: 'http://cdn.u2.huluxia.com/g3/M01/FC/00/wKgBOVuFQ3SADzhKAAAOLa2biTo477.png',
        id: 30,
        color: 'blue',
        hot: '100万',
        post: '200万'
      })
    }
    let arr = [
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
    const ranDom = ()=> arr[Math.floor(Math.random()*(arr.length-1))]
    for (let i=0;i<a.length;i++) {
      a[i].color = ranDom()
    }
    this.setData({
      fList: a
    })    
  }
})