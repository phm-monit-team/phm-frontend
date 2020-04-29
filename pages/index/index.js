//index.js
//获取应用实例
import * as echarts from '../../ec-canvas/echarts'

const app = getApp()
let chart = {}

var colorSet = {
  normal: 'rgba(75, 250, 250, .55)',
  error: 'rgba(180, 64, 64, 1)',
}

function getValue(num) {
  if (num < -1) {
    return 0
  }
  if (num > 1) {
    return 100
  }
  return (num + 1) * 50
}

function initChart(canvas, width, height, dpr) {
  let chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // 像素
  })
  canvas.setChart(chart)

  var option = {
    // backgroundColor: '#0E1327',
    // tooltip: {
    //     formatter: "{a} <br/>{b} : {c}%"
    // },

    series: [
      {
        name: '内部进度条',
        type: 'gauge',
        // center: ['20%', '50%'],
        radius: '40%',

        splitNumber: 10,
        axisLine: {
          show: false,
          lineStyle: {
            color: [
              [0, colorSet.normal], // color
              // [1, "rgba(255, 255, 255, .5)"]
            ],
            width: 2,
          },
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        itemStyle: {
          show: false,
        },
        detail: {
          formatter: '0.00', // ! value
          offsetCenter: [0, 24],
          textStyle: {
            padding: [0, 0, 0, 0],
            fontSize: 10,
            fontWeight: '700',
            color: colorSet.normal, // ! color
          },
        },
        title: {
          //标题
          show: false,
          offsetCenter: [0, 46], // x, y，单位px
          textStyle: {
            color: '#fff',
            fontSize: 14, //表盘上的标题文字大小
            fontWeight: 400,
            fontFamily: 'PingFangSC',
          },
        },
        data: [
          {
            name: 'val',
            value: 50, // ! value
          },
        ],
        pointer: {
          show: true,
          length: '85%',
          radius: '10%',
          width: 2, //指针粗细
        },
        animationDuration: 4000,
      },
      {
        name: '外部刻度',
        type: 'gauge',
        //  center: ['20%', '50%'],
        radius: '50%',
        min: 0, //最小刻度
        max: 100, //最大刻度
        splitNumber: 10, //刻度数量
        startAngle: 225,
        endAngle: -45,
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: [[1, 'rgba(0,0,0,0)']],
          },
        }, //仪表盘轴线
        axisLabel: {
          show: false,
          color: '#4d5bd1',
          distance: 25,
          formatter: function (v) {
            switch (v + '') {
              case '0':
                return '0'
              case '10':
                return '10'
              case '20':
                return '20'
              case '30':
                return '30'
              case '40':
                return '40'
              case '50':
                return '50'
              case '60':
                return '60'
              case '70':
                return '70'
              case '80':
                return '80'
              case '90':
                return '90'
              case '100':
                return '100'
            }
          },
        }, //刻度标签。
        axisTick: {
          show: true,
          splitNumber: 2,
          lineStyle: {
            color: colorSet.normal, // ! 用颜色渐变函数不起作用
            width: 1,
          },
          length: -2,
        }, //刻度样式
        splitLine: {
          show: true,
          length: -4,
          lineStyle: {
            color: colorSet.normal, // ! 用颜色渐变函数不起作用
          },
        }, //分隔线样式
        detail: {
          show: false,
        },
        pointer: {
          show: false,
        },
      },
    ],
  }
  chart.setOption(option)
  return chart
}

function setChart(device_id, data) {
  const deName = device_id + '_de'
  const feName = device_id + '_fe'
  if (data.de && data.fe) {
    chart[deName] &&
      chart[deName].setOption({
        series: [
          {
            detail: {
              formatter: parseFloat(data.de).toFixed(2),
            },
            data: [
              {
                name: 'de',
                value: getValue(data.de),
              },
            ],
          },
        ],
      })
    chart[deName] &&
      chart[feName].setOption({
        series: [
          {
            detail: {
              formatter: parseFloat(data.fe).toFixed(2),
            },
            data: [
              {
                name: 'fe',
                value: getValue(data.fe),
              },
            ],
          },
        ],
      })
  } else if (data.error) {
    const type = data.error === 'normal' ? 'normal' : 'error'
    chart[deName] &&
      chart[deName].setOption({
        series: [
          {
            detail: {
              color: colorSet[type]
            },
            axisLine: {
              lineStyle: {
                color: [[0, colorSet[type]]],
              },
            },
          },
          {
            axisTick: {
              lineStyle: {
                color: colorSet[type],
              },
              length: -2,
            }, //刻度样式
            splitLine: {
              show: true,
              length: -4,
              lineStyle: {
                color: colorSet[type],
              },
            }, //分隔线样式
          },
        ],
      })
    chart[feName] &&
      chart[feName].setOption({
        series: [
          {
            detail: {
              color: colorSet[type]
            },
            axisLine: {
              lineStyle: {
                color: [[0, colorSet[type]]],
              },
            },
          },
          {
            axisTick: {
              lineStyle: {
                color: colorSet[type],
              },
              length: -2,
            }, //刻度样式
            splitLine: {
              show: true,
              length: -4,
              lineStyle: {
                color: colorSet[type],
              },
            }, //分隔线样式
          },
        ],
      })
  }
}

const init = (namespace) => (...opt) => (chart[namespace] = initChart(...opt))

Page({
  data: {
    ec_de: {
      onInit: init('dv1_de'),
    },
    devices: [
      // {
      //   device_id: '1',
      //   namespace: 'dv1_de',
      //   error: 'normal',
      //   ec_de: {
      //     onInit: init('1_de'),
      //   },
      //   ec_fe: {
      //     onInit: init('1_fe'),
      //   },
      // },
    ],
  },
  onLoad: function () {
    wx.onSocketMessage(({ data }) => {
      data = JSON.parse(data)
      if (data.dataPoint) {
        const { device_id, DE_time, FE_time } = data.dataPoint
        const newData = this.data.devices
        const target = newData.find((i) => i.device_id === device_id)
        if (!target) {
          console.log(data.dataPoint)
          newData.push({
            device_id,
            error: 'normal',
            ec_de: {
              onInit: init(`${device_id}_de`),
            },
            ec_fe: {
              onInit: init(`${device_id}_fe`),
            },
          })
        }
        this.setData(
          {
            devices: newData,
          },
          () => {
            setChart(device_id, {
              de: DE_time,
              fe: FE_time,
            })
          }
        )
      } else if (data.errorLog) {
        const { device_id, error } = data.errorLog
        console.log(data.errorLog)
        setChart(device_id, {
          error,
        })
        const newData = this.data.devices
        const target = newData.find((i) => i.device_id === device_id)
        if (target) {
          target.error = error
          this.setData({
            devices: newData,
          })
        }
      }
    })
  },
  tap: (e) => {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/chart/chart?device=' + id,
    })
  },
})
