import React from 'react'
import { ServiceManagementList } from 'components/ServiceManagementList/ServiceManagementList'

describe('(Component) ServiceManagementList', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <ServiceManagementList />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
