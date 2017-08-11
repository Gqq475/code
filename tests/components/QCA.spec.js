import React from 'react'
import QCA from 'components/QCA/QCA'

describe('(Component) QCA', () => {
  it('render path is defectMap normally', () => {
    const resetDM = jest.fn()
    const getDefectByLotId = jest.fn()
    const getDefectByGlassId = jest.fn()
    const getHandlingPath = jest.fn()
    const getEquipmentPort = jest.fn()
    const getSTK = jest.fn()
    const getFromTo = jest.fn()
    const getTop5Data = jest.fn()
    const getDefectDetail = jest.fn()
    const data = {
      qca: {
        a: {
          a: '23'
        },
        b: {
          b: '23'
        }
      },
      params: {
        'path': 'defectmap'
      }
    }
    const wrapper = shallow(
      <QCA {...data}
        resetDM={resetDM}
        getDefectByLotId={getDefectByLotId}
        getDefectByGlassId={getDefectByGlassId}
        getHandlingPath={getHandlingPath}
        getEquipmentPort={getEquipmentPort}
        getSTK={getSTK}
        getFromTo={getFromTo}
        getTop5Data={getTop5Data}
        getDefectDetail={getDefectDetail}
        />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render path is dashboard normally', () => {
    const resetDM = jest.fn()
    const getDefectByLotId = jest.fn()
    const getDefectByGlassId = jest.fn()
    const getHandlingPath = jest.fn()
    const getEquipmentPort = jest.fn()
    const getSTK = jest.fn()
    const getFromTo = jest.fn()
    const getTop5Data = jest.fn()
    const getDefectDetail = jest.fn()
    const data = {
      qca: {
        a: {
          a: '23'
        },
        b: {
          b: '23'
        }
      },
      params: {
        'path': 'dashboard'
      }
    }
    const wrapper = shallow(
      <QCA {...data}
        resetDM={resetDM}
        getDefectByLotId={getDefectByLotId}
        getDefectByGlassId={getDefectByGlassId}
        getHandlingPath={getHandlingPath}
        getEquipmentPort={getEquipmentPort}
        getSTK={getSTK}
        getFromTo={getFromTo}
        getTop5Data={getTop5Data}
        getDefectDetail={getDefectDetail}
        />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render path is stk normally', () => {
    const resetDM = jest.fn()
    const getDefectByLotId = jest.fn()
    const getDefectByGlassId = jest.fn()
    const getHandlingPath = jest.fn()
    const getEquipmentPort = jest.fn()
    const getSTK = jest.fn()
    const getFromTo = jest.fn()
    const getTop5Data = jest.fn()
    const getDefectDetail = jest.fn()
    const data = {
      qca: {
        a: {
          a: '23'
        },
        b: {
          b: '23'
        }
      },
      params: {
        'path': 'stk'
      }
    }
    const wrapper = shallow(
      <QCA {...data}
        resetDM={resetDM}
        getDefectByLotId={getDefectByLotId}
        getDefectByGlassId={getDefectByGlassId}
        getHandlingPath={getHandlingPath}
        getEquipmentPort={getEquipmentPort}
        getSTK={getSTK}
        getFromTo={getFromTo}
        getTop5Data={getTop5Data}
        getDefectDetail={getDefectDetail}
        />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render path is echarts normally', () => {
    const resetDM = jest.fn()
    const getDefectByLotId = jest.fn()
    const getDefectByGlassId = jest.fn()
    const getHandlingPath = jest.fn()
    const getEquipmentPort = jest.fn()
    const getSTK = jest.fn()
    const getFromTo = jest.fn()
    const getTop5Data = jest.fn()
    const getDefectDetail = jest.fn()
    const data = {
      qca: {
        a: {
          a: '23'
        },
        b: {
          b: '23'
        }
      },
      params: {
        'path': 'echarts'
      }
    }
    const wrapper = shallow(
      <QCA {...data}
        resetDM={resetDM}
        getDefectByLotId={getDefectByLotId}
        getDefectByGlassId={getDefectByGlassId}
        getHandlingPath={getHandlingPath}
        getEquipmentPort={getEquipmentPort}
        getSTK={getSTK}
        getFromTo={getFromTo}
        getTop5Data={getTop5Data}
        getDefectDetail={getDefectDetail}
        />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render path is cpk normally', () => {
    const resetDM = jest.fn()
    const getDefectByLotId = jest.fn()
    const getDefectByGlassId = jest.fn()
    const getHandlingPath = jest.fn()
    const getEquipmentPort = jest.fn()
    const getSTK = jest.fn()
    const getFromTo = jest.fn()
    const getTop5Data = jest.fn()
    const getDefectDetail = jest.fn()
    const data = {
      qca: {
        a: {
          a: '23'
        },
        b: {
          b: '23'
        }
      },
      params: {
        'path': 'cpk'
      }
    }
    const wrapper = shallow(
      <QCA {...data}
        resetDM={resetDM}
        getDefectByLotId={getDefectByLotId}
        getDefectByGlassId={getDefectByGlassId}
        getHandlingPath={getHandlingPath}
        getEquipmentPort={getEquipmentPort}
        getSTK={getSTK}
        getFromTo={getFromTo}
        getTop5Data={getTop5Data}
        getDefectDetail={getDefectDetail}
        />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
