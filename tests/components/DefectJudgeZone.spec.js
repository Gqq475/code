import React from 'react'
import {DefectJudgeZone} from 'components/DefectJudgeZone/DefectJudgeZone'

describe('(Component) DefectJudgeZone', () => {
  it('render normally', () => {
    const data = {
      result: {
        lots: [
          {
            'id': 1,
            'lotId': 1,
            'glassId': 1,
            'defectCode': 'TPDPD',
            'coordinateX1': 382,
            'coordinateY1': 50,
            'createTime': 'Jun 5, 2017 4:36:25 AM',
            'updateTime': 'Jun 5, 2017 4:36:25 AM',
            'imagePathList': [
              'http://172.22.35.188/doc/qms/sample_defect_image/TPDPD.jpg',
              'http://172.22.35.188/doc/qms/sample_defect_image/TPDPD_G.jpg'
            ]
          }
        ]
      }
    }

    const wrapper = shallow(<DefectJudgeZone data={data} />)
    expect(wrapper).toMatchSnapshot()
  })
})
