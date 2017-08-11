import React from 'react'
import classes from './LabelingToolDefectCodeList.scss'
import {AgGridReact} from 'ag-grid-react'
import ActionCellRender from './ActionCellRender'
// import Utils from '../../Utils.js'

type Props = {
  defectList: Array,
  selectDefect: Function
};

export class LabelingToolDefectCodeList extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.onRowClicked = this.onRowClicked.bind(this)
    const columnDefs = [
      {
        headerName: 'No',
        width: 60,
        field: 'id',
        suppressMovable: true,
        cellClass: classes.cn
      }, {
        headerName: 'Defect Code',
        field: 'name',
        suppressSorting: true,
        suppressMovable: true,
        cellClass: classes.cn
      }, {
        headerName: 'Image Id',
        width: 90,
        field: 'imageId',
        suppressMovable: true,
        cellClass: classes.cn
      }, {
        headerName: 'Action',
        suppressMovable: true,
        width: 90,
        suppressSorting: true,
        cellRendererFramework: ActionCellRender
      }
    ]

    this.state = {
      columnDefs
    }
  }

  // datasource () {
  //   return {
  //     rowCount: 1,
  //     getRows: (params) => {
  //       let pageSize = 10
  //       let pageNo = params.endRow / pageSize
  //       const url = Utils.format(this.props.data.labelingTem, [pageNo, pageSize])
  //       fetch(url)
  //       .then(response => response.json())
  //       .then((data) => {
  //         console.dir(data.result.imageDefects)
  //         params.successCallback(data.result.imageDefects)
  //       })
  //     }
  //   }
  // }
  onRowClicked (rowInfo) {
    this.props.selectDefect(rowInfo.rowIndex)
  }

  render () {
    return (
      <div className={`${classes['LabelingToolDefectCodeList-container']} ag-fresh`}>
        <AgGridReact
          onRowClicked={this.onRowClicked}
          rowSelection={'single'}
          columnDefs={this.state.columnDefs}
          rowData={this.props.defectList}
          rowHeight={30}
        />
      </div>
    )
  }
}

export default LabelingToolDefectCodeList
