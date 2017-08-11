import React from 'react'
import classes from './AutoDefectJudge.scss'
import DJTable from 'components/AGTable'
import AutoDefectJudgeZone from 'components/AutoDefectJudgeZone'
import Utils from '../../Utils.js'
import { connect } from 'react-redux'

type Props = {
  data: Object,
  getAutoDefectJudgeById: Function,
  autoSubmitJudge: Function,
  getAutoDefectDetailById: Function,
  getAutoDefectJudgeList: Function,
  token: String,
  userRole: Array
};

const field = {
  [_.ID]: 'id',
  [_.GLASSTYPE]: 'glassType',
  glassCode: 'glassCode',
  [_.LOT]: 'lotId',
  [_.PRODUCTID]: 'productCode',
  [_.LINEID]: 'lineCode',
  [_.OPERATIONID]: 'operationCode',
  [_.SUBENTITY]: 'subEqCode',
  'Coater': 'coater',
  'Aligner': 'aligner',
  'ProcessCode': 'processCode',
  [_.SCRAP]: 'scrapFlag',
  [_.CREATETIME]: 'createTime',
  [_.ENDTIME]: 'endTime',
  [_.LASTUPDATE]: 'updateTime'
}

export class AutoDefectJudge extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.setDataSource = this.setDataSource.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
    this.autoList = this.autoList.bind(this)
    AutoDefectJudge.isMounted = true
    this.judgeresults = []

    this.state = {
      data: [],
      productCode: '',
      glassCode: '',
      autoList: false
    }
  }

  setDataSource (pageSize, gridApi) {
    let totalCount = this.props.data.glassList.result.totalPage
    let dataSource = {
      rowCount: totalCount,
      getRows: (params) => {
        let pageNo = parseInt(params.startRow / pageSize) + 1
        let sortBy = params.sortModel[0] ? params.sortModel[0].colId : 'id'
        let order = params.sortModel[0] ? params.sortModel[0].sort : 'asc'
        let url = Utils.format(this.props.data.djTemplate, [pageNo, pageSize, sortBy, order])
        fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': this.props.token
          }
        })
          .then(response => response.json())
          .then((data) => {
            if (!AutoDefectJudge.isMounted) return
            this.judgeresults = data.result.judgeresults
            // this.setState({
            //   data: data.result.judgeresults
            // })
            let lots = Utils.dataFormat(data.result.judgeresults, field)
            let lastRow = -1

            if (lots.length < params.endRow) {
              lastRow = lots.length
            }
            params.successCallback(lots, lastRow)
          })
      }
    }
    gridApi.setDatasource(dataSource)
  }

  handleClick (id, page = {current: 1, pageSize: 6}) {
    let confidenceLowerLimit = this.props.data.autoDefectJudgeState.reliabilitys[0] / 100
    let confidenceUpperLimit = this.props.data.autoDefectJudgeState.reliabilitys[1] / 100
    let defectFilter = this.props.data.autoDefectJudgeState.defectCode
    this.props.getAutoDefectJudgeById(id, page, confidenceLowerLimit, confidenceUpperLimit, defectFilter)
    this.judgeresults.forEach((item) => {
      if (item.id === id) {
        this.setState({
          productCode: item.productCode,
          glassCode: item.glassCode,
          id: id
        })
      }
    })
  }

  handlePageClick (state) {
    this.handleClick(this.state.id, {current: state.current, pageSize: state.pageSize})
  }

  autoList (state) {
    this.setState({
      autoList: state
    })
  }

  componentWillUnmount () {
    AutoDefectJudge.isMounted = false
  }

  componentDidUpdate () {
    AutoDefectJudge.isMounted = true
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data.searchState) {
      this.setState({
        autoList: false
      })
    }
  }

  render () {
    return (
      <div className={classes['AutoDefectJudge-container']}>
        {
          this.props.data.glassList &&
            <DJTable
              field={field}
              loading={this.props.data.reloadAGgrid}
              setDataSource={this.setDataSource}
              handleClick={this.handleClick}
            />
        }
        {
          ((this.props.data.searchState && this.props.data.adjDefectList) ||
          (this.props.data.searchState === false && this.state.autoList)) &&
            <AutoDefectJudgeZone
              productCode={this.state.productCode}
              glassCode={this.state.glassCode}
              data={this.props.data.adjDefectList ||
                {result: {judgeresults: [{noData: 'no'}], pageNO: 1, totalNum: 0, totalPage: 0}}}
              dataDetail={this.props.data.glassList}
              defectDetail={this.props.data.defectDetail}
              autoSubmitJudge={this.props.autoSubmitJudge}
              handlePageClick={this.handlePageClick}
              handleClick={this.handleClick}
              getAutoDefectDetailById={this.props.getAutoDefectDetailById}
              id={this.state.id}
              getAutoDefectJudgeList={this.props.getAutoDefectJudgeList}
              dataState={this.props.data.autoDefectJudgeState}
              autoList={this.autoList}
              userRole={this.props.userRole}
            />
        }
      </div>
    )
  }
}

AutoDefectJudge.isMounted = false

export default connect(
  (state) => ({
    token: state.auth.token,
    userRole: state.auth.userRole
  }),
  (dispatch, state) => {
    return {
      dispatch
    }
  }
)(AutoDefectJudge)
