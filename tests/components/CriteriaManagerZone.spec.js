import React from 'react'
import { CriteriaManagerZone } from 'components/CriteriaManagerZone/CriteriaManagerZone'

describe('(Component) CriteriaManagerZone', () => {
  it('render normally', () => {
    const data = {
      id: 1
    }
    const wrapper = shallow(
      <CriteriaManagerZone data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
