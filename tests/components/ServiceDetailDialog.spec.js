import React from 'react'
import { ServiceDetailDialog } from 'components/ServiceDetailDialog/ServiceDetailDialog'

describe('(Component) ServiceDetailDialog', () => {
  it('render normally', () => {
    const getModel = jest.fn()
    const wrapper = shallow(
      <ServiceDetailDialog getModel={getModel} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
