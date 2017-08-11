import React from 'react'
import classes from './AGTable.scss'
import {AgGridReact} from 'ag-grid-react'

type Props = {
  loading: Boolean,
  multiSelect: Boolean,
  field: Object,
  handleClick: Function,
  setDataSource: Function
};

class CellRenderer extends React.Component {
  render () {
    return <div className={classes.cell}>{this.props.value}</div>
  }
}

CellRenderer.propTypes = {
  value: React.PropTypes.node.isRequired
}

export class UniverseTable extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.apiSelect = false
    this.stepCacheCols = []
    this.createColDefs = this.createColDefs.bind(this)
    this.setDatasource = this.setDatasource.bind(this)
    this.onRowClicked = this.onRowClicked.bind(this)
    this.onChangePageSize = this.onChangePageSize.bind(this)
    this.onSelectionChanged = this.onSelectionChanged.bind(this)
    this.onGridReady = this.onGridReady.bind(this)
    this.onModelUpdated = this.onModelUpdated.bind(this)
    this.state = {
      pageSize: 10
    }
  }

  createColDefs () {
    let field = this.props.field
    let columnDefs = []

    this.props.multiSelect && columnDefs.push(
      {
        headerName: '',
        width: 30,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        suppressSorting: true,
        suppressMenu: true
      }
    )

    Object.keys(field).map((f) => {
      columnDefs.push(
        {
          cellRendererFramework: CellRenderer,
          headerName: f,
          field: field[f],
          filter: 'text'
        }
      )
    })

    return columnDefs
  }

  setDatasource () {
    if (!this.api) {
      return
    }

    this.props.setDataSource(this.state.pageSize, this.api)
  }

  onGridReady (params) {
    this.api = params.api
    this.setDatasource()
  }

  onRowClicked (event) {
    this.props.handleClick(event.data.id)
  }

  onSelectionChanged (event) {
    // Pass API Select event
    if (this.apiSelect) {
      this.apiSelect = false
      return
    }

    this.stepCacheCols = []
    this.api.getSelectedRows().map((row) => {
      this.stepCacheCols.push(row.id)
    })
    this.props.handleClick(this.stepCacheCols)
  }

  onModelUpdated (event) {
    if (!this.api || this.stepCacheCols.length === 0) {
      return
    }

    // Copy value to avoid race update
    let tmpStepCacheCols = []
    this.stepCacheCols.map((col) => {
      tmpStepCacheCols.push(col)
    })

    this.api.forEachNode((node) => {
      if (tmpStepCacheCols.indexOf(node.data.id) !== -1 && !node.selected) {
        // Record API select event
        this.apiSelect = true
        node.setSelected(true, false)
      }
    })
  }

  onChangePageSize (e) {
    let pageSize = parseInt(e.target.value)
    this.setState({
      pageSize: pageSize
    })

    // FIXME: Work around to fix pagination not sync issue
    return new Promise(() => setTimeout(() => this.props.setDataSource(pageSize, this.api), 500))
  }

  componentWillUpdate () {
    this.props.loading && this.setDatasource()
  }

  componentDidUpdate () {
    this.apiSelect = false
  }

  componentDidMount () {
    this.apiSelect = false
  }

  render () {
    return (
      <div className={classes['Table-container'] + ' ag-fresh'} >
        <section className={classes.headerContainer}>
          {_.RESULT}
          <div className={classes.selectContainer}>
            <div className={classes.select_comment}>Show</div>
            <select className={'pt-select ' + classes.select} defaultValue='10' onChange={this.onChangePageSize}>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
            <div className={classes.select_comment}>entries per page</div>
          </div>
        </section>
        <section className={classes.tabelContainer}>
          <AgGridReact
            className={classes.table}
            onGridReady={this.onGridReady}
            onSelectionChanged={this.props.multiSelect ? this.onSelectionChanged : undefined}
            onRowClicked={!this.props.multiSelect ? this.onRowClicked : undefined}
            onModelUpdated={this.onModelUpdated}
            columnDefs={this.createColDefs()}
            // no binding part
            paginationPageSize={this.state.pageSize}
            rowModelType={'pagination'}
            suppressRowClickSelection={this.props.multiSelect}
            suppressMultiSort='false'
            rowSelection={!this.props.multiSelect ? 'single' : 'multiple'}
            enableServerSideSorting='true'
            rowHeight='22'
          />
        </section>
      </div>
    )
  }
}

export default UniverseTable
