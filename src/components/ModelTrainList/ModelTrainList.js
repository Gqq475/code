import React from 'react'
import classes from './ModelTrainList.scss'
import { AgGridReact } from 'ag-grid-react'
import ActionCellRender from './ActionCellRender'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

type Props = {
  setDetail: Function,
  modelTrainList: Array,
  getModelTrainAll: Function
};

export class ModelTrainList extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.onRowClicked = this.onRowClicked.bind(this)
    this.onGridReady = this.onGridReady.bind(this)
    this.state = {
      columnDefs: [
        {headerName: '模型编号', width: 100, field: 'id', suppressMovable: true, cellClass: classes.cn},
        {headerName: '模型名称', width: 120, field: 'name', suppressMovable: true, cellClass: classes.cn},
        {headerName: '状态',
          width: 120,
          field: 'status',
          suppressMovable: true,
          cellClass: classes.cn},
        {headerName: '路径', width: 180, field: 'path', suppressMovable: true, cellClass: classes.cn},
        {headerName: '标记', width: 180, field: 'note', suppressMovable: true, cellClass: classes.cn},
        {headerName: '产品', field: 'productCode', width: 120, suppressMovable: true, cellClass: classes.cn},
        {headerName: '站点', field: 'operationCode', width: 120, suppressMovable: true, cellClass: classes.cn},
        {headerName: '线别', field: 'lineCode', width: 120, suppressMovable: true, cellClass: classes.cn},
        {headerName: '机台', field: 'eqCode', width: 120, suppressMovable: true, cellClass: classes.cn},
        {headerName: '创建时间', width: 180, field: 'createTime', suppressMovable: true, cellClass: classes.cn},
        {headerName: '操作',
          suppressMovable: true,
          width: 120,
          field: 'status',
          suppressSorting: true,
          cellRendererFramework: ActionCellRender
        }
      ]
    }
  }

  onRowClicked (row) {
    this.bypassRender = true
    this.props.setDetail(row.data, false, false)
    this.props.getModelTrainAll(row.data.id)
  }

  shouldComponentUpdate () {
    if (this.bypassRender) {
      this.bypassRender = false
      return false
    }
    return true
  }

  onGridReady (params) {
    this.api = params.api
  }

  render () {
    return (
      <div className={classes['ModelList-container']}>
        <section className={`${classes['ag-table']} ag-fresh`}>
          {
            !isEmpty(this.props.modelTrainList) &&
            <AgGridReact
              onRowClicked={this.onRowClicked}
              enableSorting='true'
              sortingOrder={['desc', 'asc']}
              rowSelection='single'
              columnDefs={this.state.columnDefs}
              rowData={this.props.modelTrainList}
              onGridReady={this.onGridReady}
            />
          }
        </section>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    modelTrainList: state.ojs.modelTrainList
  }
})(ModelTrainList)
