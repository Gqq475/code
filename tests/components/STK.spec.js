import React from 'react'
import STK from 'components/STK/STK'

describe('(Component) STK', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <STK />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
