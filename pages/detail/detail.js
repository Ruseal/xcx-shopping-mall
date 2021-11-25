import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    isCollect: false
  },
  detailInfo: {},
  async onShow() {
    const pages = getCurrentPages();
    let { goods_id } = pages[pages.length - 1].options
    await this.getDeatil(goods_id)
    const collect = wx.getStorageSync('collect') || []
    let isCollect = collect.some(item => item.goods_id === this.detailInfo.goods_id)
    this.setData({
      isCollect
    })
  },
  async getDeatil(goods_id) {
    const res = await request({ url: '/goods/detail', data: { goods_id } })
    this.detailInfo = res.data.message
    const { goods_name, goods_price, goods_introduce, pics } = this.detailInfo
    this.swiperList = pics
    this.setData({
      detailObj: { goods_name, goods_price, goods_introduce: goods_introduce.replace(/\.webp/g, '.jpg'), pics }
    })
  },
  previewImage(e) {
    const { url } = e.currentTarget.dataset
    const urls = this.detailInfo.pics.map(item => item.pics_mid)
    wx.previewImage({
      current: url,
      urls
    })
  },
  addCart() {
    let cartInfo = wx.getStorageSync('cart') || []
    let index = cartInfo.findIndex(item => item.goods_id === this.detailInfo.goods_id)
    if (index === -1) {
      this.detailInfo.num = 1
      this.detailInfo.isChecked = true
      cartInfo.push(this.detailInfo)
    } else {
      cartInfo[index].num++
    }
    wx.setStorageSync('cart', cartInfo)
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true
    })
  },
  handleChangeCollect() {
    const userInfo = wx.getStorageSync('user-info') || {}
    if (!Object.keys(userInfo).length) {
      wx.navigateTo({
        url: '../login/login',
      })
      return
    }
    const collect = wx.getStorageSync('collect') || []
    const index = collect.findIndex(item => item.goods_id === this.detailInfo.goods_id)
    if (index !== -1) {
      collect.splice(index, 1)
      this.setData({
        isCollect: false
      })
      wx.setStorageSync('collect', collect)
      return
    }
    collect.push(this.detailInfo)
    this.setData({
      isCollect: true
    })
    wx.setStorageSync('collect', collect)

  }

})