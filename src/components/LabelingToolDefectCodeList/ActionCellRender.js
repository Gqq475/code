import React from 'react'
import { connect } from 'react-redux'
// import DeleteDialog from './DeleteDialog'
import { Button } from '@blueprintjs/core'
import {
  delLabelingToolImageDefect,
  saveLabelingToolImageDefect,
  updateLabelingToolImageDefect,
  DELETE_DEFECT_MARK_FROM_INDEX
} from 'routes/OJS/modules/OJS'

type Props = {
  data: Object,
  rowIndex: Number,
  deleteDefectFromId: Function,
  deleteDefectFromIndex: Function,
  saveDefect: Function,
  updateDefect: Function
};

export class ActionCellRender extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
    this.onSave = this.onSave.bind(this)
    // this.state = {
    //   isDeleteBtnOpen: false
    // }
  }

  onDelete () {
    if (this.props.data.id) {
      // 刪除後端資料庫的 defect
      this.props.deleteDefectFromId(this.props.data.id.toString())
    } else {
      // 刪除 redux state 裡的 defect list
      this.props.deleteDefectFromIndex(this.props.rowIndex)
    }
    // this.setState({
    //   isDeleteBtnOpen: !this.state.isDeleteBtnOpen
    // })
  }

  onSave () {
    if (this.props.data.id) {
      // 如果有 id => 修改 defect (PUT)
      this.props.updateDefect(this.props.data)
    } else {
      // 如果沒有 id => 儲存 defect (POST)
      this.props.saveDefect(this.props.data, this.props.rowIndex)
    }
  }

  render () {
    return (
      <div>
        <section>
          <Button className={'pt-button pt-minimal pt-icon-trash'} title='Delete' onClick={this.onDelete} />
          <Button className={'pt-button pt-minimal pt-icon-confirm'} title='Save' onClick={this.onSave} />
        </section>
      </div>
    )
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    deleteDefectFromId: (delId) => dispatch(delLabelingToolImageDefect(delId)),
    deleteDefectFromIndex: (rowIndex) => dispatch({
      type: DELETE_DEFECT_MARK_FROM_INDEX,
      data: {rowIndex}
    }),
    saveDefect: (defectData, rowIndex) => dispatch(saveLabelingToolImageDefect(defectData, rowIndex)),
    updateDefect: (defectData) => dispatch(updateLabelingToolImageDefect(defectData))
  })
)(ActionCellRender)

// export default ActionCellRender
