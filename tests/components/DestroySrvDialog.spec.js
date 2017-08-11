import React from 'react'
import { DestroySrvDialog } from 'components/ServiceManagementList/DestroySrvDialog'

describe('(Component) DestroySrvDialog', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <DestroySrvDialog />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
