// pages/setting.js
const util = require('../../utils/util.js')

Page({

  /**
   * Page initial data
   */
  data: {
    dialogShow: false,
    buttons: [{'text': '取消'}, {'text': '确定'}],
    name: '梦开始的地方'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  tapDialog: function (e) {
    let that = this
    let idx = e.detail.index
    if (idx == 0) {
      this.setData({
        dialogShow: false
      })
    }
    else {
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          let origin = {
            'lng': res.longitude,
            'lat': res.latitude,
            'name': that.data.name,
            'time': util.getTime()
          }
          wx.setStorageSync('origin', origin)

          let ol = wx.getStorageSync('origin_list') || [];
          ol.push(origin)
          wx.setStorageSync('origin_list', ol)

          wx.navigateBack({
            complete: (res) => {},
          })
        }
      })
    }
  },

  setName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  setMe: function () {
    this.setData({
      dialogShow: true
    })
  },

  toHistory: function () {
    wx.navigateTo({
      url: '../history/history',
    })
  },

  toAbout: function () {
    wx.navigateTo({
      url: '../about/about',
    })
  }
})
