import { showModal } from '../../utils/promise-sync'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [
      {
        name: '全部订单',
        icon: '../../acssts/image/user/order.png'
      },
      {
        name: '待付款',
        icon: '../../acssts/image/user/await.png'
      },
      {
        name: '待收货',
        icon: '../../acssts/image/user/await_goods.png'
      },
      {
        name: '退款',
        icon: '../../acssts/image/user/refund.png'
      }
    ],
    collectList: ['收藏的店铺', '收藏的商品', '关注的商品', '我的足迹'],
    userInfo: {},
    collectCount: 0
  },

  onShow() {
    const userInfo = wx.getStorageSync('user-info').userInfo || {}
    const collectCount = wx.getStorageSync('collect').length
    this.setData({
      userInfo,
      collectCount
    })
  },
  toLogin() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  async exitLogin() {
    const { userInfo } = this.data
    if (!Object.keys(userInfo).length) return
    const res = await showModal({ title: '提示', content: '是否退出登入' })
    if (!res.confirm) return
    wx.removeStorageSync('user-info')
    this.setData({
      userInfo: {}
    })
  }
})