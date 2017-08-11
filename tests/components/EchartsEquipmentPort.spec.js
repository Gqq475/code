import React from 'react'
import { EchartsEquipmentPort } from 'components/EchartsEquipmentPort/EchartsEquipmentPort'

describe('(Component) EchartsEquipmentPort', () => {
  it('render normally', () => {
    const data = {
      equipmentPort: {
        result: [{
          DefectNumber: 62,
          DefectRate: '885.71%',
          GlassNumber: 7,
          PathType: 76,
          path: undefined
        }]
      }
    }
    const getEquipmentPort = jest.fn()
    const wrapper = shallow(
      <EchartsEquipmentPort
        data={data}
        getEquipmentPort={getEquipmentPort} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
