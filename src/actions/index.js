// import crypto from 'crypto'
import { push, replace } from 'react-router-redux'
import { throttle } from 'lodash'
// import Utils from '../Utils.js'
export const LOGIN_SUCCESSFULLY = 'LOGIN_SUCCESSFULLY'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESSFULLY = 'LOGOUT_SUCCESSFULLY'
export const INVALID_LOGIN_REQUEST = 'INVALID_LOGIN_REQUEST'
export const VALIDATE_TOKEN_SUCCESSFULLY = 'VALIDATE_TOKEN_SUCCESSFULLY'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const SHOW_LOCK_SCREEN = 'SHOW_LOCK_SCREEN'

const inactivityTime = 1500000
const refreshTokenTime = 1200000
let refreshTokenTimer = null
let InactivityTimer = null

export const setInactivityTimer = () => (dispatch, getState) => {
  let setTimer = () => {
    InactivityTimer = setTimeout(() => {
      document.onmousemove = () => {}
      removeRefreshTokenTimer()
      dispatch({
        type: SHOW_LOCK_SCREEN,
        payload: {
          token: '',
          lockScreen: true
        }
      })
    }, inactivityTime)
  }
  let resetTimer = throttle(() => {
    if (InactivityTimer) {
      clearTimeout(InactivityTimer)
    }
    setTimer()
  }, 5000)
  document.onmousemove = resetTimer
}

export const setRefreshTokenTimer = () => (dispatch, getState) => {
  refreshTokenTimer = setInterval(() => {
    fetch(`${__QCA__}/security/token`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8;',
        'Accept': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({
        token: localStorage.getItem('token')
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.code === 200000) {
        dispatch({
          type: REFRESH_TOKEN,
          payload: {
            token: json.result.token
          }
        })
        localStorage.setItem('token', json.result.token)
      } else {
        removeRefreshTokenTimer()
      }
    })
    .catch(err => {
      console.log(err)
      removeRefreshTokenTimer()
    })
  }, refreshTokenTime)
}

export const removeRefreshTokenTimer = () => {
  if (refreshTokenTimer) {
    clearInterval(refreshTokenTimer)
  }
}

export const authenticate = (username, password, loginMethod) => (dispatch) => {
  if (username && password) {
   // const hashPassword = crypto.createHash('sha512')
    fetch(`${__QCA__}/login`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8;',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name: username,
        password: password
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.code === 200000) {
        dispatch({
          type: LOGIN_SUCCESSFULLY,
          payload: {
            token: json.result.token,
            reporter: username,
            failureMessage: '',
            lockScreen: false,
            userRole: json.result.user_role
          }
        })
        if (loginMethod !== 'ReLogin') {
          dispatch(push('/drtm/currentalarm'))
        } else {
          // window.location.reload(true)
        }
        localStorage.setItem('token', json.result.token)
        dispatch(setInactivityTimer())
        dispatch(setRefreshTokenTimer())
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: {
            failureMessage: '登入失败，请重新尝试'
          }
        })
      }
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: LOGIN_FAILURE,
        payload: {
          failureMessage: '登入失败，请重新尝试'
        }
      })
    })
  } else {
    dispatch({
      type: INVALID_LOGIN_REQUEST,
      payload: {
        failureMessage: '帐号或密码不可为空白'
      }
    })
  }
}

export const deauthenticate = () => (dispatch, getState) => {
  let {auth: { token }} = getState()
  fetch(`${__QCA__}/logout`, {
    headers: {
      authorization: token
    },
    method: 'POST'
  })
  .then(res => res.json())
  .then(json => {
    if (json.code === 200000 || json.code === 400003) {
      dispatch({
        type: LOGOUT_SUCCESSFULLY,
        payload: {
          token: ''
        }
      })
      dispatch(replace('/'))
    }
  })
  .catch(err => console.log(err))
}

export const TokenIsValid = () => (dispatch, getState) => {
  let token = getState().auth.token || localStorage.getItem('token')
  return fetch(`${__QCA__}/security`, {
    method: 'POST',
    body: JSON.stringify({
      token
    })
  })
  .then(res => res.json())
  .then(json => {
    if (json.code === 200000 & json.result.isValid === true) {
      dispatch({
        type: VALIDATE_TOKEN_SUCCESSFULLY,
        payload: {
          token: token,
          userRole: json.result.user_role
        }
      })
      return {
        tokenIsValid: true,
        userRole: json.result.user_role
      }
    } else if (json.code === 200003 & json.result.isValid === false) {
      dispatch({
        type: LOGOUT_SUCCESSFULLY,
        payload: {
          token: ''
        }
      })
      dispatch(replace('/'))
      return {
        tokenIsValid: false
      }
    } else {
      dispatch({
        type: LOGOUT_SUCCESSFULLY,
        payload: {
          token: ''
        }
      })
      dispatch(replace('/'))
      return {
        tokenIsValid: false
      }
    }
  })
  .catch(() => {
    dispatch({
      type: LOGOUT_SUCCESSFULLY,
      payload: {
        token: ''
      }
    })
    dispatch(replace('/'))
  })
}
