import React from 'react'
import { ModelTest } from 'components/ModelTest/ModelTest'

describe('(Component) ModelTest', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <ModelTest />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
