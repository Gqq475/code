import React from 'react'
import { DetailRight } from 'components/CriteriaManagerZone/DetailRight'

describe('(Component) DetailRight', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <DetailRight />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
