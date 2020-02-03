//logs.js
const util = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],
    processData: [{
      name: '提交工单',
      start: '#fff',
      end: '#EFF3F6',
      icon: '/images/process_1.png',
    },
    {
      name: '已接单',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '../../images/process_1.png'
    },
    {
      name: '开始维修',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '../../images/process_1.png'
    },
    {
      name: '维修结束',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '../../images/process_1.png'
    },
    {
      name: '已确认',
      start: '#EFF3F6',
      end: '#fff',
      icon: '../../images/process_1.png'
    }],
    detailData:[
      {
        state:1,
        progress:1
      }
    ]
  },
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        const images1 = images.length <= 3 ? images : images.slice(0, 4)
        this.setData({
          images: images1
        })
      }
    })
  },
  removeImage(e) {
    var that = this;
    var images = that.data.images;
    // 获取要删除的第几张图片的下标
    const idx = e.currentTarget.dataset.idx
    // splice  第一个参数是下表值  第二个参数是删除的数量
    images.splice(idx,1)
    this.setData({
      images: images
    })
  },
 
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },
  setPeocessIcon: function () {
    var index = 3//记录状态为1的最后的位置
    var processArr = this.data.processData
     //console.log("progress", this.data.detailData.progress)
    for (var i = 0; i < this.data.detailData.progress; i++) {
      var item = this.data.detailData.progress[i]
      processArr[i].name = item.word
      if (item.state == 1) {
        index = i
        processArr[i].icon = "../../images/process_2.png"
        processArr[i].start = "#45B2FE"
        processArr[i].end = "#45B2FE"
      } else {
        processArr[i].icon = "../../images/process_1.png"
        processArr[i].start = "#EFF3F6"
        processArr[i].end = "#EFF3F6"
      }
    }
    processArr[index].icon = "../../images/process_2.png"
    processArr[index].end = "#EFF3F6"
    processArr[0].start = "#fff"
    //processArr[this.data.detailData.progress.length - 1].end = "#fff"
    this.setData({
      processData: processArr
    })
  },


})
