import React from 'react'
import {DefectType} from 'components/LabelingToolDefectType/DefectType'

describe('(Component) DefectType', () => {
  it('render normally if data is not exist and departmentCode is General', () => {
    const getId = jest.fn()
    const modifyDefectName = jest.fn()
    const data = [
      {
        departmentCode: 'General',
        factoryCode: 'CF',
        id: 2,
        isDelete: false,
        name: 'TestDefect2'
      }
    ]
    const wrapper = shallow(<DefectType data={data} getId={getId} modifyDefectName={modifyDefectName} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally if data is not exist and departmentCode is Etch', () => {
    const getId = jest.fn()
    const modifyDefectName = jest.fn()
    const data = [
      {
        departmentCode: 'Etch',
        factoryCode: 'CF',
        id: 2,
        isDelete: false,
        name: 'TestDefect2'
      }
    ]
    const wrapper = shallow(<DefectType data={data} getId={getId} modifyDefectName={modifyDefectName} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally if data is not exist and departmentCode is Photo', () => {
    const getId = jest.fn()
    const modifyDefectName = jest.fn()
    const data = [
      {
        departmentCode: 'Photo',
        factoryCode: 'CF',
        id: 2,
        isDelete: false,
        name: 'TestDefect2'
      }
    ]
    const wrapper = shallow(<DefectType data={data} getId={getId} modifyDefectName={modifyDefectName} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally if data is not exist and departmentCode is ThinFilm', () => {
    const getId = jest.fn()
    const modifyDefectName = jest.fn()
    const data = [
      {
        departmentCode: 'ThinFilm',
        factoryCode: 'CF',
        id: 2,
        isDelete: false,
        name: 'TestDefect2'
      }
    ]
    const wrapper = shallow(<DefectType data={data} getId={getId} modifyDefectName={modifyDefectName} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally if data is not exist and departmentCode is CF', () => {
    const getId = jest.fn()
    const modifyDefectName = jest.fn()
    const data = [
      {
        departmentCode: 'CF',
        factoryCode: 'CF',
        id: 2,
        isDelete: false,
        name: 'TestDefect2'
      }
    ]
    const wrapper = shallow(<DefectType data={data} getId={getId} modifyDefectName={modifyDefectName} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally if data is not exist and departmentCode is Testing', () => {
    const getId = jest.fn()
    const modifyDefectName = jest.fn()
    const data = [
      {
        departmentCode: 'Testing',
        factoryCode: 'CF',
        id: 2,
        isDelete: false,
        name: 'TestDefect2'
      }
    ]
    const wrapper = shallow(<DefectType data={data} getId={getId} modifyDefectName={modifyDefectName} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally if data is exist', () => {
    const getId = jest.fn()
    const modifyDefectName = jest.fn()
    const data = []
    const wrapper = shallow(<DefectType data={data} getId={getId} modifyDefectName={modifyDefectName} />)
    expect(wrapper).toMatchSnapshot()
  })
})
