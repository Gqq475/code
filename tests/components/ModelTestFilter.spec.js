import React from 'react'
import { ModelTestFilter } from 'components/ModelTestFilter/ModelTestFilter'

describe('(Component) ModelTestFilter', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <ModelTestFilter />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
