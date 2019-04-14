Page({
  data: {
    item: [
      {
        icon: 'https://img.icons8.com/dusk/64/000000/picture.png',
        title: '个性装扮',
        url: 'mm/index'
      },
      {
        icon: 'https://img.icons8.com/dusk/64/000000/support.png',
        title: '活动',
        url: 'activity/index'
      },
      {
        icon: 'https://img.icons8.com/dusk/64/000000/bookmark.png',
        title: '关于作者',
        url: 'about/index'
      }
    ],
    active: {
      menu: null
    }
  },
  onLoad() {
    this.setData({
      active: {
        menu: 'home'
      }
    })
  },
  goTo(e) {
    wx.navigateTo({
      url: `../${e.currentTarget.dataset.url}`,
    });
  }
})