import { request } from '../../request/index'
Page({
  data: {
    goods: [],
    isCancel: true,
    value: ''
  },
  timer: null,
  handleChange(e) {
    const { value } = e.detail
    if (!value.trim()) {
      this.setData({
        isCancel: true,
        goods: [],
        value: ''
      })
      return
    }
    this.setData({
      isCancel: false
    })
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.queryMethod(value)
    }, 1000)

  },
  handleTap() {
    this.setData({
      value: "",
      goods: [],
      isCancel: true,
    })
  },
  async queryMethod(query) {
    const { data: { message } } = await request({ url: `/goods/qsearch?query=${query}` })
    this.setData({
      goods: message
    })
  }

})