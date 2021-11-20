import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
  },
  detailInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDeatil(options.goods_id)
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
      cartInfo.push(this.detailInfo)
    } else {
      cartInfo[index].num++
    }
    wx.setStorageSync('cart', cartInfo)
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mssk: true
    })
  }

})