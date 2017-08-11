import React from 'react'
import classes from './ModelTrainingProgress.scss'
import Chart from 're-echarts'

type Props = {
  lossRate: Array,
  accuracy: Array
};

const option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Loss Rate', 'Accuracy']
  },
  xAxis: [
    {
      type: 'category',
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Loss Rate',
      axisLabel: {
        formatter: '{value}'
      }
    },
    {
      type: 'value',
      name: 'Accuracy',
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: 'Loss Rate',
      type: 'line',
      data: []
    },
    {
      name: 'Accuracy',
      type: 'line',
      yAxisIndex: 1,
      data: []
    }
  ]
}
export class ModelTrainingProgress extends React.Component {
  props: Props;

  render () {
    if (this.props.accuracy === [] ||
      this.props.accuracy === undefined ||
      this.props.accuracy === null ||
      !this.props.accuracy.length) {
      return (
        <div className={classes['ModelTrainingProgress-container']}>
          <div style={{color: '#337ab7', fontSize: '16px', fontWeight: 'bold'}}>暂无数据</div>
        </div>
      )
    } else {
      console.log('props', this.props.accuracy, this.props.lossRate)
      // option.xAxis[0].data = this.props.lossRate
      option.series[1].data = this.props.accuracy
      option.series[0].data = this.props.lossRate
      console.log('aa', option.series[1].data)
      return (
        <div className={classes['ModelTrainingProgress-container']}>
          <Chart option={option} style={{height: '350px'}} />
        </div>
      )
    }
  }
}

export default ModelTrainingProgress
