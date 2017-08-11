import React from 'react'
import classes from './EchartsGetFromTo.scss'
import Chart from 're-echarts'
import DOTable from 'components/Table'

type Props = {
  data: Object,
  getFromTo: Function
};

const field = {
  [_.PATH]: 'path',
  [_.PATHTYPE]: 'PathType',
  [_.DEFECTRATE]: 'DefectRate',
  [_.DEFECTNUMBER]: 'DefectNumber',
  [_.GLASSNUMBER]: 'GlassNumber'
}

const option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Defect Number', 'Glass Number', 'Defect Rate']
  },
  xAxis: [
    {
      type: 'category'
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Defect Number',
      axisLabel: {
        formatter: '{value}'
      }
    },
    {
      type: 'value',
      name: 'Defect Rate',
      axisLabel: {
        formatter: '{value} %'
      }
    }
  ],
  series: [
    {
      name: 'Defect Number',
      type: 'bar'
    },
    {
      name: 'Glass Number',
      type: 'bar'
    },
    {
      name: 'Defect Rate',
      type: 'line',
      yAxisIndex: 1
    }
  ]
}

export class EchartsGetFromTo extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      defectNumber: [],
      defectRate: [],
      glassNumber: [],
      pathType: []
    }
  }

  componentWillMount () {
    this.props.getFromTo()
  }

  render () {
    const defectNumber = []
    const defectRate = []
    const glassNumber = []
    const pathType = []
    if (this.props.data && this.props.data.getFromTo) {
      this.props.data.getFromTo.result.forEach((item, i) => {
        pathType.push(item.PathType)
        defectNumber.push(item.DefectNumber)
        defectRate.push(parseFloat(item.DefectRate.substr(0, item.DefectRate.length - 1).replace(',', '')))
        glassNumber.push(item.GlassNumber)
      })
      option.series[0].data = defectNumber
      option.xAxis[0].data = pathType
      option.series[2].data = defectRate
      option.series[1].data = glassNumber
    }

    return (
      <div className={classes['EchartsGetFromTo-container']}>
        <Chart option={option} style={{height: '500px'}} />
        {
          this.props.data.getFromTo &&
            <DOTable field={field} data={this.props.data.getFromTo.result} />
        }
      </div>
    )
  }
}

export default EchartsGetFromTo
