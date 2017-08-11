import React from 'react'
import classes from './CreateModelDialog.scss'
import { Button, Dialog, Slider } from '@blueprintjs/core'
import { assign } from 'lodash'
// import OurToaster from 'components/OurToaster'

type Props = {
  isOpen: boolean,
  toggleDialog: Function,
  createTrainModel: Function,
  // handleSubmit: Function
};
export class CreateModelDialog extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleSliderChange = this.handleSliderChange.bind(this)
    this.handleSliderChangeLossRate = this.handleSliderChangeLossRate.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.openDefectImages = this.openDefectImages.bind(this)
    this.state = {
      interation: 1000000,
      lossRate: 0.00001,
      imageName: '',
      modelName: ''
    }
  }

  handleSliderChange (value) {
    // this.setState({ [type]: value })
    this.setState(assign({}, this.state, {
      interation: value
    }))
    this.refs.interation.value = value
  }

  handleSliderChangeLossRate (value) {
    this.setState(assign({}, this.state, {
      lossRate: value
    }))
    this.refs.lossRate.value = value
  }

  inputChange (type) {
    return (e) => {
      console.log('e', e.target.value)
      if (type === 'interation' || type === 'lossRate') {
        this.setState(assign({}, this.state, {
          [type]: +e.target.value
        }))
        // if (type === 'interation') {
        //   let max = 3000000
        //   let min = 1000000
        //   if (max < e.target.value || min > e.target.value) {
        //     alert('输入数字超出范围！')
        //     e.target.value = 1000000
        //     this.setState(assign({}, this.state, {
        //       [type]: 1000000
        //     }))
        //   }
        // }
        // if (type === 'lossRate') {
        //   let max = 0.1
        //   let min = 0.00001
        //   if (max < e.target.value || min > e.target.value) {
        //     alert('输入数字超出范围！')
        //     e.target.value = 0.00001
        //     this.setState(assign({}, this.state, {
        //       [type]: 0.00001
        //     }))
        //   }
        // }
      } else {
        this.setState(assign({}, this.state, {
          [type]: e.target.value
        }))
      }
    }
  }

  inputBlur (type) {
    return (e) => {
      console.log('e', e.target.value)
      if (type === 'interation' || type === 'lossRate') {
        this.setState(assign({}, this.state, {
          [type]: +e.target.value
        }))
        if (type === 'interation') {
          let max = 3000000
          let min = 1000000
          if (max < e.target.value || min > e.target.value) {
            alert('输入数字超出范围！')
            e.target.value = 1000000
            this.setState(assign({}, this.state, {
              [type]: 1000000
            }))
          }
        }
        if (type === 'lossRate') {
          let max = 0.1
          let min = 0.00001
          if (max < e.target.value || min > e.target.value) {
            alert('输入数字超出范围！')
            e.target.value = 0.00001
            this.setState(assign({}, this.state, {
              [type]: 0.00001
            }))
          }
        }
      } else {
        this.setState(assign({}, this.state, {
          [type]: e.target.value
        }))
      }
    }
  }

  openDefectImages () {
    this.setState(assign({}, this.state, {
      imageName: '/defect01/1.jpg,/defect03/3.jpg,/defect02/2.jpg'
    }))
  }

  handleCreate () {
    this.props.createTrainModel({
      imageResource: this.state.imageName,
      name: this.state.modelName,
      gpuId: 1,
      iteration: this.state.interation,
      lossRate: this.state.lossRate
    })
    // this.props.handleSubmit(true)
    this.props.toggleDialog()
  }

  render () {
    return (
      <div className={classes['CreateModelDialog-container']}>
        <Dialog
          isOpen={this.props.isOpen}
          onClose={this.props.toggleDialog}
          className={classes.dialog}
        >
          <div className={classes.header}>
            <h6 className={classes.headerTitle}>新建模型</h6>
          </div>
          <div className={classes.dialogBody}>
            <div>
              <label className={classes.filter}>
                Training Defect Images:
                <input type='text'
                  className='pt-input'
                  value={this.state.imageName}
                  onChange={this.inputChange('imageName')} />
                <Button
                  onClick={this.openDefectImages}
                  className={`classes.btnEdit ${classes.interations}`}>
                  打开
                </Button>
              </label>
              <label className={classes.filter}>
                Number Of Interations:
                <Slider
                  min={1000000}
                  max={3000000}
                  stepSize={100000}
                  labelStepSize={1000000}
                  onChange={this.handleSliderChange}
                  value={this.state.interation}
                  className={classes.slider}
                />
                <input type='text' className={`pt-input ${classes.interations}`} ref='interation'
                  defaultValue={this.state.interation}
                  onChange={this.inputChange('interation')}
                  onBlur={this.inputBlur('interation')}
                />
              </label>
              <label className={classes.filter}>
                Loss Rate:
                <Slider
                  min={0.00000}
                  max={0.1}
                  stepSize={0.00001}
                  labelStepSize={0.1}
                  onChange={this.handleSliderChangeLossRate}
                  value={this.state.lossRate}
                  className={classes.slider}
                />
                <input type='text' className={`pt-input ${classes.interations}`} ref='lossRate'
                  defaultValue={this.state.lossRate}
                  onChange={this.inputChange('lossRate')}
                  onBlur={this.inputBlur('lossRate')}
                />
              </label>
              <label className={classes.filter}>
                Model Name:
                <input type='text' className={'pt-input'} onChange={this.inputChange('modelName')} />
              </label>
            </div>
            <div className={classes.btnGroup}>
              <Button className={classes.btnCancel} onClick={this.props.toggleDialog}>
                取消
              </Button>
              <Button className={`pt-button pt-intent-primary ${classes.btnEdit}`} onClick={this.handleCreate}>
                新建
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default CreateModelDialog
