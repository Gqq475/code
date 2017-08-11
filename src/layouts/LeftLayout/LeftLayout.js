import React, { PropTypes } from 'react'
import classes from './LeftLayout.scss'
import CurrentAlarmFilter from 'components/CurrentAlarmFilter'
import AlarmHistoryFilter from 'components/AlarmHistoryFilter'
import CriteriaManagerFilter from 'components/CriteriaManagerFilter'
import DefactJudgeFilter from 'components/DefactJudgeFilter'
import AutoDefectJudgeFilter from 'components/AutoDefectJudgeFilter'
import OJSFilter from 'components/OJSFilter'
import QCAFilter from 'components/QCAFilter'
import DRTMFilter from 'components/DRTMFilter'
import StkFilter from 'components/StkFilter'
import DefectmapFilter from 'components/DefectmapFilter'
import EchartsFilter from 'components/EchartsFilter'
import ModelVersionFilter from 'components/ModelVersionFilter'
import LabelingToolFilter from 'components/LabelingToolFilter'
import ModelTestFilter from 'components/ModelTestFilter'
import ModelTrainFilter from 'components/ModelTrainFilter'
import { connect } from 'react-redux'
import {
  getLots,
  getGlasses,
  getEchartsLeftMenu,
  getHandlingPath,
  getEquipmentPort,
  getSTK,
  getFromTo,
  getTop5Data,
  getDefectDetail
} from 'routes/QCA/modules/QCA'
import {
  getDefectJudgeList,
  getCriteriaManagerList,
  getAlarmHistoryByCondition,
  collapseLeftLayout
} from 'routes/DRTM/modules/DRTM'
import {
  getAutoDefectJudgeListWithSearchState,
  getAutoDefectJudgeList,
  getDefectCode,
  getModelList
} from 'routes/OJS/modules/OJS'

import {
  getModelTrainList
} from 'routes/OJS/modules/ModelTrain'

const mapActionCreators = {
  getLots,
  getGlasses,
  getDefectJudgeList,
  getCriteriaManagerList,
  getAlarmHistoryByCondition,
  collapseLeftLayout,
  getEchartsLeftMenu,
  getHandlingPath,
  getEquipmentPort,
  getSTK,
  getFromTo,
  getAutoDefectJudgeListWithSearchState,
  getAutoDefectJudgeList,
  getTop5Data,
  getDefectDetail,
  getDefectCode,
  getModelList,
  getModelTrainList
}

const mapStateToProps = (state) => ({
  drtm: state.drtm,
  qca: state.qca,
  ojs: state.ojs
})

export class LeftLayout extends React.Component {
  constructor (props) {
    super(props)
    this.expand = this.expand.bind(this)
  }

  expand () {
    if (this.props.drtm.leftLayoutCollapse) {
      this.props.collapseLeftLayout()
    }
  }

  render () {
    let props = this.props
    let collapse = props.drtm.leftLayoutCollapse
    return (
      <div className={`${classes['left-layout']} ${collapse ? classes.collapse : classes.expand}`}
        >
        <button className={`pt-button pt-minimal ${collapse ? 'pt-icon-arrow-right' : 'pt-icon-arrow-left'}
          ${classes.collapseBtn}`}
          onClick={collapse ? this.expand : props.collapseLeftLayout} />
        {(() => {
          switch (props.params.path || props.route.path) {
            case 'currentalarm':
              return (<CurrentAlarmFilter />)
            case 'alarmhistory':
              return (<AlarmHistoryFilter getAlarmHistoryByCondition={props.getAlarmHistoryByCondition} />)
            case 'criteriamanager':
              return (<CriteriaManagerFilter
                getCriteriaManagerList={props.getCriteriaManagerList}
            />)
            case 'defectjudge':
              return (<DefactJudgeFilter getDefectJudgeList={props.getDefectJudgeList} />)
            case 'stk':
              return (<StkFilter />)
            case 'defectmap':
              return (<DefectmapFilter getLots={props.getLots} getGlasses={props.getGlasses} />)
            case 'autodefectjudge':
              return (
                <AutoDefectJudgeFilter
                  getAutoDefectJudgeListWithSearchState={props.getAutoDefectJudgeListWithSearchState}
                  getDefectCode={props.getDefectCode}
                  data={props.ojs}
                />)
            case 'qca(/:path)':
              return (<QCAFilter />)
            case 'drtm(/:path)':
              return (<DRTMFilter />)
            case 'ojs(/:path)':
              return (<OJSFilter />)
            case 'echarts':
              return (<EchartsFilter
                data={props.qca}
                getEchartsLeftMenu={props.getEchartsLeftMenu}
                getHandlingPath={props.getHandlingPath}
                getEquipmentPort={props.getEquipmentPort}
                getSTK={props.getSTK}
                getFromTo={props.getFromTo}
                    />)
            case 'modelversion':
              return (<ModelVersionFilter
                data={props.qca}
                getModelList={props.getModelList} />)
            case 'modeltest':
              return (<ModelTestFilter
                getModelList={props.getModelList}
                data={props.ojs} />)
            case 'labelingtool':
              return (<LabelingToolFilter />)
            case 'modeltrain':
              return (<ModelTrainFilter
                getModelTrainList={props.getModelTrainList}
                />)
            default:
              return null
          }
        })()}
      </div>
    )
  }
}

LeftLayout.propTypes = {
  collapseLeftLayout: PropTypes.func,
  drtm: PropTypes.object
}

export default connect(mapStateToProps, mapActionCreators)(LeftLayout)
