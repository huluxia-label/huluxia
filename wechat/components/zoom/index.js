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
    }
  }
})