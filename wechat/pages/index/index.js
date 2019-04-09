let app =  getApp();
Page ({
  data: {
    hotSearchKeywords: [
      '怪物猎人',{}
    ],
    colors: [
      "bg-gradual-red",
      "bg-gradual-orange",
      "bg-gradual-green",
      "bg-gradual-blue",
      "bg-gradual-purple",
      "bg-gradual-pink"
    ],
    curColor: "bg-gradual-green",
    game: [
      {
        "name": "夺位者 中文版",
        "logo": "http://cdn.u1.huluxia.com/g1/M00/B2/D0/wKgBB1aeVKGAfWwNAAAmLJIM8YM96.jpeg",
        "type": "策略攻防",
        "size": 215347099,
        "downUrl": "http://cdn.bdcloud.huluxia.com/game/2019/04/06/lg.9084(1.2.12.0)Gecma2yo.hpk"
      }
    ]
  },
  onShow() {
    {
      let arr = this.data.colors
      const ranDom = () => Math.floor(Math.random() * arr.length)
      this.setData({
        curColor: arr[ranDom()]
      })
      let tmp = this.data.game
      for (let i =0;i<10;i++) {
        tmp.push({
          "name": "夺位者 中文版",
          "logo": "http://cdn.u1.huluxia.com/g1/M00/B2/D0/wKgBB1aeVKGAfWwNAAAmLJIM8YM96.jpeg",
          "type": "策略攻防",
          "size": 215347099,
          "downUrl": "http://cdn.bdcloud.huluxia.com/game/2019/04/06/lg.9084(1.2.12.0)Gecma2yo.hpk"
        })
      }
      this.setData({
        game: tmp
      })
    }
  } 
})