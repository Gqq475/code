import React from 'react'
import Magnifier from 'components/Magnifier/Magnifier'

describe('(Component) Magnifier', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <Magnifier />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
