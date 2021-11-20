import { request } from '../../request/index'
Page({
  data: {
    swiperList: [],
    categoryList: [],
    floorList:[]
  },
  onLoad() {
    this.getSwiperList()
    this.geCategoryList()
    this.getFloorList()
  },
  async getSwiperList() {
    const { data } = await request({ url: '/home/swiperdata' })
    this.setData({
      swiperList: data.message
    })
  },
  async geCategoryList() {
    const { data } = await request({ url: '/home/catitems' })
    this.setData({
      categoryList: data.message
    })
  },
  async getFloorList() {
    const { data } = await request({ url: '/home/floordata' })
    this.setData({
      floorList: data.message
    })
  }
});
