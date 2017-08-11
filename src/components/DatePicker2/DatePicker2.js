import React from 'react'
import classes from './DatePicker.scss'
import { Position } from '@blueprintjs/core'
import { DateInput, TimePicker, TimePickerPrecision } from '@blueprintjs/datetime'
import moment from 'moment'

const boundaryDateFactory = (currentDate) => {
  return {
    max: {
      start: moment(currentDate.start).add(10, 'years').toDate(),
      end: moment(currentDate.end).add(10, 'years').toDate()
    },
    min: {
      start: moment(currentDate.start).subtract(10, 'years').toDate(),
      end: moment(currentDate.end).subtract(10, 'years').toDate()
    }
  }
}

type Props = {
  dateStart: String,
  dateEnd: String,
  handleStartDayChange: Function,
  handleEndDayChange: Function,
  handleStartTimeChange: Function,
  handleEndTimeChange: Function
};

export class DatePicker2 extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.state = {
      showActionsBar: true,
      popoverPosition: Position.BOTTOM_LEFT
    }
  }

  render () {
    const timeProps = {
      showArrowButtons: false,
      precision: TimePickerPrecision.MINUTE
    }
    let CurrentDate = {
      start: this.props.dateStart.toDate(),
      end: this.props.dateEnd.toDate()
    }

    // prevent side effect
    let boundaryDate = boundaryDateFactory(CurrentDate)

    return (
      <div className={classes['DatePicker-container']}>
        <section className={classes.header}>
          <span>时间范围</span>
        </section>
        <section className={classes.picker}>
          <span>从 </span>
          <section className={classes.handleContainer}>
            <div className={classes.date}>
              <DateInput
                {...this.state}
                value={CurrentDate.start}
                maxDate={boundaryDate.max.start}
                minDate={boundaryDate.min.start}
                onChange={this.props.handleStartDayChange} />
            </div>
            <TimePicker
              {...timeProps}
              className={classes.time}
              value={CurrentDate.start}
              onChange={this.props.handleStartTimeChange} />
          </section>
        </section>
        <section className={classes.picker}>
          <span>至 </span>
          <section className={classes.handleContainer}>
            <div className={classes.date}>
              <DateInput {...this.state}
                value={CurrentDate.end}
                maxDate={boundaryDate.max.end}
                minDate={boundaryDate.min.end}
                onChange={this.props.handleEndDayChange} />
            </div>
            <TimePicker
              {...timeProps}
              className={classes.time}
              value={CurrentDate.end}
              onChange={this.props.handleEndTimeChange} />
          </section>
        </section>
      </div>
    )
  }
}

export default DatePicker2
