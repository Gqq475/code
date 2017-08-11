import React from 'react'
import DefectCodeTabs from 'components/DefectCodeTabs/DefectCodeTabs'

describe('(Component) DefectCodeTabs', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <DefectCodeTabs />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
