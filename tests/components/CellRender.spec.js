import React from 'react'
import { CellRender } from 'components/ServiceManagementList/CellRender'

describe('(Component) CellRender', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <CellRender />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
