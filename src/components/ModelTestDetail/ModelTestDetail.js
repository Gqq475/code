import React from 'react'
import classes from './ModelTestDetail.scss'
import { Button, Spinner } from '@blueprintjs/core'
import ModelTestResultList from 'components/ModelTestDetail/ModelTestResultList'
import TestResult from 'components/TestResult'
import Mqtt from 'mqtt'
import { isEmpty } from 'lodash'
import OurToaster from 'components/OurToaster'
import { connect } from 'react-redux'

type Props = {
  token: String,
  dataDetail: Object,
  getModelResultList: Function,
  getModelTestFeed: Function,
  modelResultType: Object
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

export class ModelTestDetail extends React.Component {
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
    this.inputChange = this.inputChange.bind(this)
    this.onStart = this.onStart.bind(this)
    this.destory = this.destory.bind(this)
  }

  inputChange (e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  onStart () {
    let self = this
    let client
    let obj = {
      id: this.props.dataDetail.id.toString(),
      imagePath: this.state.inputValue
    }
    this.props.getModelTestFeed(obj)
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
    client.on('connect', function () {
      client.subscribe('autojudge/1/agent')
      self.start = new Date().toString()
      // client.publish('autojudge/1/device', 'Hello mqtt')
    })

    client.on('message', function (topic, message) {
      console.log('topic', topic, message.toString())
      // message is Buffer
      let msgArray = JSON.parse(message.toString())
      if (msgArray.cmd === 'judge_progress') {
        self.setState({
          progress: msgArray.custom.percent * 100,
          run: msgArray.timestamp,
          status: 'in_progress'
        })
      }
      if (msgArray.cmd === 'status') {
        self.setState({
          status: msgArray.custom.status
        })
      }
      if (msgArray.custom.percent === '1.00') {
        self.end = new Date().toString()
      }
      console.log(self.state.progress)
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
      body: JSON.stringify({'id': this.props.dataDetail.id.toString()})
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

  componentWillUnmount () {
    // UnSubscribe mqtt
    this.client && this.client.end(() => {
      console.log('Disconnect')
    })
  }

  render () {
    return (<div className={classes['ModelTestDetail-container']}>
      {
        (isEmpty(this.props.dataDetail)) ? null : (
          <div style={{position: 'relative',
            border: '2px solid #d7d7d7',
            borderRadius: '4px',
            padding: '30px 50px',
            margin: '30px 0'}}>
            <div style={{margin: '50px 10px', fontSize: '16px'}}>
              <span>检测缺陷图片:</span>
              <input
                className='pt-input'
                style={{marginLeft: '20px', width: '50%'}}
                type='text'
                onChange={this.inputChange}
              />
              <Button className={`pt-intent-primary ${classes.btn}`}
                disabled='true'
                style={{marginLeft: '20px'}}>
                打开
              </Button>
              <Button className={`pt-intent-primary`}
                style={{marginLeft: '20px'}}
                onClick={this.onStart}>
                开始检测
              </Button>
            </div>
            <div className={classes['top']}>
              <div className={classes['top-left']}>
                <span className={classes.productGlass}>模型检测: </span>
                <span className={`${classes.strong}`}>
                  {this.props.dataDetail.name}
                </span>
              </div>
              <div className={classes['rightTraning']}>
                <button type='button'
                  className={`pt-button pt-intent-primary ${classes.btn}`}
                  onClick={this.destory} >销毁</button>
              </div>
            </div>
            <div className={classes.content}>
              <div className={classes.center}>
                <div className={classes.time}>
                  <div className={classes.strong}>状态: {this.state.status}</div>
                  <div className={classes.strong}>时间</div>
                  {new TextField('初始时间：', this.start).getRender()}
                  {new TextField('运行时间：', this.state.run).getRender()}
                  {new TextField('结束时间：', this.end).getRender()}
                </div>
                <div className={classes.left}>
                  <span className={classes.state}>{this.state.progress}%</span>
                  <Spinner className={`pt-large pt-intent-primary ${classes.spinner}`}
                    value={this.state.progress / 100} />
                </div>
              </div>
            </div>
            {
              this.state.progress === 100 &&
              <div>
                {
                  <ModelTestResultList
                    id={this.props.dataDetail.id}
                    data={this.props.data.modelResultList}
                    getModelResultList={this.props.getModelResultList} />
                }
                {
                  <TestResult
                    id={this.props.dataDetail.id}
                    modelResultType={this.props.modelResultType}
                    />
                }
              </div>
            }
          </div>
        )
      }
    </div>)
  }
}

export default connect((state) => {
  return {
    token: state.auth.token,
    modelResultType: state.modelTesting.modelResultType
  }
})(ModelTestDetail)
