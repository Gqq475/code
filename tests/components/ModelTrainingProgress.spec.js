import React from 'react'
import ModelTrainingProgress from 'components/ModelTrainingProgress/ModelTrainingProgress'

describe('(Component) ModelTrainingProgress', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <ModelTrainingProgress />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
