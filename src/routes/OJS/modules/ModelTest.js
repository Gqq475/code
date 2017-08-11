import {
  GET_MODEL_TEST_RESULT_TYPE,
  UPDATE_MODEL_TEST_RESULT_TYPE,
  UPDATE_ALL_MODEL_TEST_RESULT_TYPE,
  GET_MODEL_TEST_ALL
} from './OJS'

import { isNumber } from 'lodash'

export function getTestResultType (id) {
  return (dispatch, getState) => {
    fetch(`${__QCA__}/aiModel/defectCode?id=${id}`, {
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
          type: GET_MODEL_TEST_RESULT_TYPE,
          data: data.result
          // data: [{
          //   defectName: 'defect01',
          //   confidence: 0
          // },
          // {
          //   defectName: 'defect02',
          //   confidence: 0
          // }]
        })
      } else {
        dispatch({
          type: GET_MODEL_TEST_RESULT_TYPE,
          data: data.result
        })
      }
    })
    .catch(err => console.log(err))
  }
}

export function getModelTestCount ({ keyIndex, id, defectName, confidence }) {
  return (dispatch, getState) => {
    console.log('modelResultCount')
    fetch(`${__QCA__}/aiModel/testResultCount?id=${id}` +
    `&defectName=${defectName}&confidence=${confidence / 100}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getState().auth.token
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.code === 200000) {
        if (isNumber(keyIndex)) {
          dispatch({
            type: UPDATE_MODEL_TEST_RESULT_TYPE,
            data: {
              keyIndex,
              confidence: confidence,
              count: data.result
            }
          })
        } else {
          dispatch({
            type: UPDATE_ALL_MODEL_TEST_RESULT_TYPE,
            data: {
              count: data.result,
              confidence: confidence
            }
          })
        }
      }
    })
    .catch(err => console.log(err))
  }
}

export const getModelTestAll = (id) => (dispatch, getState) => {
  fetch(`${__QCA__}/aiModel/testProgress?id=${id}`, {
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
        type: GET_MODEL_TEST_ALL,
        data: data.result
      })
    }
  })
  .catch(err => console.log(err))
}
