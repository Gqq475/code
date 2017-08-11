import React from 'react'
import { ServiceManagementEdit } from 'components/ServiceManagementEdit/ServiceManagementEdit'

describe('(Component) ServiceManagementEdit', () => {
  it('render normally', () => {
    const data = {
      'id': '1'
    }
    const wrapper = shallow(
      <ServiceManagementEdit data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
