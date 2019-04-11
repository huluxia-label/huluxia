Page({
  data: {
    item: [
      {
        icon: 'circle',
        title: '买定离手'
      },
      {
        icon: 'discover',
        title: '个性装扮'
      },
      {
        icon: 'selection',
        title: '礼物兑换中心'
      },
      {
        icon: 'explore',
        title: '活动'
      },
      {
        icon: 'service',
        title: '关于作者😁'
      }
    ],
    active: {
      menu: null
    }
  },
  onLoad() {
    this.setData({
      active: {
        menu: 'find'
      }
    })
  }
})