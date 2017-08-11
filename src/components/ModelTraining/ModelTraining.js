import React from 'react'
import classes from './ModelTraining.scss'
import { Spinner } from '@blueprintjs/core'
import ModelTrainingProgress from 'components/ModelTrainingProgress'
import ModelTrainingComplete from 'components/ModelTrainingComplete'
import Mqtt from 'mqtt'
import OurToaster from 'components/OurToaster'
import { connect } from 'react-redux'
import { concat } from 'lodash'
// import { assign } from 'lodash'
// const __QCA__ = 'http://172.22.34.220:50080/api'
// const __QCA__ = 'http://172.22.40.73:5005'

type Props = {
  modelTrainInfo: Object,
  detail: Object,
  token: String,
  getModelInfo: Function,
  getModelTrainResult: Function,
  dispatch: Function
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

export class ModelTraining extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.BeginTraning = this.BeginTraning.bind(this)
    this.state = {
      beginTraning: false,
      status: '',
      progress: 0,
      run: '',
      gpuMemory: '',
      gpuName: '',
      gpuUsage: '',
      temp: '',
      lossRate: [],
      accuracy: [],
      end: ''
    }

    this.stop = this.stop.bind(this)
    this.destory = this.destory.bind(this)
  }

  componentDidMount () {
    let client
    if (__PROD__) {
      client = Mqtt.connect(`wss://${location.hostname}:59001`, {
        'rejectUnauthorized': false,
        'username': 'deltaww',
        'password': 'Dare2Define'
      })
    } else {
      client = Mqtt.connect(__MQTT__, {
        'rejectUnauthorized': false,
        'username': 'deltaww',
        'password': 'Dare2Define'
      })
    }

    client.on('connect', () => {
      client.subscribe('autojudge/1/agent')
    })

    client.on('message', (topic, message) => {
      let msgArray = JSON.parse(message.toString())
      console.log('magarray', msgArray)
      if (msgArray.cmd === 'training_progress') {
        this.setState({
          status: 'in_progress'
        })
      }
      if (msgArray.cmd === 'status') {
        this.setState({
          status: msgArray.custom.status
        })
        console.log('id', this.props.detail.id)
        this.props.dispatch({
          type: 'SUCCESSFULLY_UPDATE_TRAINING_MODEL',
          payload: {
            status: this.state.status,
            id: this.props.detail.id
          }
        })
      }
      if (msgArray.cmd === 'training_progress') {
        console.log('msgArray.custom.percent', msgArray.custom.percent)
        this.setState({
          progress: msgArray.custom.percent * 100,
          run: msgArray.timestamp,
          lossRate: concat([], this.state.lossRate, msgArray.custom.accuracy * 1),
          accuracy: concat([], this.state.lossRate, msgArray.custom.accuracy * 1)
        })
      }
      if (msgArray.custom.percent === '1.00') {
        this.setState({
          end: new Date().toString()
        })
      }
    })
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   console.log('nextProps', nextProps, nextState)
  //    return false
  // }

  componentWillUnmount () {
    // UnSubscribe mqtt
    this.client && this.client.end(() => {
      console.log('Disconnect')
    })
  }

  BeginTraning () {
    this.setState({
      beginTraning: !this.state.BeginTraning
    })
    fetch(`${__QCA__}/aiModel/training`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': this.props.token
        },
        method: 'POST',
        body: JSON.stringify({'id': this.props.detail.id.toString()})
      }
    )
    .then(response => response.json())
    .then((data) => {
      console.log(data)
    })
    this.props.getModelInfo(this.props.detail.id)
  }

  stop () {
    const url = `${__QCA__}/aiModel/stop`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify({'id': this.props.detail.id.toString()})
    })
    .then(response => response.json())
    .then(data => {
      if (data.code === 200000) {
        OurToaster.show({message: '停止成功'})
      } else {
        OurToaster.show({message: '停止失败！'})
      }
    })
  }

  destory () {
    const url = `${__QCA__}/aiModel/destroy`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify({'id': this.props.detail.id.toString()})
    })
    .then(response => response.json())
    .then(data => {
      if (data.code === 200000) {
        OurToaster.show({message: '销毁成功'})
      } else {
        OurToaster.show({message: '销毁失败！'})
      }
    })
  }

  render () {
    console.log('state', this.state.status)
    return (
      <div className={classes['ModelTraining-container']}>
        <div className={classes['top']}>
          <div className={classes['top-left']}>
            <span className={classes.productGlass}>Model Traning: </span>
            <span className={`${classes.strong}`}>
              {this.props.detail.id}
            </span>
            {(() => {
              if (this.state.beginTraning === false) {
                return (
                  <button type='button' className={`${classes.rightTraning} pt-button pt-intent-primary`}
                    onClick={this.BeginTraning}>开始训练</button>
                )
              } else {
                return (
                  <div className={`${classes.rightTraning}`}>
                    <button type='button'
                      className={`pt-button pt-intent-primary ${classes.btn}`}
                      onClick={this.stop} >停止</button>
                    <button type='button'
                      className={`pt-button pt-intent-primary ${classes.btn}`}
                      onClick={this.destory}
                     >销毁</button>
                  </div>
                )
              }
            })()}
          </div>
        </div>
        <div className={classes['top']}>
          <div className={classes['top-left']}>
            <div className={classes.productGlass}>Training Progress </div>
          </div>
        </div>
        <div className={classes.progress}>
          <ModelTrainingProgress lossRate={this.state.lossRate} accuracy={this.state.accuracy} />
        </div>
        <div className={classes.content}>
          <div className={classes.left}>
            <div className={classes.strong}>State: {this.state.status}</div>
            <span className={classes.state}>{this.state.progress}%</span>
            <Spinner className={`pt-large pt-intent-primary ${classes.spinner}`} value={this.state.progress / 100} />
          </div>
          <div className={classes.center}>
            <div className={classes.strong}>Time</div>
            {new TextField('Initialized at：', this.props.detail.createTime).getRender()}
            {new TextField('Running at：', this.state.run).getRender()}
            {new TextField('Will Finish：', this.state.end).getRender()}
            {
              (this.props.modelTrainInfo !== undefined) ? (<div>
                <div className={classes.strong}>Hardware Usage</div>
                {new TextField('GPU：', this.props.modelTrainInfo.gpuName).getRender()}
                {new TextField('GPU Memory：', this.props.modelTrainInfo.gpuMemory).getRender()}
                {new TextField('GPU Utilization：', this.props.modelTrainInfo.gpuUsage).getRender()}
                {new TextField('Temperature：', this.props.modelTrainInfo.temp).getRender()}
              </div>) : <div />
            }
          </div>
        </div>
        {
          this.state.progress === 100 &&
          <div className={classes.complete}>
            <ModelTrainingComplete
              id={this.props.detail.id}
              getModelTrainResult={this.props.getModelTrainResult} />
          </div>
        }
      </div>
    )
  }
}

export default connect((state) => {
  return {
    token: state.auth.token,
    modelTrainInfo: state.ojs.modelTrainInfo
  }
})(ModelTraining)
