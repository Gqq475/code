import React from 'react'
import AlarmHistory from 'components/AlarmHistory/AlarmHistory'

describe('(Component) AlarmHistory', () => {
  it('render normally', () => {
    const data = {
      'alarmHistory': [{
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
        'createTime': 'May 16, 2017 4:34:36 AM',
        'updateTime': 'May 16, 2017 4:34:36 AM'
      }]
    }
    const wrapper = shallow(
      <AlarmHistory data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
