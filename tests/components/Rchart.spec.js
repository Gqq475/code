import React from 'react'
import Rchart from 'components/Rchart/Rchart'

describe('(Component) Rchart', () => {
  it('render if Rchart not exist ', () => {
    const forEach = jest.fn()
    const toFixed = jest.fn()
    const data = {
      item: {
        r: 4.25452
      },
      lineData: {
        'ucl': 8.02,
        'lcl': 5.99,
        'cl': 7,
        'usl': 7.5,
        'sl': 7,
        'lsl': 6.5
      },
      rbarData: [
        {
          'r': 4.25452,
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
          'r': 4.25452,
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
      <Rchart {...data}
        forEach={forEach}
        toFixed={toFixed}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('if Rchart "did" exist ', () => {
    const data = {}
    const wrapper = shallow(
      <Rchart data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
