import React from 'react'
import moment from 'moment'
import { EchartsFilter } from 'components/EchartsFilter/EchartsFilter'

describe('(Component) EchartsFilter', () => {
  it('render normally', () => {
    const getEchartsLeftMenu = jest.fn()
    const getHandlingPath = jest.fn()
    const getEquipmentPort = jest.fn()
    const getSTK = jest.fn()
    const getFromTo = jest.fn()
    const wrapper = shallow(
      <EchartsFilter
        dateStart={moment('2017-06-07T17:12:35+08:00')}
        dateEnd={moment('2017-06-07T17:12:35+08:00')}
        getEchartsLeftMenu={getEchartsLeftMenu}
        getHandlingPath={getHandlingPath}
        getEquipmentPort={getEquipmentPort}
        getSTK={getSTK}
        getFromTo={getFromTo} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
