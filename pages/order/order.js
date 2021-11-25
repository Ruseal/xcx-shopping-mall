// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部', '待付款', '待收货', '退款'],
    order: []
  },
  
  onShow() {
    const pages = getCurrentPages();
    let { type } = pages[pages.length - 1].options
    this.selectComponent(".tabs").setData({
      currentIndex: parseInt(type) - 1
    })
    const order = wx.getStorageSync('order') || []
    this.setData({
      order
    }) 
  },
})