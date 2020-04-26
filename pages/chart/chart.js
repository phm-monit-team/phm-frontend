// pages/chart/index.js
import * as echarts from '../../ec-canvas/echarts'
let chart = null
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // 像素
  })
  canvas.setChart(chart)

  var option = {
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
        data: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
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
        data: [1, 2, 5, 3, 2, 1, 3, 1, 4],
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

Page({
  data: {
    ec: {
      onInit: initChart,
    },
    msg: 'ok',
  },
  onLoad: function (options) {},
  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000)
  },
})
