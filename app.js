//app.js
App({
  onLaunch: function () {
    const socketTask = wx.connectSocket({
      url: 'ws://phm.meansky.cn/socket/',
      header: {
        'content-type': 'application/json',
      },
    })
    socketTask.onMessage(({ data }) => {
      data = JSON.parse(data)
      // console.log(data)
      const { dataset, errorLog } = this.globalData
      if (data.dataPoint) {
        const { device_id } = data.dataPoint
        dataset[device_id] = dataset[device_id] || []
        dataset[device_id].push(data.dataPoint)
        if (dataset.length > 100) {
          dataset.shift()
        }
      } else if (data.errorLog) {
        const { device_id } = data.errorLog
        errorLog[device_id] = errorLog[device_id] || []
        errorLog[device_id].push(data.errorLog)
      }
    })
  },
  globalData: {
    dataset: {},
    errorLog: {},
  },
})
