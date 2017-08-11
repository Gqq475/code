// import { injectReducer } from '../../store/reducers'
import { TokenIsValid } from 'actions'

export default (store) => ({
  path: 'drtm(/:path)',
  onEnter: function (nextState, replaceState) {
    if (!store.getState().auth.token && !localStorage.getItem('token')) {
      replaceState('/')
    } else {
      store.dispatch(TokenIsValid())
    }
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/DRTMContainer'
      // './modules/DRTM'
    ], (require) => {
      const DRTM = require('./containers/DRTMContainer').default
      // const reducer = require('./modules/DRTM').default

      // injectReducer(store, { key: 'drtm', reducer })
      next(null, DRTM)
    })
  }
})
