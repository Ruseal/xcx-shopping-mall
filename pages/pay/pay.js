import { showModal, showToast } from '../../utils/promise-sync'
Page({

  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalCount: 0,
  },
  onShow() {
    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart') || []
    let totalPrice = 0
    let totalCount = 0
    cart.forEach(item => {
      if (item.isChecked) {
        totalPrice += item.goods_price * item.num
        totalCount += item.num
      }
    })
    let cekdCart = cart.filter(item => item.isChecked)
    this.setData({
      address,
      cart: cekdCart,
      totalPrice,
      totalCount
    })
  },
  async handlePay() {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '../auth/auth',
      })
      return
    }
    const res = await showModal({ title: '模拟支付', content: '是否支付金额' })
    if (!res.confirm) {
      await showToast({ title: '支付失败', icon: 'none' })
      return
    }
    await showToast({ title: '支付成功', icon: 'success' })
    const cart = wx.getStorageSync('cart')
    const newCart = cart.filter(item => !item.isChecked)
    wx.setStorageSync('cart', newCart)
    // ----------------------------
    const order = wx.getStorageSync('order') || []
    let num = order.length ? parseInt(order[0].serial_number.split(" ").pop()) + 1 : 1
    let serial_number = ('00000 00000 000000000' + num).slice(-22)
    let order_price = this.data.totalPrice
    let create_time = new Date(Date.now()).toLocaleString()
    let orderObj = {
      serial_number,
      order_price,
      create_time,
    }
    order.unshift(orderObj)
    wx.setStorageSync('order', order)
    wx.navigateTo({
      url: '../order/order?type=1',
    })
  }
})