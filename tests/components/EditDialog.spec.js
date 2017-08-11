import React from 'react'
import { EditDialog } from 'components/ModelDetail/EditDialog'

describe('(Component) EditDialog', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <EditDialog />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
