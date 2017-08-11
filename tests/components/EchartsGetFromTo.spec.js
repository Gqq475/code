import React from 'react'
import { EchartsGetFromTo } from 'components/EchartsGetFromTo/EchartsGetFromTo'

describe('(Component) EchartsGetFromTo', () => {
  it('render normally', () => {
    const data = {
      getFromTo: {
        result: [{
          DefectNumber: 62,
          DefectRate: '885.71%',
          GlassNumber: 7,
          PathType: 76,
          path: undefined
        }]
      }
    }
    const getFromTo = jest.fn()
    const wrapper = shallow(
      <EchartsGetFromTo
        data={data}
        getFromTo={getFromTo} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
