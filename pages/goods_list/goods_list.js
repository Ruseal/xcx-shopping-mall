import { request } from '../../request/index'
Page({
  data: {
    tabs: [
      "综合", "销量", "价格"
    ],
    goodsList: [],
    hasNotMore: false,
  },
  queryData: [],
  sumTotal: 1,

  onLoad(options) {
    const { cid } = options
    this.queryData = {
      query: "",
      cid,
      pagenum: 1,
      pagesize: 10
    }
    this.getGoodsList()
  },
  async getGoodsList() {
    const { data: { message: { goods, total } } } = await request({ url: "/goods/search", data: this.queryData })
    this.sumTotal = (~~(total / this.queryData.pagesize))
    this.setData({
      goodsList: [...this.data.goodsList, ...goods]
    })
    wx.stopPullDownRefresh()
  },
  onReachBottom() {
    if (this.queryData.pagenum > this.sumTotal) {
      this.setData({
        hasNotMore: true,
      })
    } else { 
      this.queryData.pagenum++
      this.getGoodsList()
    }
  },
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.queryData.pagenum = 1
    this.getGoodsList()
  }

})