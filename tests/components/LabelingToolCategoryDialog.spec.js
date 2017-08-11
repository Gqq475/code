import React from 'react'
import { LabelingToolCategoryDialog } from 'components/LabelingToolCategoryDialog/LabelingToolCategoryDialog'

describe('(Component) LabelingToolCategoryDialog', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <LabelingToolCategoryDialog />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
