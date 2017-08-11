import React from 'react'
import { AutoDefectJudgeFilter } from 'components/AutoDefectJudgeFilter/AutoDefectJudgeFilter'

describe('(Component) AutoDefectJudgeFilter', () => {
  it(' render normally if defectCode was not empty.', () => {
    const data = {
      'defectCode': {
        result: [
          'aaaaaa',
          'TEINR',
          'test01',
          'test02',
          'TGGS0',
          'TNPLR0',
          'TNPSR0',
          'TNWLR0',
          'TNWPR0',
          'TPDPD',
          'TPDPS',
          'TSFAS',
          'TTFBA',
          'TTFBG',
          'TTP3S',
          'TTSAD'
        ]
      }
    }
    const wrapper = shallow(
      <AutoDefectJudgeFilter data={data} />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it(' render normally if defectCode was empty.', () => {
    const data = {
      'defectCode': {}
    }
    const wrapper = shallow(
      <AutoDefectJudgeFilter data={data} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
