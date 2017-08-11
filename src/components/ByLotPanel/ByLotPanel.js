import React from 'react'
import classes from './ByLotPanel.scss'
import DMTable from 'components/AGTable'
import DMZone from 'components/DefectMapZone'
import Utils from '../../Utils.js'
import { Button } from '@blueprintjs/core'
import { connect } from 'react-redux'
type Props = {
  data: Obejct,
  accessSS: Function,
  toggleSS: Function,
  reloadAGgrid: Boolean,
  resetDM: Function,
  getDefectByLotId: Function,
  token: String
};

const field = {
  [_.ID]: 'id',
  [_.LINEID]: 'lineCode',
  [_.LOT]: 'lotCode',
  [_.PRODUCTID]: 'productCode',
  [_.OPERATIONID]: 'operationCode',
  [_.SUBENTITY]: 'subEqCode',
  [_.CREATETIME]: 'createTime',
  [_.LASTUPDATE]: 'updateTime'
}

export class ByLotPanel extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.selected = []
    this.enableMerge = this.enableMerge.bind(this)
    this.enableSideBySide = this.enableSideBySide.bind(this)
    this.cacheSelectedArray = this.cacheSelectedArray.bind(this)
    this.setDataSource = this.setDataSource.bind(this)
  }

  componentWillMount () {
    this.props.resetDM()
  }

  cacheSelectedArray (array) {
    this.selected = array
  }

  enableSideBySide () {
    this.props.toggleSS(true, true)
    this.props.getDefectByLotId(this.selected)
  }

  enableMerge () {
    this.props.toggleSS(true, false)
    this.props.getDefectByLotId(this.selected)
  }

  setDataSource (pageSize, gridApi) {
    // This depends on pageSize 1 totalPage to get totalCount
    let totalCount = this.props.data.lots.result.totalPage

    // Add data source
    let dataSource = {
      rowCount: totalCount,
      getRows: (params) => {
        let pageNo = parseInt(params.startRow / pageSize) + 1
        let sortBy = params.sortModel[0] ? params.sortModel[0].colId : 'id'
        let order = params.sortModel[0] ? params.sortModel[0].sort : 'asc'
        let url = Utils.format(this.props.data.dmLotTemplate, [pageNo, pageSize, sortBy, order])

        fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': this.props.token
          }
        })
          .then(response => response.json())
          .then((data) => {
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
      <div className={classes['ByLotPanel-container']}>
        {
          this.props.data.lots &&
            <DMTable
              multiSelect
              field={field}
              setDataSource={this.setDataSource}
              loading={this.props.reloadAGgrid}
              handleClick={this.cacheSelectedArray}
            />
        }
        <div className={classes['btn-container']}>
          <Button className={classes['btn-submit']} onClick={this.enableSideBySide}>
            {_.SIDEBYSIDE}
          </Button>
          <Button className={classes['btn-submit']} onClick={this.enableMerge}>
            {_.MERGE}
          </Button>
        </div>
        {
          this.props.data.glassbylot &&
          this.props.data.glassbylot.length !== 0 &&
            <DMZone
              byLot
              data={this.props.data.glassbylot}
              sideBySide={this.props.accessSS(true)} />
        }
      </div>
    )
  }
}
export default connect(
  (state) => ({
    token: state.auth.token
  }),
  (dispatch, state) => {
    return {
      dispatch
    }
  }
)(ByLotPanel)
