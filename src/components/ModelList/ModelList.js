import React from 'react'
import classes from './ModelList.scss'
import {AgGridReact} from 'ag-grid-react'
import ActionCellRender from './ActionCellRender'
import Utils from '../../Utils.js'
import { connect } from 'react-redux'

type Props = {
  setDetail: Function,
};

export class ModelList extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    const columnDefs = [
      {headerName: '模型编号', width: 120, field: 'id', suppressMovable: true, cellClass: classes.cn},
      {headerName: '模型名称', width: 120, field: 'name', suppressMovable: true, cellClass: classes.cn},
      {headerName: '状态', width: 120, field: 'status', suppressMovable: true, cellClass: classes.cn},
      {headerName: '产品', width: 120, field: 'productCode', suppressMovable: true, cellClass: classes.cn},
      {headerName: '站点', width: 120, field: 'operationCode', suppressMovable: true, cellClass: classes.cn},
      {headerName: '线别', width: 120, field: 'lineCode', suppressMovable: true, cellClass: classes.cn},
      {headerName: '机台', width: 120, field: 'eqCode', suppressMovable: true, cellClass: classes.cn},
      {headerName: '创建时间', width: 180, suppressMovable: true, field: 'createTime', cellClass: classes.cn},
      {headerName: '操作',
        suppressMovable: true,
        width: 80,
        field: 'status',
        suppressSorting: true,
        cellRendererFramework: ActionCellRender
      }
    ]
    this.onRowClicked = this.onRowClicked.bind(this)
    this.datasource = this.datasource.bind(this)
    this.data = {}
    this.state = {
      columnDefs
    }
  }

  onRowClicked (e) {
    this.bypassRender = true
    this.props.setDetail(e.data)
  }

  shouldComponentUpdate () {
    if (this.bypassRender) {
      this.bypassRender = false
      return false
    }

    return true
  }

  datasource () {
    let smIns = this
    return {
      getRows: function (params) {
        let pageSize = 10
        let pageNo = params.endRow / pageSize
        let url = Utils.format(smIns.props.data.mvTemplate, [pageNo, pageSize])
        fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': smIns.props.token
          }
        })
        .then(response => response.json())
        .then((data) => {
          params.successCallback(data.result.models, data.result.totalCount)
        })
      }
    }
  }

  render () {
    return (
      <div className={classes['ModelList-container']}>
        <section className={`${classes['ag-table']} ag-fresh`}>
          <AgGridReact
            enableSorting
            sortingOrder={['desc', 'asc']}
            rowSelection='single'
            rowModelType='pagination'
            paginationPageSize={10}
            columnDefs={this.state.columnDefs}
            onRowClicked={this.onRowClicked}
            datasource={this.datasource()}
          />
        </section>
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
)(ModelList)
