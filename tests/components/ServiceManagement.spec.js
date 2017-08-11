import React from 'react'
import ServiceManagement from 'components/ServiceManagement/ServiceManagement'

describe('(Component) ServiceManagement', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <ServiceManagement />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
