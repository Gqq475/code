import React from 'react'
import AvailableFilters from 'components/AvailableFilters/AvailableFilters'

describe('(Component) AvailableFilters', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <AvailableFilters />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
