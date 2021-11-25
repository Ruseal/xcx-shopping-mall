// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getUserInfo(e) {
    const userInfo = e.detail
    wx.setStorageSync('user-info', userInfo)
    wx.navigateBack({
      delta: 1
    })
    // wx.switchTab({
    //   url: '../my/index',
    // })
  },
  exit() {
    wx.navigateBack({
      delta: 1
    })
  }


})