import React from 'react'
import ModelVersionFilter from 'components/ModelVersionFilter/ModelVersionFilter'

describe('(Component) ModelVersionFilter', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <ModelVersionFilter />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
