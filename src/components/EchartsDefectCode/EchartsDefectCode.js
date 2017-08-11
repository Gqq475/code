import React from 'react'
import classes from './EchartsDefectCode.scss'
import Chart from 're-echarts'
import EcharsDefectCodeTable from 'components/AGTable'
import Utils from '../../Utils.js'
// import OurToaster from 'components/OurToaster'
type Props = {
  data: Object
};

const option = {
  tooltip: {
    trigger: 'axis'
  },
  title: {
    text: 'Top 5 Defects Pareto Chart',
    textStyle: {
      color: '#337ab7'
    }
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
      axisLabel: {
        formatter: '{value}'
      }
    },
    {
      type: 'value',
      axisLabel: {
        formatter: '{value} %'
      }
    }
  ],
  series: [
    {
      name: 'Count',
      type: 'bar',
      data: [],
      barCategoryGap: '60%'
    },
    {
      name: 'Ratio',
      type: 'line',
      yAxisIndex: 1,
      data: []
    }
  ]
}

const field = {
  [_.STEPID]: 'stepId',
  [_.LOTID]: 'lotId',
  [_.GLASID]: 'glassId',
  [_.DEFECTSEQ]: 'defectSeqNo',
  [_.CODE]: 'defectCode',
  [_.REJUDGECODE]: 'regudgeCode',
  [_.CHIPNO]: 'chipNo',
  [_.EPRODUCTID]: 'producId',
  [_.EQUIPID]: 'equipId',
  [_.GLASSSTARTTIME]: 'glassStartTime'
}

export class EchartsDefectCode extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {

    }
    this.setDataSource = this.setDataSource.bind(this)
  }

  setDataSource (pageSize, gridApi) {
    let totalCount = this.props.data.defectDetail.length
    // Add data source
    let dataSource = {
      rowCount: totalCount,
      getRows: (params) => {
        let pageNo = parseInt(params.startRow / pageSize) + 1
        let sortBy = params.sortModel[0] ? params.sortModel[0].colId : 'id'
        let order = params.sortModel[0] ? params.sortModel[0].sort : 'asc'
        let url = Utils.format(this.props.data.dDemplate, [pageNo, pageSize, sortBy, order])
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            // console.log('paradata', data)
            // if (data.code !== 200000) {
            //   OurToaster.show({message: `获取列表失败！${data.msg}`})
            //   return
            // }
            let detail = Utils.dataFormat(data, field)
            let lastRow = -1

            if (detail.length < params.endRow) {
              lastRow = detail.length
            }

            params.successCallback(detail, lastRow)
          })
      }
    }

    gridApi.setDatasource(dataSource)
  }
  render () {
    if (this.props.data.top5Data === [] ||
      this.props.data.top5Data === undefined ||
      this.props.data.top5Data === null ||
      !this.props.data.top5Data.length) {
      return (
        <div className={classes['DefectRate-container']}>
          <div style={{color: '#337ab7', fontSize: '16px', fontWeight: 'bold'}}>暂无此天的数据</div>
        </div>
      )
    } else {
      let Code = []
      let Count = []
      let Ratio = []
      let sum
      if (this.props.data && this.props.data.top5Data) {
        this.props.data.top5Data.forEach((item, i) => {
          Code.push(item.code)
          Count.push(item.count)
          Ratio.push(parseFloat(item.ratio))
          sum = item.sum
        })
        Code.push('OTHERS')
        Count.push(sum - Count[0] - Count[1] - Count[2] - Count[3] - Count[4])
       // Ratio.push(1 - Ratio[0] - Ratio[1] - Ratio[2] - Ratio[3] - Ratio[4])
        Ratio = [ Ratio[0],
          Ratio[0] + Ratio[1],
          Ratio[0] + Ratio[1] + Ratio[2],
          Ratio[0] + Ratio[1] + Ratio[2] + Ratio[3],
          Ratio[0] + Ratio[1] + Ratio[2] + Ratio[3] + Ratio[4],
          1]
        option.xAxis[0].data = Code
        option.series[0].data = Count
        option.series[1].data = Ratio
      }
      return (
        <div className={classes['EchartsDefectCode-container']}>
          <Chart option={option} style={{height: '500px'}} />
          {
            <EcharsDefectCodeTable
              field={field}
              setDataSource={this.setDataSource}
              loading={this.props.data.reloadAGgrid}
            />
          }
        </div>
      )
    }
  }
}

export default EchartsDefectCode
