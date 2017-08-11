import React from 'react'
import LabelingToolDefectCodeList from 'components/LabelingToolDefectCodeList/LabelingToolDefectCodeList'
import { ActionCellRender } from 'components/LabelingToolDefectCodeList/ActionCellRender'
import { DeleteDialog } from 'components/LabelingToolDefectCodeList/DeleteDialog'
describe('(Component) LabelingToolDefectCodeList', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <LabelingToolDefectCodeList />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
describe('(Component) ActionCellRender', () => {
  it('render normally', () => {
    const data = {
      'id': '1'
    }
    const wrapper = shallow(
      <ActionCellRender data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
describe('(Component) DeleteDialog', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <DeleteDialog />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
