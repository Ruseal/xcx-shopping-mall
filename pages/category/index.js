import { request } from '../../request/index'
Page({ 
  data: {
    leftMenuList: [],
    rightMenuList: [],
    currentIndex: 0, 
    scrollTop:0
  },
  cateData: [],
  onLoad() {
    const cate = wx.getStorageSync('cate')
    if (!cate) {
      this.getCateData()
    } else {
      if (Date.now() - cate.time > 1000 * 10) {
        this.getCateData()
      } else {
        this.cateData = cate.data
        this.setData({
          leftMenuList: this.cateData.map(item => item.cat_name),
          rightMenuList: this.cateData.map(item => item.children)
        })
      }
    }
  },
  async getCateData() {
    const { data } = await request({ url: "/categories" })
    this.cateData = data.message
    wx.setStorageSync('cate', { time: Date.now(), data: this.cateData })
    this.setData({
      leftMenuList: this.cateData.map(item => item.cat_name),
      rightMenuList: this.cateData.map(item => item.children)
    })
  },
  toggleMenu(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      currentIndex: index,
      scrollTop:0
    })
  }

})