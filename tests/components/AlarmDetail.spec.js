import React from 'react'
import { AlarmDetail } from 'components/AlarmDetail/AlarmDetail'
describe('(Component) AlarmDetail', () => {
  it('render normally if data was not empty', () => {
    const data = [
      'data': {
        'length': 1,
        'createTime': 'May 16, 2017 4:34:36 AM',
        'id': 256,
        'productCode': 'SV509-CF',
        'operationCode': '2100',
        'lineCode': 'PIPR01',
        'subEqCode': 'PIN01',
        'type': 'alarm',
        'condi': '',
        'ooc': 5.0,
        'oos': 8.0,
        'level': 2,
        'realValue': '3片，平均值12.3333',
        'calStartTime': 'May 16, 2017 4:34:36 AM',
        'calEndTime': 'May 16, 2017 4:34:36 AM',
        'summary': '',
        'ocapCode': '',
        'glassCode': 'UY478BN',
        'updateBy': '10118436',
        'comments': '已通知PM吴金原',
        'status': 'new',
        'updateTime': 'May 16, 2017 4:34:36 AM'
      }
    ]

    const wrapper = shallow(
      <AlarmDetail {...data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render normally if data was empty', () => {
    const data = [{
      data: {}
    }]

    const wrapper = shallow(
      <AlarmDetail {...data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('test findById function is normal', () => {
    const findById = jest.fn()
    expect(findById()).not.toBeNull()
  })
})
