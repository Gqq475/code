import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import DRTMReducer from 'routes/DRTM/modules/DRTM'
import QCAReducer from 'routes/QCA/modules/QCA'
import OJSReducer from 'routes/OJS/modules/OJS'
import authReducer from 'reducers/auth.js'

export const reducers = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    drtm: DRTMReducer,
    qca: QCAReducer,
    ojs: OJSReducer,
    auth: authReducer,
    ...asyncReducers })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(reducers(store.asyncReducers))
}

export default reducers
