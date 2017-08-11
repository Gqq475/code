import React from 'react'
import classes from './Dialog.scss'
import { Button, Dialog } from '@blueprintjs/core'
import OurToaster from 'components/OurToaster'
import { connect } from 'react-redux'
const qca = __QCA__

type Props = {
  id: Number,
  api: Object,
  isOpen: boolean,
  toggleDialog: Function,
  token: String
};

export class DeleteDialog extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    // const url = `${qca}/ojs/service`
    const url = `${qca}/offline/version_control/model_version`
    const delData = {}
    delData.model_id = this.props.id.toString()
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify(delData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.code === 200000) {
        this.props.api.removeItems(this.props.api.getSelectedNodes())
      } else {
        OurToaster.show({message: '删除失败！'})
      }
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
            <p className={classes.cn}>{`是否删除id为${this.props.id}的这条数据?`}</p>
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
)(DeleteDialog)
