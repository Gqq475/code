import React from 'react'
import XbarChart from 'components/XbarChart/XbarChart'

describe('(Component) XbarChart', () => {
  it('if Xbarchart "did" not exist ', () => {
    const forEach = jest.fn()
    const data = {
      lineData: {
        'ucl': 8.02,
        'lcl': 5.99,
        'cl': 7,
        'usl': 7.5,
        'sl': 7,
        'lsl': 6.5
      },
      xbarData: [
        {
          'dateTime': '2017/04/05 16:25:00',
          'xbar': 7.42,
          'xmax': 7.8,
          'xmin': 7.03,
          'type': 'ooc',
          'againstRules': [
            '規則1: 連續一點超出管制線外',
            '發生SOOS單點超規'
          ]
        },
        {
          'dateTime': '2017/04/05 16:25:00',
          'xbar': 7.42,
          'xmax': 7.8,
          'xmin': 7.03,
          'type': 'oos',
          'againstRules': [
            '規則1: 連續一點超出管制線外',
            '發生SOOS單點超規'
          ]
        }
      ]
    }
    const wrapper = shallow(
      <XbarChart {...data}
        forEach={forEach}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('if Xbarchart "did" exist ', () => {
    const data = {}
    const wrapper = shallow(
      <XbarChart data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
