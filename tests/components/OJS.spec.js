import React from 'react'
import OJS from 'components/OJS/OJS'

describe('(Component) OJS', () => {
  it('render normally if path is autodefectjudge', () => {
    const getAutoDefectJudgeList = jest.fn()
    const getAutoDefectJudgeById = jest.fn()
    const autoSubmitJudge = jest.fn()
    const getAutoDefectDetailById = jest.fn()
    const getModel = jest.fn()
    const getServiceDetail = jest.fn()
    const getCreateService = jest.fn()
    const getDefectCode = jest.fn()
    const getLabelingToolImageList = jest.fn()
    const delLabelingToolImageList = jest.fn()
    const getLabelingToolImageDefect = jest.fn()
    const getDefectTypeList = jest.fn()
    const addDefectType = jest.fn()
    const getId = jest.fn()
    const data = {
      ojs: {
        a: {
          a: '23'
        },
        b: {
          b: '23'
        }
      },
      params: {
        'path': 'autodefectjudge'
      }
    }
    const wrapper = shallow(
      <OJS {...data}
        getAutoDefectJudgeList={getAutoDefectJudgeList}
        getAutoDefectJudgeById={getAutoDefectJudgeById}
        autoSubmitJudge={autoSubmitJudge}
        getAutoDefectDetailById={getAutoDefectDetailById}
        getModel={getModel}
        getServiceDetail={getServiceDetail}
        getCreateService={getCreateService}
        getDefectCode={getDefectCode}
        getLabelingToolImageList={getLabelingToolImageList}
        delLabelingToolImageList={delLabelingToolImageList}
        getLabelingToolImageDefect={getLabelingToolImageDefect}
        getDefectTypeList={getDefectTypeList}
        addDefectType={addDefectType}
        getId={getId}
        />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render normally if path is servicemanagement', () => {
    const getAutoDefectJudgeList = jest.fn()
    const getAutoDefectJudgeById = jest.fn()
    const autoSubmitJudge = jest.fn()
    const getAutoDefectDetailById = jest.fn()
    const getModel = jest.fn()
    const getServiceDetail = jest.fn()
    const getCreateService = jest.fn()
    const getDefectCode = jest.fn()
    const getLabelingToolImageList = jest.fn()
    const delLabelingToolImageList = jest.fn()
    const getLabelingToolImageDefect = jest.fn()
    const getDefectTypeList = jest.fn()
    const addDefectType = jest.fn()
    const getId = jest.fn()
    const data = {
      ojs: {
        a: {
          a: '23'
        },
        b: {
          b: '23'
        }
      },
      params: {
        'path': 'servicemanagement'
      }
    }
    const wrapper = shallow(
      <OJS {...data}
        getAutoDefectJudgeList={getAutoDefectJudgeList}
        getAutoDefectJudgeById={getAutoDefectJudgeById}
        autoSubmitJudge={autoSubmitJudge}
        getAutoDefectDetailById={getAutoDefectDetailById}
        getModel={getModel}
        getServiceDetail={getServiceDetail}
        getCreateService={getCreateService}
        getDefectCode={getDefectCode}
        getLabelingToolImageList={getLabelingToolImageList}
        delLabelingToolImageList={delLabelingToolImageList}
        getLabelingToolImageDefect={getLabelingToolImageDefect}
        getDefectTypeList={getDefectTypeList}
        addDefectType={addDefectType}
        getId={getId}
        />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render normally if path is modelversion', () => {
    const getAutoDefectJudgeList = jest.fn()
    const getAutoDefectJudgeById = jest.fn()
    const autoSubmitJudge = jest.fn()
    const getAutoDefectDetailById = jest.fn()
    const getModel = jest.fn()
    const getServiceDetail = jest.fn()
    const getCreateService = jest.fn()
    const getDefectCode = jest.fn()
    const getLabelingToolImageList = jest.fn()
    const delLabelingToolImageList = jest.fn()
    const getLabelingToolImageDefect = jest.fn()
    const getDefectTypeList = jest.fn()
    const addDefectType = jest.fn()
    const getId = jest.fn()
    const data = {
      ojs: {
        a: {
          a: '23'
        },
        b: {
          b: '23'
        }
      },
      params: {
        'path': 'modelversion'
      }
    }
    const wrapper = shallow(
      <OJS {...data}
        getAutoDefectJudgeList={getAutoDefectJudgeList}
        getAutoDefectJudgeById={getAutoDefectJudgeById}
        autoSubmitJudge={autoSubmitJudge}
        getAutoDefectDetailById={getAutoDefectDetailById}
        getModel={getModel}
        getServiceDetail={getServiceDetail}
        getCreateService={getCreateService}
        getDefectCode={getDefectCode}
        getLabelingToolImageList={getLabelingToolImageList}
        delLabelingToolImageList={delLabelingToolImageList}
        getLabelingToolImageDefect={getLabelingToolImageDefect}
        getDefectTypeList={getDefectTypeList}
        addDefectType={addDefectType}
        getId={getId}
        />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render path is labelingtool normally', () => {
    const getAutoDefectJudgeList = jest.fn()
    const getAutoDefectJudgeById = jest.fn()
    const autoSubmitJudge = jest.fn()
    const getAutoDefectDetailById = jest.fn()
    const getModel = jest.fn()
    const getServiceDetail = jest.fn()
    const getCreateService = jest.fn()
    const getDefectCode = jest.fn()
    const getLabelingToolImageList = jest.fn()
    const delLabelingToolImageList = jest.fn()
    const getLabelingToolImageDefect = jest.fn()
    const getDefectTypeList = jest.fn()
    const addDefectType = jest.fn()
    const getId = jest.fn()
    const data = {
      ojs: {
        a: {
          a: '23'
        },
        b: {
          b: '23'
        }
      },
      params: {
        'path': 'labelingtool'
      }
    }
    const wrapper = shallow(
      <OJS {...data}
        getAutoDefectJudgeList={getAutoDefectJudgeList}
        getAutoDefectJudgeById={getAutoDefectJudgeById}
        autoSubmitJudge={autoSubmitJudge}
        getAutoDefectDetailById={getAutoDefectDetailById}
        getModel={getModel}
        getServiceDetail={getServiceDetail}
        getCreateService={getCreateService}
        getDefectCode={getDefectCode}
        getLabelingToolImageList={getLabelingToolImageList}
        delLabelingToolImageList={delLabelingToolImageList}
        getLabelingToolImageDefect={getLabelingToolImageDefect}
        getDefectTypeList={getDefectTypeList}
        addDefectType={addDefectType}
        getId={getId}
        />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
