import { showModal, showToast } from '../../utils/promise-sync.js'
Page({

  data: {
    address: {},  
    cart: [], 
    selectAll: true,
    totalPrice: 0, 
    totalCount: 0, 
    modalBuffer: true
  },
  onShow() {
    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart') || []
    this.setData({
      address
    })
    this.updateCart(cart)
  },
  handleAddress() {
    wx.chooseAddress({
      success: (result) => {
        result.joinAddress = result.provinceName + result.cityName + result.countyName + result.detailInfo
        wx.setStorageSync('address', result)
      }
    })
  },
  handleGoodsCekChange(e) {
    const { id } = e.currentTarget.dataset
    const { cart } = this.data
    const item = cart.find(item => item.goods_id === id)
    item.isChecked = !item.isChecked
    this.updateCart(cart)
  },
  async handleGoodsCount(e) {
    const { cart } = this.data
    let { id, count } = e.currentTarget.dataset
    const index = cart.findIndex(item => item.goods_id === id)
    if (cart[index].num === 1 && count === -1) {
      let res = {}
      const { modalBuffer } = this.data
      if (modalBuffer) {
        this.setData({
          modalBuffer: false
        })
        res = await showModal({title:'提示',content:'是否移除该商品'})
        this.setData({
          modalBuffer: true
        })
      } else {
        return
      }
      if (res.confirm) {
        cart.splice(index, 1)
        this.updateCart(cart)
      }
      return
    }
    cart[index].num += count
    this.updateCart(cart)
  },
  handleSelectChange() {
    const { cart, selectAll } = this.data
    cart.forEach(item => {
      item.isChecked = !selectAll
    })
    this.updateCart(cart)
  },
  async handleGoodsTotal() {
    const { totalCount, address } = this.data
    if (!totalCount) {
      await showToast({ title: '请先添加商品', icon: 'error' })
      return
    }
    if (!Object.keys(address).length) {
      await showToast({ title: '请先填写地址', icon: 'error' })
      return
    }
    wx.navigateTo({
      url: '../pay/pay'
    })
  },
  updateCart(cart) {
    let selectAll = true
    let totalPrice = 0
    let totalCount = 0
    cart.forEach(item => {
      if (item.isChecked) {
        totalPrice += item.goods_price * item.num
        totalCount += item.num
      } else {
        selectAll = false
      }
    })
    selectAll = cart.length ? selectAll : false
    this.setData({
      cart,
      selectAll,
      totalPrice,
      totalCount
    })
    wx.setStorageSync('cart', cart)
  }


})