import React from 'react'
import classes from './Rchart.scss'
import Chart from 're-echarts'
import Utils from 'Utils'
type Props = {
  rbarData: Object,
};

const option = {
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      var res = '<div><p>时间：' + params[0].name + '</p></div>'
      for (var i = 0; i < params.length; i++) {
        res += '<p>' + params[i].seriesName + ':' + params[i].data + '</p>'
      }
      return res
    }
  },
  title: {
    text: 'R Chart',
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
      min: 0,
      max: 3,
      // splitNumber: 3,
      splitLine: {show: false},
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
      symbolSize: 8,
      itemStyle: {
        normal: {
          color: 'green'
        }
      },
      lineStyle: {
        normal: {
          color: '#a1683f'   // 线条颜色
        }
      },
      markLine: {
        tooltip: {
          show: false
        },
        symbol: 'none',
        data: [
          {yAxis: 1.24, itemStyle: {normal: {color: 'blue', label: {formatter: 'UCL'}}}},
          {yAxis: 0.8, itemStyle: {normal: {color: '#000', label: {formatter: 'CL'}}}},
          {yAxis: 0, itemStyle: {normal: {color: 'blue', label: {formatter: 'LCL'}}}}
        ],
        itemStyle: {
          normal: {
            lineStyle: {
              type: 'solid'
            }
          }
        }
      }
    }
  ]
}

export class Rchart extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    if (this.props.rbarData === [] ||
      this.props.rbarData === undefined ||
      this.props.rbarData === null ||
      !this.props.rbarData.length) {
      return (
        <div className={classes['DefectRate-container']}>
          <div style={{color: '#337ab7', fontSize: '16px', fontWeight: 'bold'}}>暂无数据</div>
        </div>
      )
    } else {
      let Count = []
      let Time = []
      // let ucl = this.props.lineData.ucl
      // let cl = this.props.lineData.cl
      // let lcl = this.props.lineData.lcl
      if (this.props.rbarData) {
        this.props.rbarData.forEach((item, i) => {
          Time.push(Utils.formatDate(new Date((item.dateTime))))
          Count.push(item.r.toFixed(2))
        })
        option.xAxis[0].data = Time
        option.series[0].data = Count
       // option.series[0].markLine.data[0].yAxis = ucl
        // option.series[0].markLine.data[1].yAxis = cl
       // option.series[0].markLine.data[2].yAxis = lcl
        return (
          <div className={classes['Rchart-container']}>
            <Chart style={{height: '450px'}} option={option} />
            <div style={{textAlign: 'center'}}>X轴： 时间</div>
            <div className={classes['yy']} style={{position: 'absolute', top: '70%'}}>Y轴： 数值</div>
          </div>
        )
      }
    }
  }
}
export default Rchart
