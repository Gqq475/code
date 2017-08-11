import React from 'react'
import { DeleteDialog } from 'components/ServiceManagementList/DeleteDialog'

describe('(Component) DeleteDialog', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <DeleteDialog />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
