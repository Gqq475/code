// import { injectReducer } from '../../store/reducers'
import { TokenIsValid } from 'actions'
export default (store) => ({
  path: 'qca(/:path)',
  onEnter: function (nextState, replaceState) {
    if (!store.getState().auth.token && !localStorage.getItem('token')) {
      replaceState('/')
    } else {
      store.dispatch(TokenIsValid())
    }
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/QCAContainer'
      // './modules/QCA'
    ], (require) => {
      const QCA = require('./containers/QCAContainer').default
      // const reducer = require('./modules/QCA').default

      // injectReducer(store, { key: 'qca', reducer })
      next(null, QCA)
    })
  }
})
