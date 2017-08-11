import React from 'react'
import { AlarmHistoryFilter } from 'components/AlarmHistoryFilter/AlarmHistoryFilter'

describe('(Component) AlarmHistoryFilter', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <AlarmHistoryFilter />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
