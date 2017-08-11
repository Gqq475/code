import React from 'react'
import LabelingToolImagesZone from 'components/LabelingToolImagesZone/LabelingToolImagesZone'
import { DefectPicture } from 'components/LabelingToolImagesZone/DefectPicture'
describe('(Component) LabelingToolImagesZone', () => {
  it('render normally if defectPictureSource is not exist', () => {
    const data = {
      defectPictureSource: 'http://10.120.136.214/1.png'
    }
    const wrapper = shallow(
      <LabelingToolImagesZone {...data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
describe('(Component) LabelingToolImagesZone', () => {
  it('render normally if defectPictureSource is exsit', () => {
    const wrapper = shallow(
      <LabelingToolImagesZone />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
describe('(Component) DefectPicture', () => {
  it('render normally', () => {
    const data = {
      'currentDefectIndex': undefined,
      'srcOfOriginalImage': 'http://10.120.136.214/doc/qms/sample_defect_image/TPDPD.jpg',
      'widthOfOriginalImage': 500,
      'defectList': [{
        createTime: 'Jun 7, 2017 6:29:14 AM',
        defectTypeId: 1,
        difficult: 'Difficult',
        height: 25.25,
        id: 24,
        imageId: 1,
        name: 'ImageDefect 05',
        pose: 'POSE 01',
        truncated: 'TRUNCATED 01',
        updateTime: 'Jun 7, 2017 6:29:14 AM',
        width: 20.25,
        x: 10.25,
        y: 25
      }]
    }
    const handleMarkDrag = jest.fn()
    const handleMarkResize = jest.fn()
    const wrapper = shallow(
      <DefectPicture {...data}
        handleMarkDrag={handleMarkDrag}
        handleMarkResize={handleMarkResize}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
