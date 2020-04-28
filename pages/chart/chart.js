// pages/chart/index.js
const app = getApp()
import * as echarts from '../../ec-canvas/echarts'

function initChart(canvas, width, height, dpr) {
  let chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // 像素
  })
  canvas.setChart(chart)

  let option = {
    animationEasingUpdate: 'circularOut',
    tooltip: {
      show: false,
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: false,
    },
    grid: {
      show: false,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisTick: { show: true },
        axisLine: {
          lineStyle: {
            color: 'rgba(82, 242, 248, .3)',
            width: 1,
            shadowColor: 'rgba(82, 242, 248, .8)',
            shadowBlur: 4,
          },
        },
        axisLabel: {
          show: true,
          color: 'rgba(255, 255, 255, .2)',
          shadowColor: 'rgba(82, 242, 248, 1)',
          fontSize: 10,
        },
        data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(82, 242, 248, .3)',
            width: 1,
            shadowColor: 'rgba(82, 242, 248, .8)',
            shadowBlur: 4,
          },
        },
        axisLabel: {
          show: true,
          color: 'rgba(255, 255, 255, .2)',
          shadowColor: 'rgba(82, 242, 248, 1)',
          fontSize: 10,
        },
        axisTick: {
          show: true,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    // visualMap: {
    //   show: false,
    //   dimension: 0,
    //   pieces: [
    //     {
    //       lte: 3,
    //       color: 'rgba(250, 76, 76, .5)'
    //     },
    //     {
    //       gt: 6,
    //       color: 'red',
    //     },
    //   ],
    // },
    series: [
      {
        type: 'line',
        name: 'be',
        // data: [1, 2, 5, 3, 2, 1, 3, 1, 4],
        // dimensions: ['value'],
        showSymbol: false,
        lineStyle: {
          color: 'rgba(82, 242, 248, .8)',
          width: 1,
          shadowColor: 'rgba(82, 242, 248, .8)',
          shadowBlur: 4,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(81, 214, 216, .4)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(81, 214, 216, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        smooth: true,
      },
    ],
  }
  chart.setOption(option)
  return chart
}
let chart = {
  DE_time: null,
  FE_time: null,
  BA_time: null
}
const de_init = (...opt) => chart.DE_time = initChart(...opt)
const fe_init = (...opt) => chart.FE_time = initChart(...opt)
const ba_init = (...opt) => chart.BA_time = initChart(...opt)

Page({
  data: {
    ec_de: {
      onInit: de_init,
    },
    ec_fe: {
      onInit: fe_init,
    },
    ec_ba: {
      onInit: ba_init,
    },
    msg: 'ok',
  },
  onLoad: function (options) {
    const device_id = "147-3"
    wx.onSocketMessage(() => {
      const dataset = app.globalData.dataset[device_id]
      const currentSet = dataset ? dataset.slice(-20) : []
      for (let chartName in chart) {
        chart[chartName].setOption({
          xAxis: [{
            data: currentSet.map(i => {
              const date = new Date()
              date.setTime(Date.parse(i.time))
              return date.toLocaleTimeString().slice(2)
            })
          }],
          series: [{
            data: currentSet.map(i => i[chartName])
          }]
        })
      }
    })
  },
})
