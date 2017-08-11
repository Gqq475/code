import { connect } from 'react-redux'
import {
  getAlarmHistoryByCondition,
  getAlarmDetailById,
  getDefectJudgeList,
  getDefectJudgeById,
  submitJudge,
  getCurrentAlarm,
  getCriteriaManagerList,
  getCriteriaManagerDetail,
  criteriaManagerUpdate,
  criteriaManagerAdd,
  collapseLeftLayout,
  getDefectDetailById
} from '../modules/DRTM'

import DRTM from 'components/DRTM'

const mapActionCreators = {
  getAlarmHistoryByCondition,
  getAlarmDetailById,
  getDefectJudgeList,
  getCriteriaManagerList,
  getCriteriaManagerDetail,
  getDefectJudgeById,
  submitJudge,
  getCurrentAlarm,
  criteriaManagerUpdate,
  criteriaManagerAdd,
  collapseLeftLayout,
  getDefectDetailById
}

const mapStateToProps = (state) => ({
  drtm: state.drtm,
  auth: state.auth
})
export default connect(mapStateToProps, mapActionCreators)(DRTM)
