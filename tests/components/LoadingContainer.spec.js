import React from 'react'
import LoadingContainer from 'components/LoadingContainer/LoadingContainer'

describe('(Component) LoadingContainer', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <LoadingContainer />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
