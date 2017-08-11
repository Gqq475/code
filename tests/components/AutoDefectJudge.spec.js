import React from 'react'
import { AutoDefectJudge } from 'components/AutoDefectJudge/AutoDefectJudge'

describe('(Component) AutoDefectJudge', () => {
  it('render normally if glassList and searchState and adjDefectList were not empty.', () => {
    const data = {
      'glassList': {
        'aligner': 'A88RU',
        'coater': 'W0DF8SH',
        'createTime': 'May 30, 2017 8:03:56 AM',
        'endTime': 'May 30, 2017 8:03:56 AM',
        'glassCode': 'GM727BD',
        'glassType': 'OJS glass',
        'id': 1,
        'lineCode': 'PIPR911',
        'lotId': 1,
        'operationCode': '9527',
        'processCode': 'EQ_L1_BX',
        'productCode': 'Bond007',
        'scrapFlag': false,
        'startTime': 'May 30, 2017 8:03:56 AM',
        'subEqCode': 'PIN911'
      },
      'searchState': {
        'lotId': 1,
        'operationCode': '9527',
        'processCode': 'EQ_L1_BX',
        'productCode': 'Bond007',
        'scrapFlag': false,
        'startTime': 'May 30, 2017 8:03:56 AM',
        'subEqCode': 'PIN911'
      },
      'adjDefectList': {
        'aligner': 'A88RU',
        'coater': 'W0DF8SH',
        'createTime': 'May 30, 2017 8:03:56 AM',
        'endTime': 'May 30, 2017 8:03:56 AM',
        'glassCode': 'GM727BD',
        'glassType': 'OJS glass',
        'id': 1,
        'lineCode': 'PIPR911',
        'lotId': 1,
        'operationCode': '9527',
        'processCode': 'EQ_L1_BX',
        'productCode': 'Bond007',
        'scrapFlag': false,
        'startTime': 'May 30, 2017 8:03:56 AM',
        'subEqCode': 'PIN911'
      }
    }
    const wrapper = shallow(
      <AutoDefectJudge data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render normally if glassList was empty.', () => {
    const data = {
      'glassList': {}
    }
    const wrapper = shallow(
      <AutoDefectJudge data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render normally if adjDefectList was not empty.', () => {
    const data = {
      'adjDefectList': {
        'aligner': 'A88RU',
        'coater': 'W0DF8SH',
        'createTime': 'May 30, 2017 8:03:56 AM',
        'endTime': 'May 30, 2017 8:03:56 AM',
        'glassCode': 'GM727BD',
        'glassType': 'OJS glass',
        'id': 1,
        'lineCode': 'PIPR911',
        'lotId': 1,
        'operationCode': '9527',
        'processCode': 'EQ_L1_BX',
        'productCode': 'Bond007',
        'scrapFlag': false,
        'startTime': 'May 30, 2017 8:03:56 AM',
        'subEqCode': 'PIN911'
      }
    }
    const wrapper = shallow(
      <AutoDefectJudge data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render normally if adjDefectList was not empty.', () => {
    const data = {
      'adjDefectList': {}
    }
    const wrapper = shallow(
      <AutoDefectJudge data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render normally if searchState was not empty.', () => {
    const data = {
      'searchState': {
        'lotId': 1,
        'operationCode': '9527',
        'processCode': 'EQ_L1_BX',
        'productCode': 'Bond007',
        'scrapFlag': false,
        'startTime': 'May 30, 2017 8:03:56 AM',
        'subEqCode': 'PIN911'
      }
    }
    const wrapper = shallow(
      <AutoDefectJudge data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render normally if searchState was not empty.', () => {
    const data = {
      'searchState': {}
    }
    const wrapper = shallow(
      <AutoDefectJudge data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
