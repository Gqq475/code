import React from 'react'
import CurrentAlarmFilter from 'components/CurrentAlarmFilter/CurrentAlarmFilter'

describe('(Component) CurrentAlarmFilter', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <CurrentAlarmFilter />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
