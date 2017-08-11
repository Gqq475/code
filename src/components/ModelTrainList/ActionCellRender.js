import React from 'react'
// import AddDialog from './AddDialog'
import DeleteDialog from './DeleteDialog'
// import PublishDialog from './PublishDialog'
// import ModifyDialog from './ModifyDialog'
import classes from './ModelTrainList.scss'
// import OurToaster from 'components/OurToaster'

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
