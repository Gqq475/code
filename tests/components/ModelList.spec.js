import React from 'react'
import { ModelList } from 'components/ModelList/ModelList'

describe('(Component) ModelList', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <ModelList />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
