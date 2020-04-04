//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    result: '111',
    swiperList: [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      //url:'test.php',
      success: (result) => {
       // console.log(result)
        this.setData({
          swiperList: result.data.message
        })
      }
    })

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onRightItemClick: function () {
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = res.data
            //do something
          }
        })
      }
    })
  },
  onRight: function () {
    console.log("1")
    wx.navigateTo({
      url: '../list/list'
    })
  },
  getScancode: function () {
    var _this = this;
    wx.scanCode({
      success(res) {
        console.log(res)
        wx.navigateTo({
          url: '../list/list?title=' + res.result

        })
        var result = res.result;

        _this.setData({
          result: result,

        })

      }
    })

  }

})
