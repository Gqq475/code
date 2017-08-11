import React from 'react'
import AutoDefectCodeTabs from 'components/AutoDefectCodeTabs/AutoDefectCodeTabs'

describe('(Component) AutoDefectCodeTabs', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <AutoDefectCodeTabs />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
