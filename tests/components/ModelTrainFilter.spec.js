import React from 'react'
import { ModelTrainFilter } from 'components/ModelTrainFilter/ModelTrainFilter'

describe('(Component) ModelTrainFilter', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <ModelTrainFilter />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
