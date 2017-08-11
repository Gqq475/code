import React from 'react'
import { ByLotPanel } from 'components/ByLotPanel/ByLotPanel'

describe('(Component) ByLotPanel', () => {
  it('render normally', () => {
    const resetDM = jest.fn()
    const lots = {
      result: {
        lots: [
          'id': 4
        ],
        totalPage: 1
      }
    }
    const wrapper = shallow(
      <ByLotPanel resetDM={resetDM} data={lots} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
