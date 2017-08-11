import React from 'react'
import { DialogFilter } from 'components/DialogFilter/DialogFilter'

// TypeError: Cannot read property 'length' of undefined
describe('(Component) DialogFilter', () => {
  it('render normally', () => {
    const data = {
      kernelIds: [1, 98],
      kernelId: 1
    }
    const wrapper = shallow(
      <DialogFilter {...data} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
