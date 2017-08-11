import React from 'react'
import classes from './DialogFilter.scss'
import { Button, Dialog } from '@blueprintjs/core'

type Props = {
  data: Obejct,
  isOpen: boolean,
  DialogTitle: String,
  DialogID: Number,
  DialogName:String,
  modelId: Number,
  DialogBtnContent: String,
  toggleDialog: Function,
  handleSubmit: Function,
  that:Object,
  kernelId: Number,
  kernelIds: Object,
  loadingKernelIds: Boolean
};
export class DialogFilter extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.isChanged = this.isChanged.bind(this)
  }

  // handleChange (type) {
  //   return (e) => {
  //     this.props.handleChange(e.target.value, type)
  //   }
  // }

  handleChange (type) {
    return (e) => {
      this.props.that.setState({
        [type]: this.trim(e.target.value)
      })
    }
  }

  trim (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }

  isChanged () {
    return (((this.refs.serviceName && this.trim(this.refs.serviceName.value)) || this.props.DialogName) &&
      (+this.props.kernelId || +this.props.kernelId === 0) &&
      +this.props.modelId)
  }

  render () {
    return (
      <div className={classes['DialogFilter-container']}>
        <Dialog
          isOpen={this.props.isOpen}
          onClose={this.props.toggleDialog}
          className={classes.dialog}
        >
          <div className={classes.header}>
            <h6 className={this.props.DialogID === '' ? classes.onlyHeaderTitle : classes.headerTitle}>
              {this.props.DialogTitle}
            </h6>
            <h5 className={classes.headerID}>{this.props.DialogID === '' ? '' : 'ID:' + this.props.DialogID}</h5>
          </div>
          <div className={classes.dialogBody}>
            <label className={classes.filter}>
              {_.NAME}
              <div>
                <input type='text' className={'pt-input'} ref='serviceName' defaultValue={this.props.DialogName}
                  onChange={this.handleChange('name')} />
              </div>
            </label>
            <label className={classes.filter}>
              {_.KERNELID}
              <div>
                {(() => {
                  if (!this.props.loadingKernelIds) {
                    if (this.props.kernelIds.length) {
                      return (<select
                        className={classes.select}
                        disabled={this.props.DialogBtnContent === 'Edit' && !!this.props.kernelId}
                        onChange={this.handleChange('kernelId')}
                      >
                        {this.props.DialogBtnContent !== 'Edit' ? <option>请选择</option> : ''}
                        {this.props.kernelIds.map((kernelId, i) => {
                          return <option
                            key={i}
                            value={kernelId}
                            selected={this.props.kernelId === kernelId}
                          >{kernelId}</option>
                        })}
                      </select>)
                    } else {
                      return <input type='text' className={'pt-input'} value='没有可用的kernelId' disabled />
                    }
                  } else {
                    return <input type='text' className={'pt-input'} value='loading...' disabled />
                  }
                })()}
              </div>
            </label>
            <label className={classes.filter}>
              {_.MODEL}
              <div>
                {(() => {
                  if (this.props.data && this.props.data.model) {
                    return (
                      <select className={classes.select} onChange={this.handleChange('modelId')}>
                        <option>请选择</option>
                        {this.props.data.model.result.Models.map((item, i) => {
                          return <option key={i} value={item.id}
                            selected={+this.props.modelId === +item.id}>{item.path}</option>
                        })}
                      </select>
                    )
                  }
                })()}
              </div>
            </label>
            <div className={classes.btnGroup}>
              <Button className={classes.btnCancel} onClick={this.props.toggleDialog}>
               Cancel
              </Button>
              <Button className={`pt-button pt-intent-primary ${classes.btnEdit}`} onClick={this.props.handleSubmit}
                disabled={!this.isChanged()} >
                {this.props.DialogBtnContent}
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default DialogFilter
