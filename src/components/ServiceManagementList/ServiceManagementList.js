import React from 'react'
import classes from './ServiceManagementList.scss'
import {AgGridReact} from 'ag-grid-react'
import CreateServiceDialog from 'components/CreateServiceDialog'
import CellRender from './CellRender'
import ActionCellRender from './ActionCellRender'
import Mqtt from 'mqtt'
import { connect } from 'react-redux'
import { identifyRole } from '../../Utils.js'
const qca = __QCA__

type Props = {
  data: Object,
  setDetail: Function,
  getModel: Function,
  getCreateService: Function,
  userRole: Array
};

export class ServiceManagementList extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.onRowClicked = this.onRowClicked.bind(this)
    this.datasource = this.datasource.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
    this.onGridReady = this.onGridReady.bind(this)
    this.isVisibleStatusChanged = this.isVisibleStatusChanged.bind(this)
    this.onMsg = this.onMsg.bind(this)
    this.kernelIdArray = []

    this.msgQueue = []

    const columnDefs = [
      {headerName: 'Service ID', width: 90, field: 'id', suppressMovable: true, cellClass: classes.cn},
      {headerName: 'Service Name', field: 'name', suppressSorting: true, suppressMovable: true, cellClass: classes.cn},
      {headerName: 'Status-All',
        suppressMovable: true,
        field: 'status',
        cellRendererFramework: CellRender
      },
      {headerName: 'Model ID', width: 77, field: 'modelId', suppressMovable: true, cellClass: classes.cn},
      {headerName: 'Data Source', width: 150, field: 'dataSource', suppressMovable: true, cellClass: classes.cn},
      {headerName: 'Create Time',
        width: 180,
        field: 'createTime',
        sort: 'desc',
        suppressMovable: true,
        cellClass: classes.cn},
      {headerName: 'Action',
        suppressMovable: true,
        width: 180,
        field: 'status',
        suppressSorting: true,
        cellRendererFramework: ActionCellRender
      }
    ]

    this.state = {
      columnDefs,
      isOpen: false
    }
  }

  // WORKAROUND
  shouldComponentUpdate () {
    if (this.bypassRender) {
      this.bypassRender = false
      return false
    }

    return true
  }

  onRowClicked (e) {
    let target = e.event.target
    // ByPass Button click
    if (target !== undefined && target.nodeName !== 'BUTTON') {
      let data = e.data
      this.bypassRender = true
      this.props.setDetail(data)
    }
  }

  datasource () {
    let smIns = this
    return {
      rowCount: 1,
      getRows: (params) => {
        smIns.getRowsType = true

        let pageSize = 10
        let pageNow = params.endRow / pageSize
        const url = `${qca}/ojs/services?pageNum=${pageNow}&perPage=${pageSize}`
        fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': smIns.props.token
          }
        })
        .then(response => response.json())
        .then((data) => {
          let kernelIdArray = []
          smIns.result = data.result.Services
          smIns.Count = data.result.Count
          let lastRow = smIns.Count
          let result = smIns.result

          result.map((unitResult) => {
            if (!kernelIdArray.includes(unitResult.kernelId)) {
              kernelIdArray.push(unitResult.kernelId)
            }
          })

          if (!smIns.client) {
            if (__PROD__) {
              smIns.client = Mqtt.connect(`wss://${location.hostname}:59001`, {
                'rejectUnauthorized': false,
                'username': 'deltaww',
                'password': 'Dare2Define'
              })
            } else {
              smIns.client = Mqtt.connect(__MQTT__, {
                'rejectUnauthorized': false,
                'username': 'deltaww',
                'password': 'Dare2Define'
              })
            }
            smIns.kernelIdArray = kernelIdArray
            let client = smIns.client
            client.on('message', function (topic, message) {
              smIns.onMsg && smIns.onMsg(topic, message)
              console.log('message', message)
            })
            kernelIdArray.map((kernelId) => {
              client.on('connect', function () {
                client.subscribe(`autojudge/${kernelId}/agent`)
              })
            })
          } else {
            kernelIdArray.forEach((kernelId) => {
              if (!smIns.kernelIdArray.includes(kernelId)) {
                smIns.client.subscribe(`autojudge/${kernelId}/agent`)
              }
            })
            smIns.kernelIdArray = kernelIdArray.concat()
          }

          params.successCallback(result, lastRow)
          /* while (smIns.msgQueue.length) {
            smIns.getRowsType && (smIns.getRowsType = false)
            const item = smIns.msgQueue.pop()
            smIns.onMsg(item.topic, item.message)
          } */
          smIns.getRowsType = false
        })
      }
    }
  }

  onMsg (topic, message) {
    console.log('topic', topic, JSON.parse(message.toString()))
    if (!(/autojudge\/\d{1,}\/agent/).exec(topic)) {
      console.log('topic', topic, message)
      return
    }

    // this.getRowsType===true， Delayed update
    /* if (this.getRowsType) {
      this.msgQueue.push({topic, message})
      return
    } */

    let id = topic.match(/\/(.*?)\//)[1]
    let msgArray = JSON.parse(message.toString())
    if (msgArray['cmd'] !== 'status' && msgArray['cmd'] !== 'progress') {
      return
    }

    let updatedNodes = []
    let isChanged = false

    // Status updates
    msgArray['cmd'] === 'status' && this.api.forEachNode((node) => {
      let unitResult = node.data
      if (unitResult.kernelId.toString() === id &&
        msgArray['reason'] === '' &&
        this.isVisibleStatusChanged(unitResult.status, msgArray['payload'])) {
        unitResult.status = msgArray['payload']
        isChanged = true
      }
      node.data.progress = 0
      updatedNodes.push(node)
    })

    // Add a progress bar
    msgArray['cmd'] === 'progress' && this.api.forEachNode((node) => {
      console.log('progress')
      node.data.progress = ((+msgArray['payload']).toFixed(3) * 100) + '%'
      isChanged = true
      updatedNodes.push(node)
    })

    isChanged && this.api.refreshRows(updatedNodes)
  }

  isVisibleStatusChanged (oldStatus, newStatus) {
    return (this.getVisibleStatusCode(oldStatus) !== this.getVisibleStatusCode(newStatus)) ||
    ((oldStatus === 'started') !== (newStatus === 'started'))
  }

  getVisibleStatusCode (status) {
    switch (status) {
      case 'none':
      case 'destroyed':
        return 0
      case 'initing':
      case 'inited':
      case 'starting':
        return 1
      case 'started':
        return 2
      case 'feeding':
      case 'feeded':
        return 3
      case 'destroying':
        return 4
      default:
        return -1
    }
  }

  onGridReady (params) {
    this.api = params.api
    // this.api.setDatasource(this.datasource())
  }

  toggleDialog () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  componentWillUnmount () {
    // UnSubscribe mqtt
    this.client && this.client.end(() => {
      console.log('Disconnect')
    })
  }

  render () {
    return (
      <div className={classes['ServiceManagementList-container']}>
        <section className={`${classes.title} ${classes.clear}`}>
          <h4 className={`${classes.left}`}>Service List
            {
              (identifyRole(this.props.userRole) === 'admin') ? (
                <button type='button' onClick={this.toggleDialog}
                  className={`${classes.ml10} pt-button pt-intent-primary pt-icon-plus`} />
              ) : null
            }
            {
              this.state.isOpen
              ? <CreateServiceDialog isOpen={this.state.isOpen} toggleDialog={this.toggleDialog}
                data={this.props.data}
                getModel={this.props.getModel}
                getCreateService={this.props.getCreateService}
                dataList={this.result} />
              : ''
            }
          </h4>
        </section>

        <section className={`${classes['ag-table']} ag-fresh`}>
          <AgGridReact
            enableSorting
            sortingOrder={['desc', 'asc']}
            rowSelection='single'
            rowModelType='pagination'
            paginationPageSize={10}
            onGridReady={this.onGridReady}
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
    token: state.auth.token,
    userRole: state.auth.userRole
  }),
  (dispatch, state) => {
    return {
      dispatch
    }
  }
)(ServiceManagementList)
