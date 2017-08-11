import React from 'react'
import classes from './ModelTrainingComplete.scss'
import Chart from 're-echarts'
import { connect } from 'react-redux'

type Props = {
  id: Number,
  modelTrainResultChart: Object,
  getModelTrainResult: Function
};

const option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Loss Rate']
  },
  xAxis: [
    {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Loss Rate',
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: 'Loss Rate',
      type: 'bar',
      data: [1961, 364, 165, 232, 256, 767, 1356]
    }
  ]
}

// const options = {
//   tooltip: {
//     trigger: 'item',
//     formatter: '{a} <br/>{b} : {c} ({d}%)'
//   },
//   legend: {
//     orient: 'vertical',
//     x: 'right',
//     data: ['直接访问', '邮件营销', '联盟广告']
//   },
//   toolbox: {
//     feature: {
//       magicType: {
//         show: true,
//         type: ['pie', 'funnel'],
//         option: {
//           funnel: {
//             x: '25%',
//             width: '50%',
//             funnelAlign: 'left',
//             max: 1548
//           }
//         }
//       }
//     }
//   },
//   series: [
//     {
//       name: '访问来源',
//       type: 'pie',
//       radius: '55%',
//       center: ['50%', '60%'],
//       data: [
//         {value: 335, name: '直接访问'},
//         {value: 390, name: '邮件营销'},
//         {value: 234, name: '联盟广告'}
//       ]
//     }
//   ]
// }
// <div className={classes.w50}>
// <Chart option={options} style={{height: '350px'}} />
// </div>

export class ModelTrainingComplete extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.props.getModelTrainResult(this.props.id)
  }
  render () {
    console.log('modelTrainResultChart', this.props.modelTrainResultChart)
    if (this.props.modelTrainResultChart !== undefined) {
      let defect = Object.keys(this.props.modelTrainResultChart)
      let number = Object.values(this.props.modelTrainResultChart)
      option.xAxis[0].data = defect
      option.series[0].data = number
      return (
        <div className={classes['ModelTrainingComplete-container']}>
          <div className={classes['top']}>
            <div className={classes['top-left']}>
              <div className={classes.productGlass}>Training Result </div>
            </div>
          </div>
          <div className={classes.w50}>
            <Chart option={option} style={{height: '350px'}} />
          </div>
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  }
}

export default connect((state) => {
  return {
    modelTrainResultChart: state.ojs.modelTrainResultChart
  }
})(ModelTrainingComplete)
