Page({
  getUserInfo() {
    const token = "Bearer 模拟token的字符串"
    wx.setStorageSync('token', token)
    wx.navigateBack({
      delta: 1
    })
  }
})