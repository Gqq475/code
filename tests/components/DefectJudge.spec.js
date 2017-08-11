import React from 'react'
import { DefectJudge } from 'components/DefectJudge/DefectJudge'

describe('(Component) DefectJudge', () => {
  it('render normally', () => {
    const glassList = {
      result: {
        lots: [
          'id' : 1
        ],
        totalPage: 1
      }
    }
    const wrapper = shallow(
      <DefectJudge data={glassList} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
