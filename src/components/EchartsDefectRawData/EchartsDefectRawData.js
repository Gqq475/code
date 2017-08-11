import React from 'react'
import classes from './EchartsDefectRawData.scss'
import Chart from 're-echarts'
import EchartsDefectRawDataTable from 'components/AGTable'

type Props = {
  data: Obejct,
  // getHandlingPath: Function,
};

const option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Defect Number', 'Glass Number', 'Defect Rate']
  },
  xAxis: [
    {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
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
      type: 'bar',
      data: [1961, 364, 165, 232, 256, 767, 1356, 1622, 326, 200, 64, 533]
    },
    {
      name: 'Glass Number',
      type: 'bar',
      data: [26, 59, 90, 264, 287, 707, 1756, 1822, 487, 188, 3460, 2453]
    },
    {
      name: 'Defect Rate',
      type: 'line',
      yAxisIndex: 1,
      data: [206, 227, 339, 459, 639, 102, 203, 234, 230, 165, 120, 620]
    }
  ]
}

const field = {
  [_.PATH]: 'path',
  [_.PATHTYPE]: 'PathType',
  [_.DEFECTRATE]: 'DefectRate',
  [_.DEFECTNUMBER]: 'DefectNumber',
  [_.GLASSNUMBER]: 'GlassNumber'
}

export class EchartsDefectRawData extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {

    }
    this.setDataSource = this.setDataSource.bind(this)
  }
  componentWillMount () {
    // this.props.getHandlingPath()
  }
  setDataSource () {

  }
  render () {
    if (this.props.data && this.props.data.handlingPath) {
      const PathType = []
      const defectNumber = []
      const defectRate = []
      const glassNumber = []
      this.props.data.handlingPath.result.forEach((item, i) => {
        PathType.push(item.PathType)
        defectNumber.push(item.DefectNumber)
        defectRate.push(parseFloat(item.DefectRate.substr(0, item.DefectRate.length - 1).replace(',', '')))
        glassNumber.push(item.GlassNumber)
      })
      option.series[0].data = defectNumber
      option.xAxis[0].data = PathType
      option.series[2].data = defectRate
      option.series[1].data = glassNumber
    }
    return (
      <div className={classes['EchartsDefectRawData-container']}>
        <Chart option={option} style={{height: '500px'}} />
        {
          <EchartsDefectRawDataTable
            field={field}
            setDataSource={this.setDataSource}
            // loading={this.props.data.reloadAGgrid}
          />
        }
      </div>
    )
  }
}

export default EchartsDefectRawData
