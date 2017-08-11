import React from 'react'
import EchartsDefectRawData from 'components/EchartsDefectRawData/EchartsDefectRawData'

describe('(Component) EchartsDefectRawData', () => {
  it('render normally if handlingPath is not exist', () => {
    const data = {
      handlingPath: {
        result: {
          PathType: 'dgds',
          DefectNumber: 12,
          defectRate: 23,
          glassNumber: 2
        }
      }
    }
    const wrapper = shallow(
      <EchartsDefectRawData {...data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render normally if handlingPath is exist', () => {
    const data = {}
    const wrapper = shallow(
      <EchartsDefectRawData {...data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
