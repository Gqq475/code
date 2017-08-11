import React from 'react'
import classes from './Dialog.scss'
import { Button, Dialog } from '@blueprintjs/core'
import { connect } from 'react-redux'
const qca = __QCA__

type Props = {
  kernelId: Number,
  isOpen: boolean,
  toggleDialog: Function,
  token: String
};

export class DestroySrvDialog extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    console.log('handle Destroy')
    let url = `${qca}/ojs/kernel/action`
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': this.props.token
      },
      method: 'POST',
      body: JSON.stringify({
        'kernelId': this.props.kernelId.toString(),
        'cmd': 'destroy'
      })
    })
      .then(res => res.json())
      .then(data => {

      })

    this.props.toggleDialog()
  }

  render () {
    return (
      <div className={classes['Dialog-container']}>
        <Dialog
          isOpen={this.props.isOpen}
          onClose={this.props.toggleDialog}
          className={classes.dialog}
        >
          <div className={classes.header}>
            <h6 className={classes.headerTitle}>提示</h6>
          </div>
          <div className={classes.dialogBody}>
            <br />
            <p className={classes.cn}>Destroy Service</p>
            <div className={classes.btnGroup}>
              <Button className={classes.btnCancel} onClick={this.props.toggleDialog}>
                {_.CANCEL}
              </Button>
              <Button className={`pt-button pt-intent-primary ${classes.btnEdit}`} onClick={this.handleSubmit}>
                {_.OK}
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}
export default connect(
  (state) => ({
    token: state.auth.token
  }),
  (dispatch, state) => {
    return {
      dispatch
    }
  }
)(DestroySrvDialog)
