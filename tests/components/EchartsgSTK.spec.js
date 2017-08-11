import React from 'react'
import { EchartsgSTK } from 'components/EchartsgSTK/EchartsgSTK'

describe('(Component) EchartsgSTK', () => {
  it('render normally', () => {
    const data = {
      stk: {
        result: [{
          DefectNumber: 62,
          DefectRate: '885.71%',
          GlassNumber: 7,
          PathType: 76,
          path: undefined
        }]
      }
    }
    const getSTK = jest.fn()
    const wrapper = shallow(
      <EchartsgSTK
        data={data}
        getSTK={getSTK} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
