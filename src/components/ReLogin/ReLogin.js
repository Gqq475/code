import React from 'react'
import classes from './ReLogin.scss'
import { connect } from 'react-redux'
import { assign } from 'lodash'
import { Button, Checkbox, Dialog } from '@blueprintjs/core'
import { authenticate } from 'actions'
type Props = {
  authenticate: Function,
  authFailureMessage: String
};
export class ReLogin extends React.Component {
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
      <div className={classes['ReLogin-container']}>
        <Dialog className={classes.dialog} isOpen>
          <div className={classes.header}>
            <h6 className={classes.headerTitle}>登录</h6>
          </div>
          <div className={classes.dialogBody}>
            <div className={classes.form}>
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
          </div>
        </Dialog>
      </div>
    )
  }
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
    dispatch(authenticate(username, password, 'ReLogin'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReLogin)
