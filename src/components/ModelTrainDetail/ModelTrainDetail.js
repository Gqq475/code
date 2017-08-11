import React from 'react'
import classes from './ModelTrainDetail.scss'
import ModelTrainEditDialog from './ModelTrainEditDialog'
import ModelTrainedDetail from '../ModelTrainedDetail/ModelTrainedDetail'
import ModelTestedDetail from '../ModelTestedDetail/ModelTestedDetail'
import ModelTraining from 'components/ModelTraining'
import { connect } from 'react-redux'
import { assign, isEmpty } from 'lodash'

type Props = {
  data: Object,
  trainingDetail: Boolean,
  testingDetail: Boolean,
  changeState: Function,
  detailData: Object,
  updateModelTrainList: Function,
  getModelTrainAll: Function,
  getModelInfo: Function,
  getModelTrainResult: Function,
  modelTestAll: Object,
  modelTrainAll: Object,
  modelTrainInfo: Object,
  modelTrainResultChart: Object,
  modelResultList: Object,
  getTestResultType: Function,
  getModelTestCount: Function,
  getModelResultList: Function,
  getModelTestAll: Function
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

export class ModelTrainDetail extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      startTrainingPage: false,
      isEditOpen: false,
      trainingDetail: this.props.trainingDetail,
      testingDetail: this.props.testingDetail
    }
    this.toggleDialog = this.toggleDialog.bind(this)
    this.training = this.training.bind(this)
    this.testing = this.testing.bind(this)
  }

  toggleDialog (state) {
    this.setState({
      isEditOpen: !this.state.isEditOpen
    })
  }

  training () {
    if (!isEmpty(this.props.data.modelTrainAll)) {
      this.setState(assign({}, this.state, {
        startTrainingPage: false,
        trainingDetail: !this.props.trainingDetail,
        testingDetail: false
      }))
      this.props.changeState(true, false)
      this.props.getModelTrainAll(this.props.detailData.id)
      this.props.getModelInfo(this.props.detailData.id)
      this.props.getModelTrainResult(this.props.detailData.id)
    } else {
      this.setState(assign({}, this.state, {
        startTrainingPage: true,
        trainingDetail: !this.props.trainingDetail,
        testingDetail: false
      }))
      this.props.changeState(true, false)
    }
  }

  testing () {
    this.setState(assign({}, this.state, {
      testingDetail: !this.props.testingDetail,
      trainingDetail: false
    }))
    this.props.changeState(false, true)
    this.props.getTestResultType(this.props.detailData.id)
    this.props.getModelTestAll(this.props.detailData.id)
    this.props.getModelResultList(this.props.detailData.id)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      trainingDetail: nextProps.trainingDetail,
      testingDetail: nextProps.testingDetail
    })
  }
  render () {
    if (this.props.detailData.id === undefined) {
      return <div />
    } else if (this.state.trainingDetail === true && this.state.testingDetail === false) {
      if (this.state.startTrainingPage === false) {
        return (<ModelTrainedDetail id={this.props.detailData.id}
          createTime={this.props.detailData.createTime}
          modelTrainResultChart={this.props.modelTrainResultChart}
          modelTrainInfo={this.props.modelTrainInfo}
          modelTrainAll={this.props.modelTrainAll} />)
      } else {
        return (
          <ModelTraining
            getModelInfo={this.props.getModelInfo}
            getModelTrainResult={this.props.getModelTrainResult}
            detail={this.props.detailData}
            data={this.props.data} />
        )
      }
    } else if (this.state.testingDetail === true && this.state.trainingDetail === false) {
      return (
        <ModelTestedDetail
          id={this.props.detailData.id}
          data={this.props.data}
          modelTestAll={this.props.modelTestAll}
          modelResultList={this.props.modelResultList}
          getModelTestCount={this.props.getModelTestCount}
          dataDetail={this.props.detailData} />
      )
    } else if (this.state.trainingDetail === false && this.state.testingDetail === false) {
      return (
        <div className={classes['ModelTrainDetail-container']}>
          <div className={classes['top']}>
            <div className={classes['top-left']}>
              <span className={classes.productGlass}>Detail Information: </span>
              <span className={`${classes.strong}`}>
                {this.props.detailData.name}
              </span>
            </div>
            <div className={classes['top-left']}>
              <span className={classes.productGlass}>Submitted : </span>
              <span className={`${classes.strong}`}>
                {this.props.detailData.createTime}
              </span>
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.left}>
              <div className={classes.property}>Property</div>
              <div style={{marginLeft: '8%'}}>
                {new TextField('产品：', this.props.detailData.productCode || '').getRender()}
                {new TextField('站点：', this.props.detailData.operationCode || '').getRender()}
                {new TextField('线别：', this.props.detailData.lineCode || '').getRender()}
                {new TextField('机台：', this.props.detailData.eqCode || '').getRender()}
                <button onClick={this.toggleDialog} className={`pt-button pt-intent-primary ${classes.btn}`}>
                  修改
                </button>
              </div>
              <ModelTrainEditDialog
                id={this.props.detailData.id}
                updateModelTrainList={this.props.updateModelTrainList}
                isOpen={this.state.isEditOpen}
                toggleDialog={this.toggleDialog}
                operation={this.props.detailData.operationCode}
                lineID={this.props.detailData.lineCode}
                subEntity={this.props.detailData.eqCode}
                product={this.props.detailData.productCode} />
            </div>
            <div className={classes.center}>
              <div className={classes.property}>Detail</div>
              <div className={classes.time}>
                <div>
                  {new TextField('模型建立时间：', '').getRender()}
                  {new TextField('训练起始时间：').getRender()}
                  {new TextField('训练结束时间：').getRender()}
                  {new TextField('训练进度：').getRender()}
                </div>
                <button className={`pt-button pt-intent-primary ${classes.btndetail}`}
                  onClick={this.training}>
                  训练详情
                </button>
              </div>
              <div className={classes.time}>
                <div style={{marginTop: '10px'}}>
                  {new TextField('测试起始时间：').getRender()}
                  {new TextField('测试结束时间：').getRender()}
                  {new TextField('测试进度：').getRender()}
                </div>
                <button className={`pt-button pt-intent-primary ${classes.btndetail2}`}
                  onClick={this.testing}>
                  测试详情
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default connect((state) => {
  return {
    modelTrainAll: state.ojs.modelTrainAll,
    modelTestAll: state.ojs.modelTestAll,
    modelTrainInfo: state.ojs.modelTrainInfo,
    modelTrainResultChart: state.ojs.modelTrainResultChart,
    modelResultList: state.ojs.modelResultList
  }
})(ModelTrainDetail)
