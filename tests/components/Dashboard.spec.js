import React from 'react'
import { Dashboard } from 'components/Dashboard/Dashboard'

describe('(Component) Dashboard', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <Dashboard />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
