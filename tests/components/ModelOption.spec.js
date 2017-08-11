import React from 'react'
import { ModelOption } from 'components/ModelOption/ModelOption'

describe('(Component) ModelOption', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <ModelOption />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
