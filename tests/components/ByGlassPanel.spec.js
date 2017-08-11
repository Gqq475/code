import React from 'react'
import { ByGlassPanel } from 'components/ByGlassPanel/ByGlassPanel'

describe('(Component) ByGlassPanel', () => {
  it('render normally', () => {
    const resetDM = jest.fn()
    const data = {
      glasses: {
        result: {
          lots: [
            'glassType':'Production',
            'id':6
          ],
          totalPage: 10
        }
      }
    }
    const wrapper = shallow(
      <ByGlassPanel resetDM={resetDM} data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
