import {
  GET_MODEL_TRAIN_LIST,
  SUCCESSFULLY_CREATE_TRAINING_MODEL,
  GET_MODEL_TRAIN_INFO,
  GET_MODEL_TRAIN_RESULT_CHART,
  SUCCESSFULLY_UPDATE_TRAINING_MODEL,
  GET_MODEL_TRAIN_ALL,
  FAILED_CREATE_TRAINING_MODEL
} from './OJS'
import OurToaster from 'components/OurToaster'

export const getModelTrainList = (date) => (dispatch, getState) => {
  fetch(`${__QCA__}/offline/version_control/model_versions`, {
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
        type: GET_MODEL_TRAIN_LIST,
        data: json.result.models
      })
    }
  })
  .catch(err => console.log(err))
}

export const createTrainModel = (state) => (dispatch, getState) => {
  fetch(`${__QCA__}/aiModel/model`, {
    method: 'POST',
    body: JSON.stringify({
      'path': 'E:/Model/Save/model',
      'name': state.name,
      'imageResource': state.imageResource,
      'lossRate': state.lossRate,
      'iteration': state.iteration,
      'gpuId': state.gpuId
    }),
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
        type: SUCCESSFULLY_CREATE_TRAINING_MODEL,
        // work around
        data: data.result
      })
      OurToaster.show({message: '添加成功！'})
    } else {
      dispatch({
        type: FAILED_CREATE_TRAINING_MODEL,
        // work around
        data: 'failed'
      })
      OurToaster.show({message: '添加失败！'})
    }
  })
  .catch(err => {
    console.log(err)
    OurToaster.show({message: '添加失败！'})
  })
}

export const getModelInfo = (id) => (dispatch, getState) => {
  fetch(`${__QCA__}/aiModel/modelInfo?id=${id}`, {
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
        type: GET_MODEL_TRAIN_INFO,
        data: json.result
      })
    }
  })
  .catch(err => console.log(err))
}

export const getModelTrainResult = (id) => (dispatch, getState) => {
  fetch(`${__QCA__}/aiModel/imageTypeCount?id=${id}`, {
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
        type: GET_MODEL_TRAIN_RESULT_CHART,
        data: data.result
      })
    }
  })
  .catch(err => console.log(err))
}

export const updateModelTrainList = (id, state) => (dispatch, getState) => {
  fetch(`${__QCA__}/aiModel/model`, {
    method: 'PUT',
    body: JSON.stringify({
      'id': id,
      'productCode': state.product,
      'operationCode': state.operation,
      'eqCode': state.subEntity,
      'lineCode': state.lineID
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': getState().auth.token
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.code === 200000) {
      OurToaster.show({message: '修改成功！'})
      dispatch({
        type: SUCCESSFULLY_UPDATE_TRAINING_MODEL,
        payload: {
          'id': id,
          'productCode': state.product,
          'operationCode': state.operation,
          'eqCode': state.subEntity,
          'lineCode': state.lineID
        }
      })
    } else {
      OurToaster.show({message: '修改失败'})
    }
  })
  .catch(err => {
    console.log(err)
    OurToaster.show({message: '修改失败'})
  })
}

export const getModelTrainAll = (id) => (dispatch, getState) => {
  fetch(`${__QCA__}/aiModel/trainProgress?id=${id}`, {
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
        type: GET_MODEL_TRAIN_ALL,
        data: data.result
      })
    }
  })
  .catch(err => console.log(err))
}
