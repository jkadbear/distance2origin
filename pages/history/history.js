// pages/history/history.js
const util = require('../../utils/util.js')

Page({

  /**
   * Page initial data
   */
  data: {
    origin_list: [],
    slideButtons: [{
      'type': 'warn',
      'text': '删除'
    }],
    dialogButtons: [{
      'text': '取消'
    },{
      'text': '设为原点'
    }],
    dialogShow: false,
    name: '',
    lng: 0,
    lat: 0,
    time: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let ol = wx.getStorageSync('origin_list')
    if (ol) { 
      this.setData({
        origin_list: ol
      })
    }
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

  showDetail: function (e) {
    let idx = parseInt(e.target.id)
    this.setData({
      dialogShow: true,
      name: this.data.origin_list[idx].name,
      lng: this.data.origin_list[idx].lng,
      lat: this.data.origin_list[idx].lat,
      time: this.data.origin_list[idx].time
    })
  },

  deleteOrigin: function (e) {
    let idx = parseInt(e.target.id)
    this.data.origin_list.splice(idx, 1)
    wx.setStorageSync('origin_list', this.data.origin_list)
    this.setData({
      origin_list: this.data.origin_list
    })
  },

  tapDialog: function (e) {
    const idx = e.detail.index
    if (idx == 1) {
      // set as new origin
      wx.setStorageSync('origin', {
        name: this.data.name,
        lng: this.data.lng,
        lat: this.data.lat,
        time: this.data.time
      })
      wx.navigateBack({
        complete: (res) => {},
      })
    }
    else {
      this.setData({
        dialogShow: false
      })
    }
  }
})