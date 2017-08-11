import React from 'react'
import LabelingToolFilter from 'components/LabelingToolFilter/LabelingToolFilter'

describe('(Component) LabelingToolFilter', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <LabelingToolFilter />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
