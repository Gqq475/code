import React from 'react'
import PropTypes from 'prop-types'
import Header from '../HeaderLayout'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import Left from '../LeftLayout/'
import { connect } from 'react-redux'
import { TokenIsValid, setRefreshTokenTimer, removeRefreshTokenTimer, setInactivityTimer } from 'actions'

export class CoreLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func
  }
  componentDidMount () {
    let { dispatch } = this.props
    dispatch(setInactivityTimer())
    dispatch(TokenIsValid()).then(res => {
      if (res.tokenIsValid) {
        dispatch(setRefreshTokenTimer())
      }
    })
  }
  componentWillUnMount () {
    removeRefreshTokenTimer()
  }
  render () {
    let { children } = this.props
    return (
      <div className={classes.container}>
        <Header {...children.props} />
        <div className={classes.mainContainer}>
          <Left {...children.props} />
          <section className={classes.coreContainer}>
            {children}
          </section>
        </div>
      </div>
    )
  }
}

export default connect()(CoreLayout)
