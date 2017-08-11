import React from 'react'
import DeleteDialog from './DeleteDialog'
import classes from './ModelList.scss'

type Props = {
  data: Object,
  api: Object
};

export class ActionCellRender extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
    this.state = {
      isDeleteBtnOpen: false
    }
  }

  onDelete () {
    this.setState({
      isDeleteBtnOpen: !this.state.isDeleteBtnOpen
    })
  }

  render () {
    return (
      <div className={classes.cn}>
        <button onClick={this.onDelete}
          className={'pt-button pt-minimal pt-icon-delete'}
          title='Delete' />
        <DeleteDialog
          api={this.props.api}
          id={this.props.data.id}
          isOpen={this.state.isDeleteBtnOpen}
          toggleDialog={this.onDelete} />
      </div>
    )
  }
}

export default ActionCellRender
