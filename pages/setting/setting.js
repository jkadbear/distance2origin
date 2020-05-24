// pages/setting.js
const util = require('../../utils/util.js')

Page({

  /**
   * Page initial data
   */
  data: {
    dialogShow: false,
    buttons: [{'text': '取消'}, {'text': '确定'}],
    name: '梦开始的地方',
    adv_content: [
      ['我想看广告', '为啥你想看广告？'],
      ['为啥没有广告', '来，广告给你。'],
      ['上帝说要有广告', '上帝：“不是我说的。”'],
      ['这个是广告', '好的。'],
      ['我想看广告！', '好的！'],
      ['我想看广告！！', '好的！！'],
      ['我想看广告！！！', '好的！！！'],
      ['有啥广告', '您瞧。'],
      ['戳一下广告', '你戳到我了。'],
    ],
    adv_str: '?',
    adv_idx: 0,
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
    let idx = util.getRandomInt(0, this.data.adv_content.length-1)
    this.setData({
      adv_str: this.data.adv_content[idx][0],
      adv_idx: idx,
    })
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

  toAdv: function () {
    let ans = this.data.adv_content[this.data.adv_idx][1]
    wx.navigateTo({
      url: '../adv/adv',
      success: function(res) {
        res.eventChannel.emit('ans', { ans: ans })
      }
    })
  }
})
