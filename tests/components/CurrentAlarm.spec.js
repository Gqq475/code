import React from 'react'
import { CurrentAlarm } from 'components/CurrentAlarm/CurrentAlarm'

describe('(Component) CurrentAlarm', () => {
  it('render normally if currentAlarmList exsited', () => {
    const getCurrentAlarm = jest.fn()
    const data = {
      currentAlarmList: [
        'id':1
      ]
    }
    const wrapper = shallow(
      <CurrentAlarm getCurrentAlarm={getCurrentAlarm} data={data} />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally if currentAlarmList did not exsit', () => {
    const getCurrentAlarm = jest.fn()
    const data = {
      currentAlarmList: undefined
    }
    const wrapper = shallow(
      <CurrentAlarm getCurrentAlarm={getCurrentAlarm} data={data} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
