import React from 'react'
import { CreateServiceDialog } from 'components/CreateServiceDialog/CreateServiceDialog'

describe('(Component) CreateServiceDialog', () => {
  it('render normally', () => {
    const getModel = jest.fn()
    const wrapper = shallow(
      <CreateServiceDialog getModel={getModel} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
