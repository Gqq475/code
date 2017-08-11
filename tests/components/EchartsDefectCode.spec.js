import React from 'react'
import { EchartsDefectCode } from 'components/EchartsDefectCode/EchartsDefectCode'

describe('(Component) EchartsDefectCode', () => {
  it('render normally if top5 is not exist', () => {
    const data = {
      top5Data: [{
        'code': 234,
        'count': 54552,
        'ratio': 0.54235,
        'sum': 23445
      }]
    }
    const wrapper = shallow(
      <EchartsDefectCode data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render normally if top5 is exist', () => {
    const data = {
      top5Data: {}
    }
    const wrapper = shallow(
      <EchartsDefectCode data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
