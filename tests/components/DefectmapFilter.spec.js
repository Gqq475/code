import React from 'react'
import { DefectmapFilter } from 'components/DefectmapFilter/DefectmapFilter'

describe('(Component) DefactJudgeFilter', () => {
  it('render normally', () => {
    let props = {
      getLots: jest.fn(),
      getGlasses: jest.fn()
    }
    const wrapper = shallow(
      <DefectmapFilter {...props} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
