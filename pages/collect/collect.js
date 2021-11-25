// pages/order/order.js
Page({
  data: {
    tabs: ['收藏的店铺', '收藏的商品', '关注的商品', '我的足迹'],
    collect: []
  },
  
  onShow() {
    const pages = getCurrentPages();
    let { type } = pages[pages.length - 1].options
    this.selectComponent(".tabs").setData({
      currentIndex: parseInt(type) - 1
    })
    const collect = wx.getStorageSync('collect') || []
    this.setData({
      collect
    }) 
  },
})