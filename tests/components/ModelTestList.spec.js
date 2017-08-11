import React from 'react'
import { ModelTestList } from 'components/ModelTestList/ModelTestList'

describe('(Component) ModelTestList', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <ModelTestList />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
