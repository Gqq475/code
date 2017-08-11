import React from 'react'
import classes from './DefectJudge.scss'
import DJTable from 'components/AGTable'
import DefectJudgeZone from 'components/DefectJudgeZone'
import Utils from '../../Utils.js'
import { connect } from 'react-redux'
type Props = {
  data: Object,
  getDefectJudgeById: Function,
  submitJudge: Function,
  getDefectDetailById: Function,
  token: String,
  userRole: Array
};

const field = {
  [_.ID]: 'id',
  [_.GLASSTYPE]: 'glassType',
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

export class DefectJudge extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.setDataSource = this.setDataSource.bind(this)
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
            if (data.code !== 200000) return

            let lots = Utils.dataFormat(data.result.lots, field)
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

  render () {
    return (
      <div className={classes['DefectJudge-container']}>
        {
          this.props.data.glassList &&
            <DJTable
              field={field}
              loading={this.props.data.reloadAGgrid}
              setDataSource={this.setDataSource}
              handleClick={this.props.getDefectJudgeById}
            />
        }
        {
          this.props.data.defectList &&
            <DefectJudgeZone
              data={this.props.data.defectList}
              userRole={this.props.userRole}
              defectDetail={this.props.data.defectDetail}
              submitJudge={this.props.submitJudge}
              getDefectDetailById={this.props.getDefectDetailById}
            />
        }
      </div>
    )
  }
}
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
)(DefectJudge)
