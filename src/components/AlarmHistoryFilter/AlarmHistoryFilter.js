import React from 'react'
import classes from './AlarmHistoryFilter.scss'
import DatePicker2 from 'components/DatePicker2'
import { Button } from '@blueprintjs/core'
import moment from 'moment'
import { dateHOC } from '../../Utils'

export const CUR_BTN_ID = 'curBtn'
export const PRV_BTN_ID = 'preBtn'
export const DATE_BTN_ID = 'dateBtn'

const formatDate = (date) => date.format('YYYY-MM-DD HH:mm:ss')

type Props = {
  getAlarmHistoryByCondition: Function,
  setStart: Function,
  setEnd: Function,
  dateStart: String,
  dateEnd: String
};

export class AlarmHistoryFilter extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleNowClick = this.handleNowClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)
    this.handleOkClick = this.handleOkClick.bind(this)
  }

  handleNowClick (e) {
    let todayStart = moment().startOf('day')
    let todayEnd = moment().endOf('day')

    this.showActiveButton(CUR_BTN_ID)
    this.props.setStart(todayStart)
    this.props.setEnd(todayEnd)
    this.props.getAlarmHistoryByCondition({
      dateStart: formatDate(todayStart),
      dateEnd: formatDate(todayEnd)
    })
  }

  handlePrevClick (e) {
    // Set the start and end as yesterday
    let yesterdayStart = moment().add(-1, 'days').startOf('day')
    let yesterdayEnd = moment().add(-1, 'days').endOf('day')

    this.showActiveButton(PRV_BTN_ID)
    this.props.setStart(yesterdayStart)
    this.props.setEnd(yesterdayEnd)
    this.props.getAlarmHistoryByCondition({
      dateStart: formatDate(yesterdayStart),
      dateEnd: formatDate(yesterdayEnd)
    })
  }

  handleOkClick (e) {
    // Filter to only date
    this.showActiveButton(DATE_BTN_ID)
    this.props.getAlarmHistoryByCondition({
      dateStart: formatDate(this.props.dateStart),
      dateEnd: formatDate(this.props.dateEnd)
    })
  }

  componentDidMount () {
    // Hight current time button
    this.showActiveButton(DATE_BTN_ID)
    this.props.getAlarmHistoryByCondition({
      dateStart: formatDate(this.props.dateStart),
      dateEnd: formatDate(this.props.dateEnd)
    })
  }

  showActiveButton (activeBtnId) {
    if (!document.getElementById(activeBtnId) ||
       !document.getElementById(CUR_BTN_ID) ||
       !document.getElementById(PRV_BTN_ID) ||
       !document.getElementById(DATE_BTN_ID)) {
      return
    }

    let defaultCls = classes['btn-submit'] + ' pt-button'
    // clear all state first
    document.getElementById(CUR_BTN_ID).className = defaultCls
    document.getElementById(PRV_BTN_ID).className = defaultCls
    document.getElementById(DATE_BTN_ID).className = defaultCls

    document.getElementById(activeBtnId).className += ' pt-active'
  }

  render () {
    return (
      <div className={classes['AlarmHistoryFilter-container']}>
        <section className={classes.header}>{'快速查询'}</section>
        <div className={classes.searchContainer}>
          <Button id={CUR_BTN_ID} className={classes['btn-submit']} onClick={this.handleNowClick}>{_.当班}</Button>
          <Button id={PRV_BTN_ID} className={classes['btn-submit']} onClick={this.handlePrevClick}>{_.上一班}</Button>
        </div>
        <hr />
        <DatePicker2 {...this.props} />
        <div className={classes.searchContainer}>
          <Button id={DATE_BTN_ID} onClick={this.handleOkClick}>{_.SEARCH}</Button>
        </div>
      </div>
    )
  }
}

export default dateHOC(props => <AlarmHistoryFilter {...props} />)
