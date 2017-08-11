import React from 'react'
import { DatePicker2 } from 'components/DatePicker2/DatePicker2'
import moment from 'moment'

describe('(Component) DatePicker2', () => {
  it('render normally', () => {
    let props = {
      dateStart: moment(new Date('Tue Jun 06 2017 00:00:00 GMT+0800 (CST)')),
      dateEnd: moment(new Date('Tue Jun 06 2017 23:59:59 GMT+0800 (CST)')),
      handleStartDayChange: jest.fn(),
      handleEndDayChange: jest.fn(),
      handleStartTimeChange: jest.fn(),
      handleEndTimeChange: jest.fn()
    }
    const wrapper = shallow(
      <DatePicker2 {...props} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
