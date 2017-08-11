import React from 'react'
import classes from './Dialog.scss'
import { Button, Dialog } from '@blueprintjs/core'

type Props = {
  id: Number,
  isOpen: boolean,
  toggleDialog: Function
};

export class DeleteDialog extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
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

export default DeleteDialog
