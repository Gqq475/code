import React from 'react'
import { CriteriaManagerEditer } from 'components/CriteriaManagerEditer/CriteriaManagerEditer'

describe('(Component) CriteriaManagerEditer', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <CriteriaManagerEditer />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
