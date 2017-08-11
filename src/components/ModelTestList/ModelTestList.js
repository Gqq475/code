import React from 'react'
import classes from './ModelTestList.scss'
import { connect } from 'react-redux'
import { AgGridReact } from 'ag-grid-react'
import { assign } from 'lodash'
import {
  getTestResultType
} from 'routes/OJS/modules/ModelTest'

type Props = {
  dispatch: Function,
  setDetail: Function,
  token: String
};

export class ModelTestList extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      columnDefs: [
        {headerName: '模型编号', field: 'id', width: 80, suppressMovable: true, cellClass: classes.cn},
        {headerName: '模型名称', field: 'name', width: 100, suppressMovable: true, cellClass: classes.cn},
        {headerName: '状态', field: 'status', width: 100, suppressMovable: true, cellClass: classes.cn},
        {headerName: '产品', field: 'productCode', width: 180, suppressMovable: true, cellClass: classes.cn},
        {headerName: '站点', field: 'operationCode', width: 180, suppressMovable: true, cellClass: classes.cn},
        {headerName: '线别', field: 'lineCode', width: 180, suppressMovable: true, cellClass: classes.cn},
        {headerName: '机台', field: 'eqCode', width: 180, suppressMovable: true, cellClass: classes.cn},
        {headerName: '创建时间', field: 'createTime', width: 180, suppressMovable: true, cellClass: classes.cn},
        {headerName: '更新时间', field: 'updateTime', width: 180, suppressMovable: true, cellClass: classes.cn}
      ]
    }
    this.handleRowSelected = this.handleRowSelected.bind(this)
  }

  componentDidMount () {
    // let pageSize = 10
    // let pageNum = 10 / pageSize

    fetch(`${__QCA__}/offline/version_control/model_versions`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': this.props.token
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState(assign({}, this.state, {
        data: json.result.models
      }))
    })
    .catch(err => console.log(err))
  }

  handleRowSelected (rowInfo) {
    this.props.dispatch(getTestResultType(rowInfo.data.id))
    this.props.setDetail(rowInfo.data)
  }

  render () {
    return (
      <div className={classes['ModelTestList-container']}>
        <section className={`${classes['ag-table']} ag-fresh`}>
          <AgGridReact
            rowSelection='single'
            onRowClicked={this.handleRowSelected}
            rowData={this.state.data}
            columnDefs={this.state.columnDefs}
            enableSorting
          />
        </section>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    token: state.auth.token
  })
)(ModelTestList)
