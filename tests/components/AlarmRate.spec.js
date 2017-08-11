import React from 'react'
import { AlarmRate } from 'components/AlarmRate/AlarmRate'

describe('(Component) AlarmRate', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <AlarmRate />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
