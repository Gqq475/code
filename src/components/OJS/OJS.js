import React from 'react'
import classes from './OJS.scss'
import AutoDefectJudge from 'components/AutoDefectJudge'
import ServiceManagement from 'components/ServiceManagement'
import ModelVersion from 'components/ModelVersion'
import LabelingTool from 'components/LabelingTool'
import ModelTest from 'components/ModelTest'
import ModelTrain from 'components/ModelTrain'

type Props = {
  params: Object,
};
export class OJS extends React.Component {
  props: Props

  render () {
    let path = this.props.params.path || 'autodefectjudge'
    return (
      <div className={classes['OJS-container']}>
        {
          (() => {
            switch (path) {
              case 'autodefectjudge':
                return (<AutoDefectJudge data={this.props.ojs}
                  getAutoDefectJudgeById={this.props.getAutoDefectJudgeById}
                  autoSubmitJudge={this.props.autoSubmitJudge}
                  getAutoDefectDetailById={this.props.getAutoDefectDetailById}
                  getDefectCode={this.props.getDefectCode}
                  getAutoDefectJudgeList={this.props.getAutoDefectJudgeList} />)
              case 'servicemanagement':
                return (<ServiceManagement
                  data={this.props.ojs}
                  getModel={this.props.getModel}
                  getCreateService={this.props.getCreateService}
                  getServiceDetail={this.props.getServiceDetail}
                />)
              case 'modelversion':
                return (<ModelVersion
                  data={this.props.ojs}
                  getModel={this.props.getModel}
                  getCreateService={this.props.getCreateService}
                  getServiceDetail={this.props.getServiceDetail}
                />)
              case 'labelingtool':
                return (<LabelingTool data={this.props.ojs}
                  getLabelingToolImageList={this.props.getLabelingToolImageList}
                  getLabelingToolImageDefect={this.props.getLabelingToolImageDefect}
                  getDefectTypeList={this.props.getDefectTypeList}
                  addDefectType={this.props.addDefectType}
                />)
              case 'modeltest':
                return (<ModelTest
                  data={this.props.ojs}
                  getModelResultList={this.props.getModelResultList}
                  getModelTestFeed={this.props.getModelTestFeed}
                />)
              case 'modeltrain':
                return (<ModelTrain data={this.props.ojs}
                  getModelInfo={this.props.getModelInfo}
                  getModelTestAll={this.props.getModelTestAll}
                  updateModelTrainList={this.props.updateModelTrainList}
                  getModelTrainAll={this.props.getModelTrainAll}
                  getModelTrainResult={this.props.getModelTrainResult}
                  getModelResultList={this.props.getModelResultList}
                  getTestResultType={this.props.getTestResultType}
                  getModelTestCount={this.props.getModelTestCount}
                  createTrainModel={this.props.createTrainModel} />)
              default:
            }
          })()
        }
      </div>
    )
  }
}

OJS.propTypes = {
  ojs: React.PropTypes.object.isRequired,
  getAutoDefectJudgeList: React.PropTypes.func.isRequired,
  getAutoDefectJudgeById: React.PropTypes.func.isRequired,
  autoSubmitJudge: React.PropTypes.func.isRequired,
  getAutoDefectDetailById: React.PropTypes.func.isRequired,
  getModel: React.PropTypes.func.isRequired,
  getCreateService: React.PropTypes.func.isRequired,
  getServiceDetail: React.PropTypes.func.isRequired,
  getDefectCode: React.PropTypes.func.isRequired,
  getLabelingToolImageList: React.PropTypes.func.isRequired,
  getLabelingToolImageDefect: React.PropTypes.func.isRequired,
  getDefectTypeList: React.PropTypes.func.isRequired,
  addDefectType: React.PropTypes.func.isRequired,
  getModelResultList: React.PropTypes.func.isRequired,
  createTrainModel: React.PropTypes.func.isRequired,
  getModelTestFeed: React.PropTypes.func.isRequired,
  getModelInfo: React.PropTypes.func.isRequired,
  getModelTrainResult: React.PropTypes.func.isRequired,
  updateModelTrainList: React.PropTypes.func.isRequired,
  getModelTrainAll: React.PropTypes.func.isRequired,
  getModelTestCount: React.PropTypes.func.isRequired,
  getTestResultType: React.PropTypes.func.isRequired,
  getModelTestAll: React.PropTypes.func.isRequired
}

export default OJS
