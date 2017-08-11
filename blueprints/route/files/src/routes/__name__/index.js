import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: '<%= dashesEntityName %>',
  getComponent (nextState, next) {
    require.ensure([
      './containers/<%= pascalEntityName %>Container',
      './modules/<%= pascalEntityName %>'
    ], (require) => {
      const <%= pascalEntityName %> = require('./containers/<%= pascalEntityName %>Container').default
      const reducer = require('./modules/<%= pascalEntityName %>').default

      injectReducer(store, { key: '<%= dashesEntityName %>', reducer })
      next(null, <%= pascalEntityName %>)
    })
  }
})
