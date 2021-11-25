let ajaxTimec = 0
export const request = (params) => {
  ajaxTimec++
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseURL + params.url,
      success: (result) => {
        resolve(result)
      }, 
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        ajaxTimec--
        if (ajaxTimec===0) {
          wx.hideLoading()
        }

      }
    })
  })
}