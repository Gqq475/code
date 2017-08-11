import React from 'react'
import Echarts from 'components/Echarts/Echarts'

describe('(Component) Echarts', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <Echarts />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
