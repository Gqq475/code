import React from 'react'
import { connect } from 'react-redux'
import classes from './AlarmNotifyDialog.scss'
import Select from 'react-select'
import { assign, concat } from 'lodash'
import { eachSeries } from 'async'
import { Dialog, Checkbox } from '@blueprintjs/core'
const MAX_CONTRIBUTORS = 6

type Props = {
  notifyDialogIsOpen: Boolean,
  toggleNotifyDialog: Function,
  alarmType: String,
  id: Number,
  token: String
};

export class AlarmNotifyDialog extends React.Component {
  props: Props;
  constructor () {
    super()
    this.state = {
      multi: true,
      selectedValue: [],
      checkbox: '',
      message: '',
      errorQueue: [],
      alertMessage: '',
      smsIsPublished: false
    }

    this.handleSmsPublish = this.handleSmsPublish.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
    this.cancelDialog = this.cancelDialog.bind(this)
  }
  handleSmsPublish () {
    if (this.state.checkbox === 'Push notification' && this.state.message !== '') {
      eachSeries(this.state.selectedValue, (role, callback) => {
        fetch(`${__QCA__}/notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': this.props.token
          },
          body: JSON.stringify({
            receiver_id: role.id,
            alarm_type: this.props.alarmType,
            alarm_id: this.props.id,
            alarm_content: this.state.message
          })
        })
        .then(response => response.json())
        .then(json => {
          if (json.code !== 200000) {
            this.setState(assign({}, this.state, {
              errorQueue: concat([], this.state.errorQueue, `${role.name}`)
            }))
          }
          callback()
        })
        .catch(err => {
          console.log(err)
          this.setState(assign({}, this.state, {
            errorQueue: concat([], this.state.errorQueue, `${role.name}`)
          }))
          callback()
        })
      }, () => {
        // Do something after all messages have already published.
        if (this.state.errorQueue.length === 0) {
          this.setState(assign({}, this.state, {
            smsIsPublished: true,
            alertMessage: '所有讯息发布完成'
          }))
        } else {
          this.setState(assign({}, this.state, {
            smsIsPublished: true,
            alertMessage: `通知 ${this.state.errorQueue.join(', ')} 失败`
          }))
        }
      })
    }
  }
  getUsers (userName, callback) {
    // workaround for test
    fetch(`${__QCA__}/users`, {
      headers: {
        'Authorization': this.props.token
      },
      method: 'GET'
    })
    .then(res => res.json())
    .then(json => {
      if (json.code === 200000) {
        let options = json.result.filter(user => {
          return user.name.substr(0, userName.length) === userName
        })
        let data = {
          options: options.slice(0, MAX_CONTRIBUTORS),
          complete: options.length <= MAX_CONTRIBUTORS
        }
        callback(null, data)
      } else {
        callback(null)
      }
    })
  }
  handleCheckbox (e) {
    let checkbox = ''
    if (this.state.checkbox !== e.target.labels[0].innerText) {
      checkbox = e.target.labels[0].innerText
    }
    this.setState(assign({}, this.state, { checkbox }))
  }
  handleSelectChange (selectedUser) {
    this.setState(assign({}, this.state, { selectedValue: selectedUser }))
  }
  handleMessage (e) {
    this.setState(assign({}, this.state, { message: e.target.value }))
  }
  cancelDialog () {
    this.setState({
      multi: true,
      selectedValue: [],
      checkbox: '',
      message: '',
      errorQueue: [],
      alertMessage: '',
      smsIsPublished: false
    })
    this.props.toggleNotifyDialog()
  }
  render () {
    return (
      <section>
        <Dialog
          iconName='inbox'
          isOpen={this.props.notifyDialogIsOpen}
          onClose={this.cancelDialog} title='Notify users'>
          <div className='pt-dialog-body dialog--body'>
            {
              (!this.state.smsIsPublished) ? (
                <section className={classes.body}>
                  <span>{this.state.successfulAlert}</span>
                  <span>Select receivers</span>
                  <Select.Async
                    multi={this.state.multi}
                    value={this.state.selectedValue}
                    placeholder=''
                    valueKey='name'
                    labelKey='name'
                    loadOptions={this.getUsers}
                    onChange={this.handleSelectChange} />
                  <span>Notification types</span>
                  <section className={classes.checkboxGroup}>
                    <Checkbox
                      checked={this.state.checkbox === 'Mail'}
                      label='Mail'
                      onChange={this.handleCheckbox}
                      disabled />
                    <Checkbox
                      checked={this.state.checkbox === 'Push notification'}
                      label='Push notification'
                      onChange={this.handleCheckbox} />
                    <Checkbox label='SMS' disabled />
                  </section>
                  <span>Messages</span>
                  <textarea className='pt-input' onChange={this.handleMessage} value={this.state.message} />
                  <article className={classes.btnGroup}>
                    <button style={{
                      margin: '0 10px'
                    }}
                      type='button'
                      className='pt-button'
                      onClick={this.cancelDialog}>Cancel</button>
                    <button type='button'
                      className={`pt-button pt-intent-primary ${
                        (this.state.checkbox === 'Push notification' && this.state.message !== '')
                        ? '' : 'pt-disabled'
                      }`}
                      onClick={this.handleSmsPublish}>Send</button>
                  </article>
                </section>
              ) : (
                <section
                  className={classes.successfulBody}>
                  <span style={{
                    margin: '20px auto'
                  }}
                    >{this.state.alertMessage}</span>
                  <button
                    className='pt-button pt-large pt-intent-primary'
                    onClick={this.cancelDialog}>OK</button>
                </section>
              )
            }
          </div>
        </Dialog>
      </section>
    )
  }
}

export default connect(
  (state) => ({
    reporter: state.auth.reporter,
    token: state.auth.token
  }),
  (dispatch, state) => {
    return {
      dispatch
    }
  }
)(AlarmNotifyDialog)
