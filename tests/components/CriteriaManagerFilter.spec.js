import React from 'react'
import { CriteriaManagerFilter } from 'components/CriteriaManagerFilter/CriteriaManagerFilter'

describe('(Component) CriteriaManagerFilter', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <CriteriaManagerFilter />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
