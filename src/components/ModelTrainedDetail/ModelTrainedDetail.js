import React from 'react'
import classes from './ModelTrainedDetail.scss'
import { Spinner } from '@blueprintjs/core'
import ModelTrainingProgress from 'components/ModelTrainingProgress'
import ModelTrainedComplete from 'components/ModelTrainedComplete'

type Props = {
  modelTrainInfo: Object,
  modelTrainAll: Object,
  modelTrainResultChart: Object,
  id: String,
  createTime: String
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

export class ModelTrainedDetail extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  static propTypes = { modelTrainInfo: React.PropTypes.object };
  static defaultProps = {
    modelTrainInfo: {
      deviceId: 1,
      gpuMemory: '885MiB / 16276MiB',
      gpuName: '90%',
      gpuUsage: 'GPUName1',
      id: 1,
      power: '95W / 250W',
      temp: '45C'
    },
    modelTrainResultChart: {
      defect01: 1,
      defect02: 2,
      defect03: 3
    }
  }

  render () {
    console.log('props', this.props.modelTrainInfo)
    // if (isEmpty(this.props.modelTrainInfo === undefined) &&
    //   isEmpty(this.props.modelTrainResultChart === undefined)) {
    //   return (
    //     <div className={classes['ModelTrainedDetail-container']}>
    //       <div style={{color: '#337ab7', fontSize: '16px', fontWeight: 'bold'}}>请稍等！</div>
    //     </div>
    //   )
    // } else {
    let lossRate = []
    let accuracy = []
    this.props.modelTrainAll.forEach((item, i) => {
      lossRate.push(item.lossRate)
      accuracy.push(item.loopCount)
    })
    return (
      <div className={classes['ModelTrainedDetail-container']}>
        <div className={classes['top']}>
          <div className={classes['top-left']}>
            <span className={classes.productGlass}>Model Traning: </span>
            <span className={`${classes.strong}`}>
              {this.props.id}
            </span>
          </div>
        </div>
        <div className={classes['top']}>
          <div className={classes['top-left']}>
            <div className={classes.productGlass}>Training Progress </div>
          </div>
        </div>
        <div className={classes.progress}>
          <ModelTrainingProgress lossRate={lossRate} accuracy={accuracy} />
        </div>
        <div className={classes.content}>
          <div className={classes.left}>
            <div className={classes.strong}>State: {this.state.status}</div>
            <span className={classes.state}>100%</span>
            <Spinner className={`pt-large pt-intent-primary ${classes.spinner}`} value='1' />
          </div>
          <div className={classes.center}>
            <div className={classes.strong}>Time</div>
            {new TextField('Initialized at：', this.props.createTime).getRender()}
            {new TextField('Running at：', this.props.modelTrainAll[0].startTime).getRender()}
            {new TextField('Will Finish：',
              this.props.modelTrainAll[this.props.modelTrainAll.length - 1].endTime).getRender()}
            <div className={classes.strong}>Hardware Usage</div>
            {new TextField('GPU：', this.props.modelTrainInfo.gpuName).getRender()}
            {new TextField('GPU Memory：', this.props.modelTrainInfo.gpuMemory).getRender()}
            {new TextField('GPU Utilization：', this.props.modelTrainInfo.gpuUsage).getRender()}
            {new TextField('Temperature：', this.props.modelTrainInfo.temp).getRender()}
          </div>
        </div>
        <div className={classes.complete}>
          <ModelTrainedComplete
            modelTrainResultChart={this.props.modelTrainResultChart} />
        </div>
      </div>
    )
  }
}

export default ModelTrainedDetail
