import { assign, concat, filter, findIndex, map } from 'lodash'
import Utils from '../../../Utils.js'
import OurToaster from 'components/OurToaster'
const qca = __QCA__

export const AUTO_DEFECTJUDGE_GETLIST = 'OJS.AUTO_DEFECTJUDGE_GETLIST'
export const AUTO_DEFECTJUDGE_SAVE_TEMPLATE = 'OJS.AUTO_DEFECTJUDGE_SAVE_TEMPLATE'
export const AUTO_DEFECTJUDGE_GETBYID = 'OJS.AUTO_DEFECTJUDGE_GETBYID'
export const RELOAD_AGGRID = 'OJS.RELOAD_AGGRID'
export const AUTO_GET_DEFECT_DETAIL = 'OJS.AUTO_GET_DEFECT_DETAIL'
export const MODEL = 'OJS.MODEL'
export const CREATESEVICE = 'OJS.CREATESEVICE'
export const SERVICEDETAIL = 'OJS.SERVICEDETAIL'
export const DEFECTCODE = 'OJS.DEFECTCODE'
export const AUTODEFECTJUDGESTATE = 'OJS.AUTODEFECTJUDGESTATE'
export const SEARCHSTATE = 'OJS.SEARCHSTATE'
export const LABELINGTOOLIMAGELIST = 'OJS.LABELINGTOOLIMAGELIST'
export const LABELINGTOOLIMAGEDEFECT = 'OJS.LABELINGTOOLIMAGEDEFECT'
export const GETLABELINGTOOL_SAVE_TEMPLATE = 'OJS.GETLABELINGTOOL_SAVE_TEMPLATE'
export const MODEL_SAVE_TEMPLATE = 'OJS.MODEL_SAVE_TEMPLATE'
export const MODEL_GETLIST = 'OJS.MODEL_GETLIST'
export const SELECT_DEFECTPICTURE_SOURCE = 'OJS.SELECT_DEFECTPICTURE_SOURCE'
export const SELECT_DEFECT_MARK = 'OJS.SELECT_DEFECT_MARK'
export const MARK_DEFECT = 'OJS.MARK_DEFECT'
export const SAVE_DEFECT = 'OJS.SAVE_DEFECT'
export const DRAG_DEFECT_MARK = 'OJS.DRAG_DEFECT_MARK'
export const RESIZE_DEFECT_MARK = 'OJS.RESIZE_DEFECT_MARK'
export const DELETE_DEFECT_MARK = 'OJS.DELETE_DEFECT_MARK'
export const DEFECTTYPELIST = 'OJS.DEFECTTYPELIST'
export const ADDDEFECTTYPE = 'OJS.ADDDEFECTTYPE'
export const DELETE_DEFECT_MARK_FROM_ID = 'OJS.DELETE_DEFECT_MARK_FROM_ID'
export const DELETE_DEFECT_MARK_FROM_INDEX = 'OJS.DELETE_DEFECT_MARK_FROM_INDEX'
export const MODIFY_DEFECT_MARK_NAME = 'OJS.MODIFY_DEFECT_MARK_NAME'
export const INITIALIZE_LABELING_TOOL = 'OJS.INITIALIZE_LABELING_TOOL'
export const SET_CURRENT_DEFECT_TYPE = 'OJS.SET_CURRENT_DEFECT_TYPE'
export const GET_MODEL_TEST_RESULT_LIST = 'GET_MODEL_TEST_RESULT_LIST'
export const GET_MODEL_TEST_RESULT_TYPE = 'GET_MODEL_TEST_RESULT_TYPE'
export const SUCCESSFULLY_CREATE_TRAINING_MODEL = 'SUCCESSFULLY_CREATE_TRAINING_MODEL'
export const FAILED_CREATE_TRAINING_MODEL = 'FAILED_CREATE_TRAINING_MODEL'
export const GET_MODEL_TEST_FEED = 'GET_MODEL_TEST_FEED'
export const GET_MODEL_TEST_COUNT = 'GET_MODEL_TEST_COUNT'
export const GET_MODEL_TRAIN_LIST = 'OJS.GET_MODEL_TRAIN_LIST'
export const GET_MODEL_TRAIN_INFO = 'GET_MODEL_TRAIN_INFO'
export const GET_MODEL_TRAIN_RESULT_CHART = 'GET_MODEL_TRAIN_RESULT_CHART'
export const SUCCESSFULLY_UPDATE_TRAINING_MODEL = 'SUCCESSFULLY_UPDATE_TRAINING_MODEL'
export const GET_MODEL_TRAIN_ALL = 'GET_MODEL_TRAIN_ALL'
export const GET_MODEL_TEST_ALL = 'GET_MODEL_TEST_ALL'
export const UPDATE_ALL_MODEL_TEST_RESULT_TYPE = 'UPDATE_ALL_MODEL_TEST_RESULT_TYPE'
export const UPDATE_MODEL_TEST_RESULT_TYPE = 'UPDATE_MODEL_TEST_RESULT_TYPE'
export function getAutoDefectJudgeListWithSearchState (state) {
  let urlTemplate = `${qca}` +
    '/judge/glasses?' +
    'confidence_lower_limit=' + state.reliabilitys[0] / 100 +
    '&confidence_upper_limit=' + state.reliabilitys[1] / 100 +
    '&page_no={0}' +
    '&page_size={1}' +
    '&sort_by={2}' +
    '&order={3}'

  if (state) {
    state.product && (urlTemplate += `&product=${state.product}`)
    state.operation && (urlTemplate += `&operation=${state.operation}`)
    state.lineID && (urlTemplate += `&line_id=${state.lineID}`)
    state.subEntity && (urlTemplate += `&sub_entity=${state.subEntity}`)
    state.defectCode && (urlTemplate += `&defect_code=${state.defectCode}`)
    state.dateStart && (urlTemplate += `&start_time=${state.dateStart}`)
    state.dateEnd && (urlTemplate += `&end_time=${state.dateEnd}`)
  }

  let url = Utils.format(urlTemplate, [
    state.pageNo,
    state.pageSize,
    state.sortBy,
    state.order
  ])

  return (dispatch, getState) => {
    dispatch({
      type: SEARCHSTATE,
      data: true
    })

    dispatch({
      type: AUTO_DEFECTJUDGE_GETBYID,
      data: undefined
    })

    dispatch({
      type: AUTO_DEFECTJUDGE_SAVE_TEMPLATE,
      data: urlTemplate
    })

    dispatch({
      type: AUTODEFECTJUDGESTATE,
      data: state
    })

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
      .then(response => response.json())
      .then((data) => {
        dispatch({
          type: AUTO_DEFECTJUDGE_GETLIST,
          data
        })

        dispatch({
          type: RELOAD_AGGRID,
          data: true
        })

        dispatch({
          type: RELOAD_AGGRID,
          data: false
        })
      })
  }
}

export function getAutoDefectJudgeList (state, searchState) {
  let urlTemplate = `${qca}` +
    '/judge/glasses?' +
    'confidence_lower_limit=' + state.reliabilitys[0] / 100 +
    '&confidence_upper_limit=' + state.reliabilitys[1] / 100 +
    '&page_no={0}' +
    '&page_size={1}' +
    '&sort_by={2}' +
    '&order={3}'

  if (state) {
    state.product && (urlTemplate += `&product=${state.product}`)
    state.operation && (urlTemplate += `&operation=${state.operation}`)
    state.lineID && (urlTemplate += `&line_id=${state.lineID}`)
    state.subEntity && (urlTemplate += `&sub_entity=${state.subEntity}`)
    state.defectCode && (urlTemplate += `&defect_code=${state.defectCode}`)
    state.start && (urlTemplate += `&start_time=${Utils.formatDate(state.start)}`)
    state.end && (urlTemplate += `&end_time=${Utils.formatDate(state.end)}`)
  }

  let url = Utils.format(urlTemplate, [
    state.pageNo,
    state.pageSize,
    state.sortBy,
    state.order
  ])

  return (dispatch, getState) => {
    dispatch({
      type: SEARCHSTATE,
      data: searchState
    })

    dispatch({
      type: AUTO_DEFECTJUDGE_GETBYID,
      data: undefined
    })

    dispatch({
      type: AUTO_DEFECTJUDGE_SAVE_TEMPLATE,
      data: urlTemplate
    })

    dispatch({
      type: AUTODEFECTJUDGESTATE,
      data: state
    })

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
      .then(response => response.json())
      .then((data) => {
        dispatch({
          type: AUTO_DEFECTJUDGE_GETLIST,
          data
        })

        dispatch({
          type: RELOAD_AGGRID,
          data: true
        })

        dispatch({
          type: RELOAD_AGGRID,
          data: false
        })
      })
  }
}

export function getModelList (state) {
  let urlTemplate = `${qca}/offline/version_control/model_versions?` +
    '&page_no={0}' +
    '&page_size={1}'

  if (state) {
    state.product && (urlTemplate += `&product_code=${state.product}`)
    state.operation && (urlTemplate += `&operation_code=${state.operation}`)
    state.lineID && (urlTemplate += `&line_code=${state.lineID}`)
    state.subEntity && (urlTemplate += `&eq_code=${state.subEntity}`)
  }

  let url = Utils.format(urlTemplate, [
    state.pageNo,
    state.pageSize
  ])
  return (dispatch, getState) => {
    // dispatch({
    //   type: AUTO_DEFECTJUDGE_GETBYID,
    //   data: undefined
    // })

    dispatch({
      type: MODEL_SAVE_TEMPLATE,
      data: urlTemplate
    })

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
      .then(response => response.json())
      .then((data) => {
        if (data.code === 200000) {
          dispatch({
            type: MODEL_GETLIST,
            data
          })
        }
      })
  }
}
export function getAutoDefectJudgeById (id, state, confidenceLowerLimit, confidenceUpperLimit, defectFilter) {
  return (dispatch, getState) => {
    let url = `${qca}/judge/results?id=${id}&page_no=${state.current}&page_size=${state.pageSize}` +
              '&confidence_lower_limit=' + confidenceLowerLimit +
              '&confidence_upper_limit=' + confidenceUpperLimit

    defectFilter && (url += `&defect_code=${defectFilter}`)

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
      .then(response => response.json())
      .then((data) => {
        if (data.code === 200000) {
          return dispatch({
            type: AUTO_DEFECTJUDGE_GETBYID,
            data
          })
        }
      })
  }
}

export function autoSubmitJudge (data, cb) {
  return (dispatch, getState) => {
    fetch(`${qca}/judge`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
      .then(response => response.json())
      .then((data) => {
        if (data.code === 200000) {
          cb(data)
        }
      })
  }
}

export function getAutoDefectDetailById (id) {
  return (dispatch, getState) => {
    fetch(`${qca}/defects/byDefectId?param=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
      .then(response => response.json())
      .then((data) => {
        if (data.code === 200000) {
          return dispatch({
            type: AUTO_GET_DEFECT_DETAIL,
            data: data
          })
        }
      })
  }
}

export function getModel () {
  return (dispatch, getState) => {
    fetch(`${qca}/ojs/models`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
      .then(response => response.json())
    .then((data) => {
      if (data.code === 200000) {
        return dispatch({
          type: MODEL,
          data: data
        })
      }
    })
  }
}

export function getCreateService (data) {
  return (dispatch, getState) => {
    fetch(`${qca}/ojs/service`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
      .then(response => response.json())
    .then(data => {
      if (data.code === 200000) {
        OurToaster.show({message: '添加成功！'})
      } else {
        OurToaster.show({message: '添加失败！'})
      }
      dispatch({
        type: CREATESEVICE,
        data
      })
    })
  }
}

export function getServiceDetail (putData, cb) {
  return (dispatch, getState) => {
    fetch(`${qca}/ojs/service`, {
      method: 'PUT',
      body: JSON.stringify(putData),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
      .then(response => response.json())
    .then(data => {
      cb(data)
      dispatch({
        type: SERVICEDETAIL,
        data: putData
      })
    })
  }
}

export function getDefectCode () {
  return (dispatch, getState) => {
    fetch(`${qca}/ojs/service/condition`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
    .then(response => response.json())
    .then((data) => {
      return dispatch({
        type: DEFECTCODE,
        data: data
      })
    })
  }
}

export function getLabelingToolImageList () {
  return (dispatch, getState) => {
    fetch(`${qca}/offline/labeling/image`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
    .then(response => response.json())
    .then(json => {
      if (json.code === 200000) {
        dispatch({
          type: LABELINGTOOLIMAGELIST,
          data: json.result
        })
      } else {
        dispatch({
          type: LABELINGTOOLIMAGELIST,
          data: []
        })
      }
    })
    .catch(err => console.log(err))
  }
}

export function getLabelingToolImageDefect (state, id) {
  return (dispatch, getState) => {
    var urlTemplate = `${qca}/offline/labeling/image/defect?imageId=${id}&pageNo={0}&pageSize={1}`
    let url = Utils.format(urlTemplate, [
      state.pageNo,
      state.pageSize
    ])
    dispatch({
      type: GETLABELINGTOOL_SAVE_TEMPLATE,
      data: urlTemplate
    })
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
    .then(response => response.json())
    .then(json => {
      if (json.code === 200000) {
        dispatch({
          type: LABELINGTOOLIMAGEDEFECT,
          data: json.result.imageDefects
        })
      } else {
        dispatch({
          type: LABELINGTOOLIMAGEDEFECT,
          data: []
        })
      }
    })
  }
}

export function saveLabelingToolImageDefect (defectData, rowIndex) {
  return (dispatch, getState) => {
    let { width, height, x, y, name, imageId, defectTypeId } = defectData
    let url = `${qca}/offline/labeling/image/defect`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      },
      body: JSON.stringify({
        width,
        height,
        x,
        y,
        imageId,
        name,
        defectTypeId,
        pose: 'POSE',
        truncated: 'TRUNCATED',
        difficult: 'Difficult'
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.code === 200000) {
        // If saving defect successfully, it will return id of the defect
        dispatch({
          type: SAVE_DEFECT,
          data: {
            rowIndex,
            id: data.result
          }
        })
        OurToaster.show({message: '储存成功！'})
      } else {
        OurToaster.show({message: '储存失败！'})
      }
    })
  }
}

export function updateLabelingToolImageDefect (defectData) {
  return (dispatch, getState) => {
    let { id, width, height, x, y, name, imageId, defectTypeId } = defectData
    let url = `${qca}/offline/labeling/image/defect`
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      },
      body: JSON.stringify({
        id: id * 1,
        width,
        height,
        x,
        y,
        imageId,
        name,
        defectTypeId
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.code === 200000) {
        OurToaster.show({message: '更新成功！'})
      } else {
        OurToaster.show({message: '更新失败！'})
      }
    })
  }
}

export function delLabelingToolImageDefect (id) {
  return (dispatch, getState) => {
    let url = `${qca}/offline/labeling/image/defect`
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      },
      body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(data => {
      if (data.code === 200000) {
        dispatch({
          type: DELETE_DEFECT_MARK_FROM_ID,
          data: { delId: id }
        })
        OurToaster.show({message: '删除成功！'})
      } else {
        OurToaster.show({message: '删除失败！'})
      }
    })
  }
}

export function getDefectTypeList () {
  return (dispatch, getState) => {
    fetch(`${qca}/offline/labeling/defect/type`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
    .then(response => response.json())
    .then(json => {
      if (json.code === 200000) {
        dispatch({
          type: DEFECTTYPELIST,
          data: json.result
        })
      } else {
        dispatch({
          type: DEFECTTYPELIST,
          data: {}
        })
      }
    })
    .catch(err => console.log(err))
  }
}

export function addDefectType (data) {
  return (dispatch, getState) => {
    fetch(`${qca}/offline/labeling/defect/type`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.code === 200000) {
        OurToaster.show({message: '添加成功！'})
      } else {
        OurToaster.show({message: '添加失败！'})
      }
      dispatch({
        type: ADDDEFECTTYPE,
        data
      })
    })
  }
}

export function getModelResultList (id) {
  let url = `${qca}/aiModel/testResult?id=${id}`
  return (dispatch, getState) => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
      .then(response => response.json())
      .then((data) => {
        return dispatch({
          type: GET_MODEL_TEST_RESULT_LIST,
          data: data.result
        })
      })
  }
}

export function getTestResultType (id) {
  let url = `${qca}/aiModel/defectCode?id=${id}`
  return (dispatch, getState) => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
      .then(response => response.json())
      .then((data) => {
        return dispatch({
          type: GET_MODEL_TEST_RESULT_TYPE,
          data: data.result
        })
      })
  }
}

export function getModelTestFeed (state) {
  let url = `${qca}/aiModel/feed`
  return (dispatch, getState) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
      .then(response => response.json())
      .then((data) => {
        return dispatch({
          type: GET_MODEL_TEST_FEED,
          data: data.result
        })
      })
  }
}

export function getModelTestCount (state) {
  let confidence = state.confidence / 100
  let url = `${qca}/aiModel/testResultCount?id=${state.id}` +
  `&defectName=${state.defectName}&confidence=${confidence}`
  return (dispatch, getState) => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
      .then(response => response.json())
      .then((data) => {
        return dispatch({
          type: GET_MODEL_TEST_COUNT,
          data: data.result
        })
      })
  }
}

export const actions = {
  getAutoDefectJudgeList,
  getAutoDefectDetailById,
  autoSubmitJudge
}

const ACTION_HANDLERS = {
  [MODEL_GETLIST]: (state, action) => {
    return Object.assign({}, state, {
      modelList: action.data
    })
  },
  [MODEL_SAVE_TEMPLATE]: (state, action) => {
    return Object.assign({}, state, {
      mvTemplate: action.data
    })
  },
  [AUTO_DEFECTJUDGE_GETLIST]: (state, action) => {
    return Object.assign({}, state, {
      glassList: action.data
    })
  },
  [AUTO_DEFECTJUDGE_SAVE_TEMPLATE]: (state, action) => {
    return Object.assign({}, state, {
      djTemplate: action.data
    })
  },
  [AUTODEFECTJUDGESTATE]: (state, action) => {
    return Object.assign({}, state, {
      autoDefectJudgeState: action.data
    })
  },
  [SEARCHSTATE]: (state, action) => {
    return Object.assign({}, state, {
      searchState: action.data
    })
  },
  [AUTO_DEFECTJUDGE_GETBYID]: (state, action) => {
    return Object.assign({}, state, {
      adjDefectList: action.data
    })
  },
  [RELOAD_AGGRID]: (state, action) => {
    return Object.assign({}, state, {
      reloadAGgrid: action.data
    })
  },
  [AUTO_GET_DEFECT_DETAIL]: (state, action) => {
    return Object.assign({}, state, {
      defectDetail: action.data
    })
  },
  [MODEL]: (state, action) => {
    return Object.assign({}, state, {
      model: action.data
    })
  },
  [CREATESEVICE]: (state, action) => {
    return Object.assign({}, state, {
      createSevice: action.data
    })
  },
  [SERVICEDETAIL]: (state, action) => {
    return Object.assign({}, state, {
      serviceDetail: action.data
    })
  },
  [DEFECTCODE]: (state, action) => {
    return Object.assign({}, state, {
      defectCode: action.data
    })
  },
  [LABELINGTOOLIMAGELIST]: (state, action) => {
    return Object.assign({}, state, {
      labelingToolImageList: action.data
    })
  },
  [LABELINGTOOLIMAGEDEFECT]: (state, action) => {
    return Object.assign({}, state, {
      defectList: action.data
    })
  },
  [GETLABELINGTOOL_SAVE_TEMPLATE]: (state, action) => {
    return Object.assign({}, state, {
      labelingTem: action.data
    })
  },
  [SELECT_DEFECTPICTURE_SOURCE]: (state, action) => {
    return Object.assign({}, state, {
      defectPictureSource: action.data,
      defectList: []
    })
  },
  [MARK_DEFECT]: (state, action) => {
    return assign({}, state, {
      defectList: concat([], state.defectList, action.data),
      currentDefectIndex: state.defectList.length
    })
  },
  [SAVE_DEFECT]: (state, action) => {
    let { rowIndex, id } = action.data
    return assign({}, state, {
      defectList: concat([], state.defectList.slice(0, rowIndex), {
        ...state.defectList[rowIndex], id
      }, state.defectList.slice(rowIndex + 1, state.defectList.length))
    })
  },
  [SELECT_DEFECT_MARK]: (state, action) => {
    return assign({}, state, {
      currentDefectIndex: action.data
    })
  },
  [DRAG_DEFECT_MARK]: (state, action) => {
    let {index, x, y} = action.data
    return assign({}, state, {
      defectList: concat([], state.defectList.slice(0, index), {
        ...state.defectList[index], x, y
      }, state.defectList.slice(index + 1, state.defectList.length))
    })
  },
  [RESIZE_DEFECT_MARK]: (state, action) => {
    let {index, width, height} = action.data
    return assign({}, state, {
      defectList: concat([], state.defectList.slice(0, index), {
        ...state.defectList[index], width, height
      }, state.defectList.slice(index + 1, state.defectList.length))
    })
  },
  [DELETE_DEFECT_MARK_FROM_ID]: (state, action) => {
    let {delId} = action.data
    return assign({}, state, {
      defectList: filter(state.defectList, (el) => el.id * 1 !== delId * 1)
    })
  },
  [DELETE_DEFECT_MARK_FROM_INDEX]: (state, action) => {
    let {rowIndex} = action.data
    return assign({}, state, {
      defectList: filter(state.defectList, (el, index) => index !== rowIndex)
    })
  },
  [DEFECTTYPELIST]: (state, action) => {
    return assign({}, state, {
      defectTypeList: action.data
    })
  },
  [ADDDEFECTTYPE]: (state, action) => {
    return assign({}, state, {
      addDefectType: action.data
    })
  },
  [MODIFY_DEFECT_MARK_NAME]: (state, action) => {
    let { currentDefectIndex } = state
    let { defectTypeId, defectTypeName } = action.data
    if (typeof currentDefectIndex === 'number') {
      return assign({}, state, {
        defectList: concat([], state.defectList.slice(0, currentDefectIndex), {
          ...state.defectList[currentDefectIndex],
          name: defectTypeName,
          defectTypeId
        }, state.defectList.slice(currentDefectIndex + 1, state.defectList.length))
      })
    } else {
      return state
    }
  },
  [INITIALIZE_LABELING_TOOL]: (state, action) => {
    return assign({}, state, {
      defectPictureSource: {},
      defectList: [],
      labelingToolImageList: []
    })
  },
  [SET_CURRENT_DEFECT_TYPE]: (state, action) => {
    return assign({}, state, {
      currentDefectType: action.data
    })
  },
  [GET_MODEL_TEST_RESULT_LIST]: (state, action) => {
    return assign({}, state, {
      modelResultList: action.data
    })
  },
  [GET_MODEL_TEST_RESULT_TYPE]: (state, action) => {
    console.log('resutlType', action.data)
    return assign({}, state, {
      modelResultType: action.data
    })
  },
  [SUCCESSFULLY_CREATE_TRAINING_MODEL]: (state, action) => {
    console.log(state)
    return assign({}, state, {
      modelTrainList: concat([], action.data, state.modelTrainList)
    })
  },
  [FAILED_CREATE_TRAINING_MODEL]: (state, action) => {
    return assign({}, state, {
      createFailedMessage: action.data
    })
  },
  [SUCCESSFULLY_UPDATE_TRAINING_MODEL]: (state, action) => {
    console.log('state', state, action)
    let { modelTrainList } = state
    let { id, ...others } = action.payload
    console.log('others', ...others)
    let index = findIndex(state.modelTrainList, ['id', id])
    return assign({}, state, {
      modelTrainList: concat([], modelTrainList.slice(0, index), {
        ...modelTrainList[index],
        ...others
      }, modelTrainList.slice(index + 1, modelTrainList.length))
    })
  },
  [GET_MODEL_TEST_FEED]: (state, action) => {
    return assign({}, state, {
      modelFeed: action.data
    })
  },
  [GET_MODEL_TEST_COUNT]: (state, action) => {
    return assign({}, state, {
      modelCount: action.data
    })
  },
  [GET_MODEL_TRAIN_LIST]: (state, action) => {
    return assign({}, state, {
      modelTrainList: action.data
    })
  },
  [GET_MODEL_TRAIN_INFO]: (state, action) => {
    return assign({}, state, {
      modelTrainInfo: action.data
    })
  },
  [GET_MODEL_TRAIN_RESULT_CHART]: (state, action) => {
    return assign({}, state, {
      modelTrainResultChart: action.data
    })
  },
  [GET_MODEL_TRAIN_ALL]: (state, action) => {
    return assign({}, state, {
      modelTrainAll: action.data
    })
  },
  [GET_MODEL_TEST_ALL]: (state, action) => {
    return assign({}, state, {
      modelTestAll: action.data
    })
  },
  [UPDATE_ALL_MODEL_TEST_RESULT_TYPE]: (state, action) => {
    let { modelResultType } = state
    let { confidence, count } = action.data
    modelResultType = map(modelResultType, (element, index) => {
      return assign({}, element, { confidence: confidence, count: count })
    })
    return assign({}, state, { modelResultType })
  },
  [UPDATE_MODEL_TEST_RESULT_TYPE]: (state, action) => {
    let { modelResultType } = state
    let { confidence, count, keyIndex } = action.data
    modelResultType = map(modelResultType, (element, index) => {
      return (keyIndex === index) ? assign({}, element, { confidence: confidence, count: count }) : element
    })
    return assign({}, state, { modelResultType })
  }
}

const initialState = {
  defectPictureSource: {},
  defectList: [],
  labelingToolImageList: [],
  currentDefectType: '',
  modelTrainList: [],
  modelResultType: []
}

export default function OJSReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
