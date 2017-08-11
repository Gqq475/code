import React from 'react'
import classes from './XbarChart.scss'
import Chart from 're-echarts'
import Utils from 'Utils'
type Props = {
  xbarData: Object,
  lineData: Object
};

const option = {
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      var res = '<div><p>时间：' + params[3].data + '</p></div>'
      for (var i = 0; i < params.length - 1; i++) {
        res += '<p>' + params[i].seriesName + ':' + params[i].data + '</p>'
      }
      return res
    }
  },
  title: {
    text: 'XBAR Chart',
    textStyle: {
      color: '#337ab7'
    }
  },
  grid: {
    x: 100,
    y: 50,
    x2: 100,
    y2: 100
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      show: false,
      position: 'top',
      axisLabel: {
       //  X轴刻度配置
        rotate: 45,
        interval: 0 // 0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
      },
      data: []
    },
    {
      type: 'category',
      boundaryGap: false,
      position: 'bottom',
      axisLabel: {
       //  X轴刻度配置
        rotate: 45,
        interval: 0 // 0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
      },
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value',
      min: 5.5,
      max: 8.5,
      splitLine: {show: false},
      // splitNumber: 1,
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: '数值',
      type: 'line',
      symbol: 'circle',
      symbolSize: 7,
      itemStyle: {
        normal: {
          // color: 'green'
          color: function (params) {
            let color
            if (params.name === 'ooc') {
              color = 'red'
            } else {
              color = 'green'
            }
            return color
          }
        }
      },
      data: [''],
      lineStyle: {
        normal: {
          color: 'blue'   // 线条颜色
        }
      },
      markLine: {
        tooltip: {
          show: false
        },
        data: [
          {yAxis: 0, itemStyle: {normal: {color: 'blue', label: {formatter: 'UCL'}}}},
          {yAxis: 0, itemStyle: {normal: {color: 'red', label: {formatter: 'USL'}}}},
          {yAxis: 0, itemStyle: {normal: {color: '#000', label: {formatter: 'CL'}}}},
          {yAxis: 0, itemStyle: {normal: {color: '#000', label: {formatter: 'SL'}}}},
          {yAxis: 0, itemStyle: {normal: {color: 'red', label: {formatter: 'LSL'}}}},
          {yAxis: 0, itemStyle: {normal: {color: 'blue', label: {formatter: 'LCL'}}}}
        ],
        symbol: 'none',
        itemStyle: {
          normal: {
            lineStyle: {
              type: 'solid'
            }
          }
        }
      }
    },
    {
      name: 'X最大值',
      type: 'scatter',
      data: [''],
      symbol: 'none',
      itemStyle: {
        normal: {
          color: '#f7f7f7'
        }
      }
    },
    {
      name: 'X最小值',
      type: 'scatter',
      data: [''],
      symbol: 'none',
      itemStyle: {
        normal: {
          color: '#f7f7f7'
        }
      }
    },
    {
      name: '时间',
      type: 'line',
      data: []
    }
  ]
}

export class XbarChart extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    if (this.props.xbarData === [] ||
      this.props.xbarData === undefined ||
      this.props.xbarData === null ||
      !this.props.xbarData.length) {
      return (
        <div className={classes['DefectRate-container']}>
          <div style={{color: '#337ab7', fontSize: '16px', fontWeight: 'bold'}}>暂无数据</div>
        </div>
      )
    } else {
      let Count = []
      let Time = []
      let TypeStyle = []
      let Xmax = []
      let Xmin = []
      let ucl = this.props.lineData.ucl
      let usl = this.props.lineData.usl
      let sl = this.props.lineData.sl
      let cl = this.props.lineData.cl
      let lsl = this.props.lineData.lsl
      let lcl = this.props.lineData.lcl
      if (this.props.xbarData) {
        this.props.xbarData.forEach((item, i) => {
          Time.push(Utils.formatDate(new Date((item.dateTime))))
          Count.push(item.xbar.toFixed(2))
          TypeStyle.push(item.type)
          Xmax.push(item.xmax.toFixed(2))
          Xmin.push(item.xmin.toFixed(2))
        })
        for (let i = 0; i < TypeStyle.length; i++) {
          if (TypeStyle[i] === undefined) {
            TypeStyle[i] = ''
          }
          TypeStyle[1] = 'ooc'
          TypeStyle[0] = 'ooc'
        }
        option.xAxis[0].data = TypeStyle
        option.xAxis[1].data = Time
        option.series[0].data = Count
        option.series[1].data = Xmax
        option.series[2].data = Xmin
        option.series[3].data = Time
        option.series[0].markLine.data[0].yAxis = ucl
        option.series[0].markLine.data[1].yAxis = usl
        option.series[0].markLine.data[2].yAxis = sl
        option.series[0].markLine.data[3].yAxis = cl
        option.series[0].markLine.data[4].yAxis = lsl
        option.series[0].markLine.data[5].yAxis = lcl
        return (
          <div className={classes['XBarChart-container']}>
            <Chart style={{position: 'relative', height: '450px'}} option={option} />
            <div style={{textAlign: 'center'}}>X轴： 时间</div>
            <div className={classes['yy']} style={{position: 'absolute', top: '25%'}}>Y轴： 数值</div>
          </div>
        )
      }
    }
  }
}
export default XbarChart
