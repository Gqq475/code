import React from 'react'
import { DefactJudgeFilter } from 'components/DefactJudgeFilter/DefactJudgeFilter'

describe('(Component) DefactJudgeFilter', () => {
  it('render normally', () => {
    let props = {
      getDefectJudgeList: jest.fn()
    }
    const wrapper = shallow(
      <DefactJudgeFilter {...props} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
