import React from 'react'
import DRTMFilter from 'components/DRTMFilter/DRTMFilter'

describe('(Component) DRTMFilter', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <DRTMFilter />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
