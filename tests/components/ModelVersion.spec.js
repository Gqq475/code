import React from 'react'
import ModelVersion from 'components/ModelVersion/ModelVersion'

describe('(Component) ModelVersion', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <ModelVersion />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
