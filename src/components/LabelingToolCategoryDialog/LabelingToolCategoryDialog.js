import React from 'react'
import classes from './LabelingToolCategoryDialog.scss'
import { Button, Dialog } from '@blueprintjs/core'
import Tabs from 'components/LabelingToolDefectType'
import OurToaster from 'components/OurToaster'
import { connect } from 'react-redux'
const qca = __QCA__

type Props = {
  data: Object,
  isOpen: boolean,
  toggleDialog: Function,
  addDefectType: Function,
  getDefectTypeList: Function,
  token: String
};

export class LabelingToolCategoryDialog extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.state = {
      factoryCode: 'TFT',
      departmentCode: 'General',
      name: ''
    }
  }

  handleChange (type) {
    return (e) => {
      this.setState({ [type]: e.target.value })
    }
  }

  handleSubmit () {
    this.props.addDefectType(this.state)
    this.props.toggleDialog()
    var self = this
    setTimeout(() => { self.props.getDefectTypeList() }, 1000)
  }

  handleDelete () {
    const url = `${qca}/offline/labeling/defect/type`
    if (this.props.data.currentDefectType) {
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': this.props.token
        },
        body: JSON.stringify({
          id: this.props.data.currentDefectType.defectTypeId
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.code === 200000) {
          OurToaster.show({message: '删除成功！'})
        } else {
          OurToaster.show({message: '删除失败！'})
        }
      })
      this.props.toggleDialog()
      var self = this
      setTimeout(() => { self.props.getDefectTypeList() }, 1000)
    } else {
      OurToaster.show({message: '请选择删除的类别!'})
    }
  }

  render () {
    return (
      <div className={classes['LabelingToolCategoryDialog-container']}>
        <Dialog
          isOpen={this.props.isOpen}
          onClose={this.props.toggleDialog}
          className={classes.dialog}
        >
          <div className={classes.header}>
            <h6 className={classes.headerTitle}>类别修改</h6>
          </div>
          <div className={classes.dialogBody}>
            <div className={classes.leftBox}>
              <Tabs
                isDialog
                data={this.props.data}
                getDefectTypeList={this.props.getDefectTypeList} />
              <Button className={`pt-button pt-intent-primary ${classes.btnEdit}`} onClick={this.handleDelete}>
               Delete
              </Button>
            </div>
            <div className={classes.rightBox}>
              <label className={`pt-label pt-inline ${classes.filter}`}>
                厂别
                <div className='pt-select'>
                  <select className={classes.select} onChange={this.handleChange('factoryCode')}>
                    <option value='TFT'>TFT</option>
                    <option value='CF'>CF</option>
                    <option value='Cell'>Cell</option>
                    <option value='Module'>Module</option>
                  </select>
                </div>
              </label>
              <label className={`pt-label pt-inline ${classes.filter}`}>
                部门
                <div className='pt-select'>
                  <select className={classes.select} onChange={this.handleChange('departmentCode')}>
                    <option value='General'>General</option>
                    <option value='Photo'>Photo</option>
                    <option value='ThinFilm'>Thin Film</option>
                    <option value='Etch'>Etch</option>
                    <option value='Testing'>Testing</option>
                    <option value='CF'>CF</option>
                  </select>
                </div>
              </label>
              <label className={`pt-label pt-inline ${classes.filter}`}>
                类别
                <input type='text' className='pt-select' onChange={this.handleChange('name')} />
              </label>
            </div>
            <div className={classes.btnGroup}>
              <Button className={`pt-button pt-intent-primary ${classes.btnEdit}`} onClick={this.handleSubmit}>
               Add
              </Button>
              <Button className={classes.btnCancel} onClick={this.props.toggleDialog}>
                {_.CANCEL}
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
)(LabelingToolCategoryDialog)
