import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/<%= pascalEntityName %>'

import <%= pascalEntityName %> from 'components/<%= pascalEntityName %>'

const mapActionCreators = {
  increment: () => increment(1),
  doubleAsync
}

const mapStateToProps = (state) => ({
  counter: state.counter
})

export default connect(mapStateToProps, mapActionCreators)(<%= pascalEntityName %>)
