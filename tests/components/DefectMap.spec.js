import React from 'react'
import { DefectMap } from 'components/DefectMap/DefectMap'

describe('(Component) DefectMap', () => {
  it('render normally', () => {
    const data = {
      dmloading: undefined
    }
    const wrapper = shallow(
      <DefectMap data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
