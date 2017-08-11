import React from 'react'
import CreateModelDialog from 'components/CreateModelDialog/CreateModelDialog'

describe('(Component) CreateModelDialog', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <CreateModelDialog />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
