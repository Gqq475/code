import React from 'react'
import { LabelingToolDefectType } from 'components/LabelingToolDefectType/LabelingToolDefectType'

describe('(Component) LabelingToolDefectType', () => {
  it('render normally', () => {
    const data = {
      defectTypeList: {
        CF: [{
          departmentCode: 'General',
          factoryCode: 'CF',
          id: 2,
          isDelete: false,
          name: 'TestDefect2'
        }]
      }
    }
    const getDefectTypeList = jest.fn()
    const wrapper = shallow(
      <LabelingToolDefectType
        data={data}
        getDefectTypeList={getDefectTypeList} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
