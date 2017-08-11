import Utils from '../../../Utils.js'
const qca = __QCA__

export const DEFECT_MAP_GET_LOTS = 'QCA.DEFECT_MAP_GET_LOTS'
export const DEFECT_MAP_GET_BYLOTID = 'QCA.DEFECT_MAP_GET_BYLOTID'
export const DEFECT_MAP_GET_GLASSES = 'QCA.DEFECT_MAP_GET_GLASSES'
export const DEFECT_MAP_GET_BYGLASSID = 'QCA.DEFECT_MAP_GET_BYGLASSID'
export const DEFECT_MAP_SAVE_LOT_TEMPLATE = 'QCA.DEFECT_MAP_SAVE_LOT_TEMPLATE'
export const DEFECT_MAP_SAVE_GLASS_TEMPLATE = 'QCA.DEFECT_MAP_SAVE_GLASS_TEMPLATE'
export const DEFECT_MAP_LOADING = 'QCA.DEFECT_MAP_LOADING'
export const RELOAD_AGGRID = 'DRTM.RELOAD_AGGRID'
export const ECHARTS_LEFT_MENU = 'QCA.ECHARTS_LEFT_MENU'
export const HANDLINGPATH = 'QCA.HANDLINGPATH'
export const EQUIPMENT_PORT = 'QCA.EQUIPMENT_PORT'
export const STK = 'QCA.STK'
export const GETFROMTO = 'QCA.GETFROMTO'
export const TOP5DATA = 'QCA.TOP5DATA'
export const DEFECT_DETAIL_SAVE_TEMPLATE = 'QCA.DEFECT_DETAIL_SAVE_TEMPLATE'
export const DEFECT_DETAIL_GETLIST = 'QCA.DEFECT_DETAIL_GETLIST'

export function getGlasses (state) {
  let urlTemplate = qca +
   '/glasses?product=' + state.product +
    '&operation=' + state.operation +
    '&line_id=' + state.lineID +
    '&sub_entity=' + state.subEntity +
    '&start_time=' + state.start_time +
    '&end_time=' + state.end_time +
    '&page_no={0}' +
    '&page_size={1}' +
    '&sort_by={2}' +
    '&order={3}'

  let url = Utils.format(urlTemplate, [
    state.pageNo,
    state.pageSize,
    state.sortBy,
    state.order
  ])

  return (dispatch, getState) => {
    dispatch({
      type: DEFECT_MAP_SAVE_GLASS_TEMPLATE,
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
        dispatch({
          type: DEFECT_MAP_GET_GLASSES,
          data
        })

        if (!getState().qca.reloadAGgrid) {
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

export function getLots (state) {
  let urlTemplate = qca +
    '/lots?product=' + state.product +
    '&operation=' + state.operation +
    '&line_id=' + state.lineID +
    '&sub_entity=' + state.subEntity +
    '&start_time=' + state.start_time +
    '&end_time=' + state.end_time +
    '&page_no={0}' +
    '&page_size={1}' +
    '&sort_by={2}' +
    '&order={3}'

  let url = Utils.format(urlTemplate, [
    state.pageNo,
    state.pageSize,
    state.sortBy,
    state.order
  ])

  return (dispatch, getState) => {
    dispatch({
      type: DEFECT_MAP_SAVE_LOT_TEMPLATE,
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
        dispatch({
          type: DEFECT_MAP_GET_LOTS,
          data
        })

        if (!getState().qca.reloadAGgrid) {
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

export function resetDM () {
  return (dispatch, getState) => {
    dispatch({
      type: DEFECT_MAP_GET_BYGLASSID,
      data: []
    })

    dispatch({
      type: DEFECT_MAP_GET_BYLOTID,
      data: []
    })
  }
}

export function getDefectByGlassId (idArray) {
  return (dispatch, getState) => {
    // FIXME
    idArray.constructor === Array && idArray.length !== 0 && dispatch({
      type: DEFECT_MAP_LOADING,
      data: true
    })

    dispatch({
      type: DEFECT_MAP_GET_BYGLASSID,
      data: []
    })

    let curState = []
    let indexArray = []
    if (getState().qca && getState().qca.glassbyglass) {
      curState = getState().qca.glassbyglass
    }

    for (let i = 0; i < idArray.length; i++) {
      let url = `${qca}/glass?glassId=${idArray[i]}`

      !curState[idArray[i]] && fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': getState().auth.token
        }
      })
         .then(response => response.json())
         .then((data) => {
           curState[idArray[i]] = data
           indexArray.push(idArray[i])
           if (indexArray.length === idArray.length) {
             dispatch({
               type: DEFECT_MAP_LOADING,
               data: false
             })
           }

          //  if (i === idArray.length - 1) {
           return dispatch({
             type: DEFECT_MAP_GET_BYGLASSID,
             data: curState
           })
          //  } else {
          //    return
          //  }
         })
    }
  }
}

export function getDefectByLotId (idArray) {
  return (dispatch, getState) => {
    idArray.constructor === Array && idArray.length !== 0 && dispatch({
      type: DEFECT_MAP_LOADING,
      data: true
    })

    dispatch({
      type: DEFECT_MAP_GET_BYLOTID,
      data: []
    })

    let curState = []
    let indexArray = []
    if (getState().qca && getState().qca.glassbylot) {
      curState = getState().qca.glassbylot
    }
    for (let i = 0; i < idArray.length; i++) {
      !curState[idArray[i]] && fetch(`${qca}/lot?lot_id=${idArray[i]}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': getState().auth.token
        }
      })
        .then(response => response.json())
         .then((data) => {
           curState[idArray[i]] = data
           indexArray.push(idArray[i])
           if (indexArray.length === idArray.length) {
             dispatch({
               type: DEFECT_MAP_LOADING,
               data: false
             })
           }

          //  if (i === idArray.length - 1) {
           return dispatch({
             type: DEFECT_MAP_GET_BYLOTID,
             data: curState
           })
          //  } else {
          //    return
          //  }
         })
    }
  }
}

export function getEchartsLeftMenu () {
  let url = `${qca}` +
    '/webapi/reports/getCondition?param=[]'

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
      dispatch({
        type: ECHARTS_LEFT_MENU,
        data: data
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

export function getTop5Data (state) {
  // let url = `${qca}/webapi/reports/getHandling?param=[${JSON.stringify(state)}]`
  let url = `http://10.120.137.130:9080/defects/top5?fromDate=${state}`
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
      dispatch({
        type: TOP5DATA,
        data: data
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
export function getDefectDetail (state, startDetail) {
  let urlTemplate = 'http://10.120.137.130:9080/defects?' +
  'fromDateTime=' + startDetail +
  '&toDateTime=' + startDetail +
  '&pageNumber={0}' +
  '&pageSize={1}'
  let url = Utils.format(urlTemplate, [
    state.pageNumber,
    state.pageSize,
    state.sortBy,
    state.order
  ])

  return (dispatch, getState) => {
    dispatch({
      type: DEFECT_DETAIL_SAVE_TEMPLATE,
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
        dispatch({
          type: DEFECT_DETAIL_GETLIST,
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

export function getHandlingPath (state) {
  let url = `${qca}/webapi/reports/getHandling?param=[${JSON.stringify(state)}]`
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
      dispatch({
        type: HANDLINGPATH,
        data: data
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

export function getEquipmentPort (state) {
  let url = `${qca}/webapi/reports/getEqPort?param=[${JSON.stringify(state)}]`
  return (dispatch, getState) => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: EQUIPMENT_PORT,
        data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function getSTK (state) {
  let url = `${qca}/webapi/reports/getSTK?param=[${JSON.stringify(state)}]`

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
      dispatch({
        type: STK,
        data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function getFromTo (state) {
  let url = `${qca}/webapi/reports/getFromTo?param=[${JSON.stringify(state)}]`
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
      dispatch({
        type: GETFROMTO,
        data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export const actions = {
  getLots,
  getDefectByLotId,
  getGlasses,
  getDefectByGlassId,
  resetDM,
  getTop5Data
}

const ACTION_HANDLERS = {
  [DEFECT_MAP_GET_LOTS]: (state, action) => {
    return Object.assign({}, state, {
      lots: action.data
    })
  },
  [DEFECT_MAP_GET_GLASSES]: (state, action) => {
    return Object.assign({}, state, {
      glasses: action.data
    })
  },
  [DEFECT_MAP_GET_BYLOTID]: (state, action) => {
    return Object.assign({}, state, {
      glassbylot: action.data
    })
  },
  [DEFECT_MAP_GET_BYGLASSID]: (state, action) => {
    return Object.assign({}, state, {
      glassbyglass: action.data
    })
  },
  [DEFECT_MAP_SAVE_LOT_TEMPLATE]: (state, action) => {
    return Object.assign({}, state, {
      dmLotTemplate: action.data
    })
  },
  [DEFECT_MAP_SAVE_GLASS_TEMPLATE]: (state, action) => {
    return Object.assign({}, state, {
      dmGlassTemplate: action.data
    })
  },
  [DEFECT_MAP_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      dmloading: action.data
    })
  },
  [RELOAD_AGGRID]: (state, action) => {
    return Object.assign({}, state, {
      reloadAGgrid: action.data
    })
  },
  [ECHARTS_LEFT_MENU]: (state, action) => {
    return Object.assign({}, state, {
      echartsLeftMenu: action.data
    })
  },
  [TOP5DATA]: (state, action) => {
    return Object.assign({}, state, {
      top5Data: action.data
    })
  },
  [HANDLINGPATH]: (state, action) => {
    return Object.assign({}, state, {
      handlingPath: action.data
    })
  },
  [EQUIPMENT_PORT]: (state, action) => {
    return Object.assign({}, state, {
      equipmentPort: action.data
    })
  },
  [STK]: (state, action) => {
    return Object.assign({}, state, {
      stk: action.data
    })
  },
  [GETFROMTO]: (state, action) => {
    return Object.assign({}, state, {
      getFromTo: action.data
    })
  },
  [DEFECT_DETAIL_SAVE_TEMPLATE]: (state, action) => {
    return Object.assign({}, state, {
      dDemplate: action.data
    })
  },
  [DEFECT_DETAIL_GETLIST]: (state, action) => {
    return Object.assign({}, state, {
      defectDetail: action.data
    })
  }
}

const initialState = {
  cpks: []
}

export default function QCAReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
