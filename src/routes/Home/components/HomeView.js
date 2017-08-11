import React from 'react'
import { connect } from 'react-redux'
import classes from './HomeView.scss'
import { assign } from 'lodash'
import { Button, Checkbox } from '@blueprintjs/core'
import { authenticate } from 'actions'

export class HomeView extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.onBtnClick = this.onBtnClick.bind(this)
    this.togglePasswordKeeping = this.togglePasswordKeeping.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.state = {
      rememberMe: true,
      username: '',
      password: ''
    }
  }

  componentWillMount () {
    if (localStorage.getItem('rememberMe')) {
      this.setState(assign({}, this.state, {
        username: localStorage.getItem('rememberMe')
      }))
    }
  }

  onBtnClick () {
    this.props.authenticate(this.state.username, this.state.password, this.state.rememberMe)
  }

  togglePasswordKeeping (e) {
    this.setState(assign({}, this.state, { rememberMe: !this.state.rememberMe }))
  }

  handleUsernameChange (e) {
    this.setState(assign({}, this.state, { username: e.target.value }))
  }

  handlePasswordChange (e) {
    this.setState(assign({}, this.state, { password: e.target.value }))
  }

  render () {
    return (
      <div className={classes.HomeViewContainer}>
        <div className={classes.form}>
          <img alt='DRC_K2 Hooray!' className={classes.logo} src='/quality03_0111-20.png' />
          <form className='login-form'>
            <center className={classes.message}>BIF-Quality</center>
            <br />
            <label className={classes.submessage}>请登录</label>
            <span style={{
              color: 'red'
            }}>{this.props.authFailureMessage}</span>
            <br />
            <br />
            <input type='text' placeholder='账号'
              value={this.state.username}
              onChange={this.handleUsernameChange}
              />
            <br />
            <input type='password' placeholder='密码'
              value={this.state.password}
              onChange={this.handlePasswordChange} />
            <br />
            <Checkbox className={classes.checkbox} checked={this.state.rememberMe}
              label='记住我' onChange={this.togglePasswordKeeping} />
            <Button className='pt-intent-primary pt-large' onClick={this.onBtnClick}>
              登录
            </Button>
            <div className={classes.create}>注册账号</div>
          </form>
        </div>
        <label className={classes.footerText}>© 2017 北京华睿智达科技有限公司 版权所有.</label>
      </div>)
  }
}

HomeView.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    authFailureMessage: state.auth.failureMessage
  }
}

const mapDispatchToProps = (dispatch) => ({
  authenticate: (username, password, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem('rememberMe', username)
    } else {
      localStorage.removeItem('rememberMe')
    }
    dispatch(authenticate(username, password))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
