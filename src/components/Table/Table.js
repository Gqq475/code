import React from 'react'
import classes from './Table.scss'
import { Menu, MenuItem } from '@blueprintjs/core'
import {
    Cell,
    Column,
    ColumnHeaderCell,
    CopyCellsMenuItem,
    IMenuContext,
    SelectionModes,
    Table,
    Utils } from '@blueprintjs/table'
import MyUtils from '../../Utils.js'

type Props = {
  default: Boolean,
  field: Object,
  data: Object,
  handleClick: Function
};

export class AbstractSortableColumn {
  constructor (name, index) {
    this.name = name
    this.index = index
  }

  getColumn (getCellData, sortColumn) {
    const menu = this.renderMenu(sortColumn)
    const renderCell = (rowIndex: number, columnIndex: number) =>
      <Cell className={`${classes.cell}
        ${columnIndex === 0 ? {
          warning: classes['status-warning'],
          alarm: classes['status-alarm']
        }[getCellData(rowIndex, 2)] : ''}`}>
        {getCellData(rowIndex, columnIndex)}
      </Cell>
    const renderColumnHeader = () =>
      <ColumnHeaderCell className={classes.header} name={this.name} menu={menu} />
    return (
      <Column
        className={classes.col}
        key={this.index}
        name={this.name}
        renderCell={renderCell}
        renderColumnHeader={renderColumnHeader}
      />
    )
  }

  renderMenu (sortColumn): React.ReactElement<{}> {}
}

class TextSortableColumn extends AbstractSortableColumn {
  renderMenu (sortColumn) {
    const sortAsc = () => sortColumn(this.index, (a, b) => (this.compare(a, b)))
    const sortDesc = () => sortColumn(this.index, (a, b) => (this.compare(b, a)))
    return (
      <Menu>
        <MenuItem iconName='sort-asc' onClick={sortAsc} text='Sort Asc' />
        <MenuItem iconName='sort-desc' onClick={sortDesc} text='Sort Desc' />
      </Menu>)
  }

  compare (a, b) {
    return isNaN(a) ? a.toString().localeCompare(b) : a - b
  }
}

export class UniverseTable extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    let field = this.props.field
    let columns = []
    Object.keys(field).map((f, i) => {
      columns.push(new TextSortableColumn(f, i))
    })

    this.sortColumn = this.sortColumn.bind(this)
    this.getCellData = this.getCellData.bind(this)
    this.renderBodyContextMenu = this.renderBodyContextMenu.bind(this)
    this.dataFormat = this.dataFormat.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.prev = []
    this.state = {
      columns: columns,
      data: this.dataFormat(this.props.data, field),
      sortedIndexMap: []
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      data: this.dataFormat(nextProps.data, nextProps.field)
    })
  }

  dataFormat (data, field) {
    let formatted = []
    data.map((d) => {
      let data = []
      Object.values(field).map(f => {
        d[f] = MyUtils.formatDate(d[f])
        data.push(d[f] || (d[f] === false ? 'FALSE' : '-'))
      })
      formatted.push(data)
    })
    return formatted
  }

  renderBodyContextMenu = (context: IMenuContext) => {
    return (
      <Menu>
        <CopyCellsMenuItem
          context={context}
          getCellData={this.getCellData}
          text='复制' />
      </Menu>
    )
  }

  getCellData = (rowIndex: number, columnIndex: number) => {
    const sortedRowIndex = this.state.sortedIndexMap[rowIndex]
    if (sortedRowIndex != null) {
      rowIndex = sortedRowIndex
    }
    return this.state.data[rowIndex][columnIndex]
  }

  sortColumn = (columnIndex: number, comparator: (a, b) => number) => {
    const { data } = this.state
    const sortedIndexMap = Utils.times(data.length, (i: number) => (i))
    sortedIndexMap.sort((a: number, b: number) => {
      return comparator(
        data[a][columnIndex],
        data[b][columnIndex]
      )
    })
    this.setState({ sortedIndexMap })
  }

  handleSelect (e) {
    let isSame = (this.prev.length === e.length) && this.prev.every(function (element, index) {
      return element.rows[0] === e[index].rows[0]
    })

    if (!e[0] || isSame) {
      return
    }

    this.prev = e
    let row = (this.state.sortedIndexMap[e[0].rows[0]] !== undefined)
      ? this.state.sortedIndexMap[e[0].rows[0]]
      : e[0].rows[0]
    row = this.props.default ? this.props.data[row].id : row
    this.props.handleClick(row)
  }

  componentDidMount () {
    this.props.default && this.props.handleClick(this.state.data[0][0])
  }

  render () {
    // TODO: flexible column width
    const numRows = this.state.data.length
    const columns = this.state.columns.map((col) => (col.getColumn(this.getCellData, this.sortColumn)))
    return (
      <div className={classes['Table-container']}>
        <section className={classes.headerContainer}>{_.RESULT}</section>
        <section className={classes.tabelContaienr}>
          <Table
            defaultColumnWidth={125}
            defaultRowHeight={30}
            isRowHeaderShown={false}
            className={classes.table}
            allowMultipleSelection={false}
            selectionModes={SelectionModes.ALL}
            onSelection={this.handleSelect}
            numRows={numRows}
            renderBodyContextMenu={this.renderBodyContextMenu}>
            {columns}
          </Table>
        </section>
      </div>
    )
  }
}

export default UniverseTable
