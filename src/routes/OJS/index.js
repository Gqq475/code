// import { injectReducer } from '../../store/reducers'
import { TokenIsValid } from 'actions'
import { push } from 'react-router-redux'
import { identifyRole } from '../../Utils'

export default (store) => ({
  path: 'ojs(/:path)',
  onEnter: function (nextState, replaceState) {
    let { token } = store.getState().auth
    if (!token && !localStorage.getItem('token')) {
      replaceState('/')
    } else {
      store.dispatch(TokenIsValid()).then(res => {
        if (res.tokenIsValid) {
          if (identifyRole(res.userRole) === 'guest-only') {
            // Guest Role: can only visit /drtm, /qca with GET API
            store.dispatch(push('/drtm/currentalarm'))
          }
        }
      })
    }
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/OJSContainer'
      // './modules/QCA'
    ], (require) => {
      const OJS = require('./containers/OJSContainer').default
      // const reducer = require('./modules/QCA').default

      // injectReducer(store, { key: 'qca', reducer })
      next(null, OJS)
    })
  }
})
