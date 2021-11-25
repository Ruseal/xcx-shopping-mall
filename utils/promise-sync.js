export const showModal = (params) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: params.title,
      content: params.content,
      success: (result) => {
        resolve(result)
      }
    })
  })
}

export const showToast = (params) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: params.title,
      icon: params.icon,
      success: (result) => {
        resolve(result)
      }
    })
  })
}


