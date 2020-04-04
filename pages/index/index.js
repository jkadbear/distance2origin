//index.js

Page({
  data: {
    lng: 0,
    lat: 0,
    origin_name: '梦开始的地方',
    origin_lng: 0,
    origin_lat: 0,
    dis: 0,
    dis_str: ''
  },

  onLoad: function () {
    this.refreshOrigin()

    var that = this

    wx.startLocationUpdate({
      success(res) {
        console.log('开启后台定位', res)
      },
      fail(res) {
        console.log('开启后台定位失败', res)
      }
    })
    wx.onLocationChange(function(res) {
      that.setDis(res.longitude, res.latitude)
    })
  },

  onShow: function () {
    this.refreshOrigin()
    this.setDis(this.data.lng, this.data.lat)
  },

  setOrigin: function () {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },

  refreshOrigin: function () {
    const origin = wx.getStorageSync('origin')
    if (origin) {
      this.setData({
        origin_name: origin.name,
        origin_lng: origin.lng,
        origin_lat: origin.lat
      })
    }
  },

  refreshPos: function (lng, lat, dis) {
    this.setData({
      lng: lng,
      lat: lat,
      dis: dis
    })
    if (dis > 10000) {
      this.setData({dis_str: (dis / 1000).toFixed(1) + ' km'})
    }
    else {
      this.setData({dis_str:  dis.toFixed(1) + ' m'})
    }
  },

  //计算两点位置距离
  getDistance: function (lng1, lat1, lng2, lat2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;

    let rad1 = lat1 * Math.PI / 180.0;
    let rad2 = lat2 * Math.PI / 180.0;
    let a = rad1 - rad2;
    let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

    let r = 6378137;
    let distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));

    return distance;
  },

  setDis: function (lng, lat) {
    let dis = this.getDistance(
      lng,
      lat,
      this.data.origin_lng,
      this.data.origin_lat
    )

    this.refreshPos(lng, lat, dis)
  }
})
