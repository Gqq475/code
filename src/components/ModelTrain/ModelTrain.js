import React from 'react'
import classes from './ModelTrain.scss'
import ModelTrainList from 'components/ModelTrainList'
import ModelTrainDetail from 'components/ModelTrainDetail'
import CreateModelDialog from 'components/CreateModelDialog'
import { assign, findIndex } from 'lodash'

type Props = {
  data: Object,
  createTrainModel: Function,
  getModelInfo: Function,
  getModelTrainResult: Function,
  updateModelTrainList: Function,
  getModelTrainAll: Function,
  getTestResultType: Function,
  getModelTestCount: Function,
  getModelResultList: Function,
  getModelTestAll: Function
};

export class ModelTrain extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      detailData: {},
      isOpen: false,
      isBeginTraning: false,
      trainingDetail: false,
      testingDetail: false,
      trainStatus: ''
    }
    this.setDetail = this.setDetail.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
    this.changeState = this.changeState.bind(this)
  }

  toggleDialog () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  setDetail (data, trainingDetail, testingDetail) {
    this.setState(assign({}, this.state, {
      detailData: data,
      isBeginTraning: false,
      trainingDetail: trainingDetail,
      testingDetail: testingDetail
    }))
  }
  changeState (trainingDetail, testingDetail) {
    this.setState({
      trainingDetail: trainingDetail,
      testingDetail: testingDetail
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.detailData.id) {
      let index = findIndex(nextProps.data.modelTrainList, ['id', this.state.detailData.id])
      this.setState(assign({}, this.state, {
        detailData: nextProps.data.modelTrainList[index]
      }))
    }
  }

  render () {
    return (
      <div className={classes['ModelTrain-container']}>
        <section className={`${classes.title} ${classes.clear}`}>
          <h4 className={`${classes.left}`}>模型列表
            <button type='button' onClick={this.toggleDialog}
              className={`${classes.ml10} pt-button pt-intent-primary pt-icon-plus`} />
            {
              this.state.isOpen
              ? <CreateModelDialog
                isOpen={this.state.isOpen}
                toggleDialog={this.toggleDialog}
                createTrainModel={this.props.createTrainModel}
                />
              : null
            }
          </h4>
        </section>
        <ModelTrainList
          getModelTrainAll={this.props.getModelTrainAll}
          trainingDetail={this.state.trainingDetail}
          testingDetail={this.state.testingDetail}
          setDetail={this.setDetail} />
        {
          <ModelTrainDetail
            trainingDetail={this.state.trainingDetail}
            testingDetail={this.state.testingDetail}
            changeState={this.changeState}
            getModelTestAll={this.props.getModelTestAll}
            updateModelTrainList={this.props.updateModelTrainList}
            getModelTrainAll={this.props.getModelTrainAll}
            getModelInfo={this.props.getModelInfo}
            getModelTrainResult={this.props.getModelTrainResult}
            getModelResultList={this.props.getModelResultList}
            getTestResultType={this.props.getTestResultType}
            getModelTestCount={this.props.getModelTestCount}
            data={this.props.data}
            detailData={this.state.detailData} />
        }
      </div>
    )
  }
}

export default ModelTrain
