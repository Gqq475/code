import React from 'react'
import classes from './CurrentAlarm.scss'
import CurrentAlarmTable from 'components/Table'
import Utils from '../../Utils.js'

type Props = {
  data: Object,
  getCurrentAlarm: Function
}

const field = {
  [_.ID]: 'id',
  [_.STATUS]: 'status',
  [_.ALARMTYPE]: 'type',
  [_.ALARMLEVEL]: 'level',
  [_.PRODUCTID]: 'productCode',
  [_.LINEID]: 'lineCode',
  [_.OPERATIONID]: 'operationCode',
  [_.SUBENTITY]: 'subEqCode',
  [_.GLASSID]: 'glassCode',
  [_.OOC]: 'ooc',
  [_.OOS]: 'oos',
  [_.REAL]: 'realValue',
  [_.CREATETIME]: 'createTime',
  [_.LASTUPDATE]: 'updateTime'
}

export class TextField {
  constructor (key, value) {
    this.key = key
    this.value = value
  }

  getRender () {
    return (
      <div className={classes.textField}>
        <div className={classes.key}>
          {this.key}
        </div>
        <div className={classes.value}>
          {this.value}
        </div>
      </div>
    )
  }
}

export class CurrentAlarm extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.state = {
      rows: '0'
    }
  }

  componentWillMount () {
    this.props.getCurrentAlarm()
  }

  handleSelect (rows) {
    this.setState({ rows })
  }

  render () {
    let data = this.props.data
    let rows = this.state.rows
    let startTime, endTime, updateTime
    if (data.currentAlarmList && data.currentAlarmList[rows]) {
      startTime = Utils.formatDate(data.currentAlarmList[rows].calStartTime)
      endTime = Utils.formatDate(data.currentAlarmList[rows].calEndTime)
      updateTime = Utils.formatDate(data.currentAlarmList[rows]['updateTime'])
    }
    return (
      <div className={classes['CurrentAlarm-container']}>
        {
          data.currentAlarmList &&
            <CurrentAlarmTable
              default={0}
              field={field}
              data={data.currentAlarmList}
              handleClick={this.handleSelect} />
        }
        {
          data.currentAlarmList &&
            <div className={`pt-card pt-elevation-2 ${classes.detail}`}>
              <div className={classes.header}>
                <div>告警详情</div>
              </div>
              <div className={classes.content}>
                <div className={classes.left}>
                  {new TextField(_.ID, data.currentAlarmList[rows].id).getRender()}
                  {new TextField(_.PRODUCTID, data.currentAlarmList[rows].productCode).getRender()}
                  {new TextField(_.OPERATIONID, data.currentAlarmList[rows]['operationCode']).getRender()}
                  {new TextField(_.LINEID, data.currentAlarmList[rows]['lineCode']).getRender()}
                  {new TextField(_.SUBENTITY, data.currentAlarmList[rows]['subEqCode']).getRender()}
                </div>
                <div className={classes.center}>
                  {new TextField(_.ALARMTYPE, data.currentAlarmList[rows].type).getRender()}
                  {new TextField(_.CONDITION, data.currentAlarmList[rows].condi ||
                    '固定时间30分钟内Defect数量[defectSize > L]').getRender()}
                  {new TextField(_.OOC, data.currentAlarmList[rows].ooc).getRender()}
                  {new TextField(_.OOS, data.currentAlarmList[rows].oos).getRender()}
                  {new TextField(_.REAL, data.currentAlarmList[rows]['realValue']).getRender()}
                  {new TextField(_.计算时间,
                    `${startTime} - ${endTime}`)
                    .getRender()}
                  {new TextField('摘要', data.currentAlarmList[rows].summary || '*').getRender()}
                </div>
                <div className={classes.right}>
                  {new TextField('更新者工号', data.currentAlarmList[rows]['updateBy']).getRender()}
                  {new TextField(_.LASTUPDATE, updateTime).getRender()}
                  {new TextField(_.COMMENT, data.currentAlarmList[rows].comments).getRender()}
                </div>
              </div>
            </div>
        }
      </div>
    )
  }
}

export default CurrentAlarm
