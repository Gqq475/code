import OurToaster from 'components/OurToaster'
import Utils from '../../../Utils.js'
const qca = __QCA__

export const GET_ALARM_HISTORY_BY_CONDITION = 'DRTM.GET_ALARM_HISTORY_BY_CONDITION'
export const GET_ALARM_DETAIL_BY_ID = 'DRTM.GET_ALARM_DETAIL_BY_ID'
export const DEFECTJUDGE_GETLIST = 'DRTM.DEFECTJUDGE_GETLIST'
export const DEFECTJUDGE_SAVE_TEMPLATE = 'DRTM.DEFECTJUDGE_SAVE_TEMPLATE'
export const CRITERIAMANAGER_GETLIST = 'DRTM.CRITERIAMANAGER_GETLIST'
export const CRITERIAMANAGER_SAVE_TEMPLATE = 'DRTM.CRITERIAMANAGER_SAVE_TEMPLATE'
export const CRITERIAMANAGER_GETDETAIL = 'DRTM.CRITERIAMANAGER_GETDETAIL'
export const CRITERIAMANAGER_GETDETAIL_LOADING = 'DRTM.CRITERIAMANAGER_GETDETAIL_LOADING'
export const CRITERIAMANAGER_UPDATE = 'DRTM.CRITERIAMANAGER_UPDATE'
export const DEFECTJUDGE_GETBYID = 'DRTM.DEFECTJUDGE_GETBYID'
export const CURRENTALARM_GET = 'DRTM.CURRENTALARM_GET'
export const RELOAD_AGGRID = 'DRTM.RELOAD_AGGRID'
export const COLLAPSE_LEFTLAYOUT = 'COLLAPSE_LEFTLAYOUT'
export const GET_DEFECT_DETAIL = 'DRTM.GET_DEFECT_DETAIL'

export function collapseLeftLayout () {
  return (dispatch) => {
    dispatch({
      type: COLLAPSE_LEFTLAYOUT
    })
  }
}

export function getAlarmHistoryByCondition ({ dateStart, dateEnd }) {
  return (dispatch, getState) => {
    let historyApi = `${qca}/alarm/getAlarmList?start_time=${dateStart}&end_time=${dateEnd}`

    fetch(historyApi, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    }
    ).then(response => response.json())
    .then((json) => {
      if (json.code === 200000) {
        dispatch({
          type: GET_ALARM_HISTORY_BY_CONDITION,
          data: json.result
        })
      }
    }).catch((error) => {
      console.error(error)
    })
  }
}

export function getDefectJudgeList (state) {
  let urlTemplate = `${qca}` +
    '/glasses?' +
    `start_time=${state.start_time}` +
    `&end_time=${state.end_time}` +
    '&page_no={0}' +
    '&page_size={1}' +
    '&sort_by={2}' +
    '&order={3}'

  state.product && (urlTemplate += `&product=${state.product}`)
  state.operation && (urlTemplate += `&operation=${state.operation}`)
  state.lineID && (urlTemplate += `&line_id=${state.lineID}`)
  state.subEntity && (urlTemplate += `&sub_entity=${state.subEntity}`)

  let url = Utils.format(urlTemplate, [
    state.pageNo,
    state.pageSize,
    state.sortBy,
    state.order
  ])

  return (dispatch, getState) => {
    dispatch({
      type: DEFECTJUDGE_GETBYID,
      data: undefined
    })

    dispatch({
      type: DEFECTJUDGE_SAVE_TEMPLATE,
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
            type: DEFECTJUDGE_GETLIST,
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
        }
      })
  }
}

export function getDefectJudgeById (id) {
  return (dispatch, getState) => {
    // fetch(`${qca}/k2app-qms/glasses/${id}`)
    fetch(`${qca}/glass?glassId=${id}`, {
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
            type: DEFECTJUDGE_GETBYID,
            data
          })
        }
      })
  }
}

function getCriteriaManagerListFetch (dispatch, state, getState) {
  let urlTemplate = `${qca}` +
    '/criteria/condition?page_no={0}' +
    '&page_size={1}' +
    '&sort_by={2}' +
    '&order={3}'
  if (state) {
    state.product && (urlTemplate += `&product=${state.product}`)
    state.operation && (urlTemplate += `&operation=${state.operation}`)
    state.lineID && (urlTemplate += `&line_id=${state.lineID}`)
    state.subEntity && (urlTemplate += `&sub_entity=${state.subEntity}`)
    state.dateStart && (urlTemplate += `&start_time=${state.dateStart}`)
    state.dateEnd && (urlTemplate += `&end_time=${state.dateEnd}`)
  }

  dispatch({
    type: CRITERIAMANAGER_SAVE_TEMPLATE,
    data: urlTemplate
  })

  // Must set pageSize as default 1 to get total count
  let url = Utils.format(urlTemplate, [
    state ? state.pageNo : 1,
    state ? state.pageSize : 1,
    state ? state.sortBy : 'id',
    state ? state.order : 'asc'
  ])

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': getState().auth.token
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.code === 200000) {
        // Utils.updateToken(dispatch, data.result.token)
        dispatch({
          type: CRITERIAMANAGER_GETLIST,
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
      } else {
        OurToaster.show({message: '获取列表失败！'})
      }
    })
}

export function getCriteriaManagerList (state = null) {
  return (dispatch, getState) => {
    getCriteriaManagerListFetch(dispatch, state, getState)
  }
}

export function getCriteriaManagerDetail (id) {
  if (id === null) {
    return {
      type: CRITERIAMANAGER_GETDETAIL,
      data: null
    }
  }
  let url = `${qca}/criteria/id?id=${id}`
  return (dispatch, getState) => {
    dispatch({
      type: CRITERIAMANAGER_GETDETAIL_LOADING,
      data: true
    })
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.code === 200000) {
          dispatch({
            type: CRITERIAMANAGER_GETDETAIL_LOADING,
            data: false
          })
          dispatch({
            type: CRITERIAMANAGER_GETDETAIL,
            data
          })
        }
        if (data.code !== 200000) {
          OurToaster.show({message: '获取详情失败！'})
        }
      })
  }
}

export function criteriaManagerUpdate (postData) {
  let url = `${qca}/criteria`
  return (dispatch, getState) => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      },
      method: 'PUT',
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Success' && data.result === 1) {
          dispatch({
            type: CRITERIAMANAGER_GETDETAIL,
            data: {result: postData}
          })
          OurToaster.show({message: '更新成功！'})
          dispatch({
            type: RELOAD_AGGRID,
            data: true
          })
          dispatch({
            type: RELOAD_AGGRID,
            data: false
          })
        } else {
          OurToaster.show({message: '更新失败！'})
        }
      })
  }
}

export function criteriaManagerAdd (data) {
  let url = `${qca}/criteria`
  return (dispatch, getState) => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Success') {
        OurToaster.show({message: '添加成功！'})
        dispatch({
          type: RELOAD_AGGRID,
          data: true
        })
        dispatch({
          type: RELOAD_AGGRID,
          data: false
        })
      } else {
        OurToaster.show({message: '添加失败!'})
      }
    })
  }
}

export function submitJudge (data, cb) {
  return (dispatch, getState) => {
    fetch(`${qca}/glasses/judge`, {
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
        cb(data)
      })
  }
}

export function getCurrentAlarm () {
  let url = `${qca}/alarm/getAlarmList?start_time=&end_time=`
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
          type: CURRENTALARM_GET,
          data: data.result
        })
      })
  }
}

export function getDefectDetailById (id) {
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
        return dispatch({
          type: GET_DEFECT_DETAIL,
          data: data
        })
      })
  }
}

export const actions = {
  getDefectJudgeList,
  getCriteriaManagerList,
  getAlarmHistoryByCondition
  // getAlarmDetailById
}

const ACTION_HANDLERS = {
  [DEFECTJUDGE_GETLIST]: (state, action) => {
    return Object.assign({}, state, {
      glassList: action.data
    })
  },
  [DEFECTJUDGE_SAVE_TEMPLATE]: (state, action) => {
    return Object.assign({}, state, {
      djTemplate: action.data
    })
  },
  [DEFECTJUDGE_GETBYID]: (state, action) => {
    return Object.assign({}, state, {
      defectList: action.data
    })
  },
  [CURRENTALARM_GET]: (state, action) => {
    return Object.assign({}, state, {
      currentAlarmList: action.data
    })
  },
  [CRITERIAMANAGER_GETLIST]: (state, action) => {
    return Object.assign({}, state, {
      criteriaManager: action.data
    })
  },
  [CRITERIAMANAGER_SAVE_TEMPLATE]: (state, action) => {
    return Object.assign({}, state, {
      cmTemplate: action.data
    })
  },
  [CRITERIAMANAGER_GETDETAIL]: (state, action) => {
    return Object.assign({}, state, {
      criteriaManagerDetail: action.data
    })
  },
  [GET_ALARM_HISTORY_BY_CONDITION]: (state, action) => {
    return Object.assign({}, state, {
      alarmHistory: action.data
    })
  },
  [COLLAPSE_LEFTLAYOUT]: (state, action) => {
    return Object.assign({}, state, {
      leftLayoutCollapse: !state.leftLayoutCollapse
    })
  },
  [RELOAD_AGGRID]: (state, action) => {
    return Object.assign({}, state, {
      reloadAGgrid: action.data
    })
  },
  [GET_DEFECT_DETAIL]: (state, action) => {
    return Object.assign({}, state, {
      defectDetail: action.data
    })
  },
  [CRITERIAMANAGER_GETDETAIL_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      createManageGDetail: action.data
    })
  }
}

const initialState = {}
export default function DRTMReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
