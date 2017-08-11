import { connect } from 'react-redux'
import {
  getAutoDefectJudgeListWithSearchState,
  getAutoDefectJudgeList,
  getAutoDefectJudgeById,
  autoSubmitJudge,
  getAutoDefectDetailById,
  getModel,
  getCreateService,
  getServiceDetail,
  getDefectCode,
  getLabelingToolImageList,
  getLabelingToolImageDefect,
  getDefectTypeList,
  addDefectType,
  getModelResultList,
  getModelTestFeed
} from '../modules/OJS'

import {
  createTrainModel,
  getModelInfo,
  getModelTrainResult,
  updateModelTrainList,
  getModelTrainAll
} from 'routes/OJS/modules/ModelTrain'

import {
  getTestResultType,
  getModelTestCount,
  getModelTestAll
} from 'routes/OJS/modules/ModelTest'

import OJS from 'components/OJS'

const mapActionCreators = {
  getAutoDefectJudgeListWithSearchState,
  getAutoDefectJudgeList,
  getAutoDefectJudgeById,
  autoSubmitJudge,
  getAutoDefectDetailById,
  getModel,
  getCreateService,
  getServiceDetail,
  getDefectCode,
  getLabelingToolImageList,
  getLabelingToolImageDefect,
  getDefectTypeList,
  addDefectType,
  getModelResultList,
  createTrainModel,
  getModelTestFeed,
  getModelInfo,
  getModelTrainResult,
  updateModelTrainList,
  getModelTrainAll,
  getTestResultType,
  getModelTestCount,
  getModelTestAll
}

const mapStateToProps = (state) => ({
  ojs: state.ojs
})

export default connect(mapStateToProps, mapActionCreators)(OJS)
