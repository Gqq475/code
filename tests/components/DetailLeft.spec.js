import React from 'react'
import { DetailLeft } from 'components/CriteriaManagerZone/DetailLeft'

describe('(Component) DetailLeft', () => {
  it('render normally', () => {
    const data = {
      'outliner': '1'
    }
    const wrapper = shallow(
      <DetailLeft data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
