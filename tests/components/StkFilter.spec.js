import React from 'react'
import StkFilter from 'components/StkFilter/StkFilter'

describe('(Component) StkFilter', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <StkFilter />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
