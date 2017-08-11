import React from 'react'
import { EchartsHandlingPath } from 'components/EchartsHandlingPath/EchartsHandlingPath'

describe('(Component) EchartsHandlingPath', () => {
  it('render normally', () => {
    const data = {
      handlingPath: {
        result: [{
          DefectNumber: 62,
          DefectRate: '885.71%',
          GlassNumber: 7,
          PathType: 76,
          path: undefined
        }]
      }
    }
    const getHandlingPath = jest.fn()
    const wrapper = shallow(
      <EchartsHandlingPath
        data={data}
        getHandlingPath={getHandlingPath} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
