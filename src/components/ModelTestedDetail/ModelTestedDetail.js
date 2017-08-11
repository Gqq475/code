import React from 'react'
import classes from './ModelTestedDetail.scss'
import { Spinner } from '@blueprintjs/core'
import ModelTestedResultList from 'components/ModelTestedDetail/ModelTestedResultList'
import TestResult from 'components/TestResult'
import { isEmpty } from 'lodash'

type Props = {
  data: Object,
  dataDetail: Object,
  modelResultList: Object,
  modelTestAll: Object
};
export class TextField {
  constructor (key, value) {
    this.key = key
    this.value = value
  }

  getRender (btn) {
    return (
      <div className={classes.textField}>
        <div className={classes.key}>
          {this.key}
        </div>
        <div className={classes.value}>
          {this.value}
          {btn}
        </div>
      </div>
    )
  }
}

export class ModelTestedDetail extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      confidence: 60,
      inputValue: '',
      progress: 0,
      result: false,
      run: ''
    }
  }

  render () {
    if (isEmpty(this.props.modelTestAll)) {
      return (
        <div className={classes['ModelTestedDetail-container']} />
      )
    } else {
      return (<div className={classes['ModelTestedDetail-container']}>
        {
          (isEmpty(this.props.dataDetail)) ? null : (
            <div style={{position: 'relative',
              border: '2px solid #d7d7d7',
              borderRadius: '4px',
              padding: '30px 50px',
              margin: '30px 0'}}>
              <div className={classes['top']}>
                <div className={classes['top-left']}>
                  <span className={classes.productGlass}>Model Testing: </span>
                  <span className={`${classes.strong}`}>
                    {this.props.dataDetail.name}
                  </span>
                </div>
              </div>
              <div className={classes.content}>
                <div className={classes.center}>
                  <div className={classes.time}>
                    <div className={classes.strong}>Status: idle</div>
                    <div className={classes.strong}>Time</div>
                    {new TextField('Initialized at：', this.props.dataDetail.createTime).getRender()}
                    {new TextField('Running at：', this.props.modelTestAll.startTime).getRender()}
                    {new TextField('Will Finish：',
                      this.props.modelTestAll.updateTime).getRender()}
                  </div>
                  <div className={classes.left}>
                    <span className={classes.state}>100%</span>
                    <Spinner className={`pt-large pt-intent-primary ${classes.spinner}`}
                      value='1' />
                  </div>
                </div>
              </div>
              <ModelTestedResultList
                id={this.props.dataDetail.id}
                modelResultList={this.props.modelResultList}
                data={this.props.data} />
              {
                (!isEmpty(this.props.data.modelResultType)) ? (
                  <TestResult
                    id={this.props.dataDetail.id}
                    data={this.props.data} />) : null
              }
            </div>
          )
        }
      </div>)
    }
  }
}

export default ModelTestedDetail
