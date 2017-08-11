import React from 'react'
import DefectMapZone from 'components/DefectMapZone/DefectMapZone'

describe('(Component) DefectMapZone', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <DefectMapZone />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
