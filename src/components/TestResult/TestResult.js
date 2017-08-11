import React from 'react'
import PropTypes from 'prop-types'
import classes from './TestResult.scss'
import { Slider, Radio } from '@blueprintjs/core'
import { isEmpty, assign } from 'lodash'
import { connect } from 'react-redux'
import {
  getModelTestCount
} from 'routes/OJS/modules/ModelTest'

class ChildSlider extends React.Component {
  static propTypes = {
    getChangeHandler: PropTypes.func,
    radioChecked: PropTypes.number,
    item: PropTypes.object,
    index: PropTypes.number
  }

  render () {
    let { getChangeHandler, radioChecked, item, index } = this.props
    let Count = (item.count) ? (
      <div style={{display: 'flex'}}>
        <div style={{margin: '0px 5px'}}>Recall:<span>{item.count.rightCount}%</span></div>
        <div style={{margin: '0px 5px'}}>错分率:<span>{item.count.errorCount}%</span></div>
        <div style={{margin: '0px 5px'}}>Others:<span>{item.count.otherCount}%</span></div>
      </div>
    ) : null

    return (
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', marginLeft: '20px'}}>
          <span style={{marginRight: '30px'}}>{item.defectName}</span>
          <Slider
            disabled={+radioChecked === 1}
            className={classes.slider}
            min={0}
            max={100}
            labelStepSize={20}
            value={item.confidence}
            onRelease={getChangeHandler(index)} />
        </div>
        { Count }
      </div>
    )
  }
}

type Props = {
  id: Number,
  data: Object,
  dispatch: Function
};

export class TestResult extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      radioChecked: 1,
      confidenceAll: 0
    }
    this.getChangeHandler = this.getChangeHandler.bind(this)
    this.getAllChangeHandler = this.getAllChangeHandler.bind(this)
  }

  getAllChangeHandler (value) {
    this.setState({
      ...this.state,
      confidenceAll: value
    })

    this.props.dispatch({
      type: 'UPDATE_ALL_MODEL_TEST_RESULT_TYPE',
      data: {
        confidence: value
      }
    })

    if (!isEmpty(this.props.data.modelResultType)) {
      this.props.data.modelResultType.forEach(defect => {
        this.props.dispatch(getModelTestCount({
          id: this.props.id,
          defectName: defect.defectName,
          confidence: value
        }))
      })
    }
  }

  getChangeHandler (keyIndex) {
    return (value) => {
      this.props.dispatch({
        type: 'UPDATE_MODEL_TEST_RESULT_TYPE',
        data: {
          keyIndex,
          confidence: value
        }
      })

      this.props.dispatch(getModelTestCount({
        keyIndex,
        id: this.props.id,
        defectName: this.props.data.modelResultType[keyIndex].defectName,
        confidence: value
      }))
    }
  }

  handleChange (type) {
    return (e) => {
      let value = e.target.value * 1
      this.setState(assign(
        ...this.state, {
          [type]: value
        }))
    }
  }

  render () {
    return (
      <div>
        {
          (!isEmpty(this.props.data.modelResultType)) ? (
            <div className={classes['TestResult-container']}>
              <div className={classes['top-left']}>
                <span className={classes.productGlass}>Testing Result </span>
              </div>
              <div style={{border: '1px solid #ccc', borderTop: '0px', paddingTop: '20px'}}>
                <div style={{display: 'flex', marginLeft: '20px'}}>
                  <span >Confidence Threshold</span>
                  <Radio
                    style={{marginLeft: '20px'}}
                    label='整体'
                    value={1}
                    checked={+this.state.radioChecked === 1}
                    onChange={this.handleChange('radioChecked')}
                    name='radioChecked'
                    />
                  <Radio
                    style={{marginLeft: '10px'}}
                    label='单项'
                    value={2}
                    checked={+this.state.radioChecked === 2}
                    onChange={this.handleChange('radioChecked')}
                    name='radioChecked'
                  />
                </div>
                <div style={{display: 'flex'}}>
                  <div style={{display: 'flex', marginLeft: '20px'}}>
                    <span style={{marginRight: '30px'}}>OverRall</span>
                    <Slider
                      disabled={+this.state.radioChecked === 2}
                      className={classes.slider}
                      min={0}
                      max={100}
                      labelStepSize={20}
                      value={this.state.confidenceAll}
                      onRelease={this.getAllChangeHandler} />
                  </div>
                </div>
                <div style={{margin: '20px 0px', borderTop: '1px solid #ccc', width: '100%'}} />
                {
                  this.props.data.modelResultType.map((item, index) => {
                    return (
                      <ChildSlider
                        getChangeHandler={this.getChangeHandler}
                        radioChecked={this.state.radioChecked}
                        item={item}
                        index={index}
                        key={`${index}`}
                        />
                    )
                  })
                }
              </div>
            </div>
          ) : null
        }
      </div>
    )
  }
}

export default connect()(TestResult)
