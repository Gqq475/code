import { assign } from 'lodash'

const authReducer = (state = {
  token: '',
  failureMessage: '',
  lockScreen: false,
  userRole: []
}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESSFULLY':
    case 'LOGIN_FAILURE':
    case 'LOGOUT_SUCCESSFULLY':
    case 'INVALID_LOGIN_REQUEST':
    case 'VALIDATE_TOKEN_SUCCESSFULLY':
    case 'REFRESH_TOKEN':
    case 'SHOW_LOCK_SCREEN':
      return assign({}, state, { ...action.payload })
    default:
      return state
  }
}

export default authReducer
