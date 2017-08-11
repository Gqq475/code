import React from 'react'
import { LabelingTool } from 'components/LabelingTool/LabelingTool'

describe('(Component) LabelingTool', () => {
  it('render normally', () => {
    const data = {
      labelingToolImageList: [{
        createTime: 'Apr 27, 2017 11:19:11 AM',
        depth: 10,
        height: 10,
        id: 1,
        name: 'Image 01',
        path: 'ttp://10.120.136.214/doc/qms/sample_defect_image/TPDPD.jpg',
        type: 'Type 1',
        width: 10
      }]
    }
    const wrapper = shallow(
      <LabelingTool data={data} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
