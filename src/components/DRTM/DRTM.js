import React from 'react'
import classes from './DRTM.scss'
import DefectJudge from 'components/DefectJudge'
import CriteriaManager from 'components/CriteriaManager'
import CurrentAlarm from 'components/CurrentAlarm'
import AlarmHistory from 'components/AlarmHistory'
import AlarmRate from 'components/AlarmRate'

type Props = {
  params: Object,
};
export class DRTM extends React.Component {
  props: Props

  render () {
    let path = this.props.params.path || 'currentalarm'
    return (
      <div className={classes['DRTM-container']}>
        {
          (() => {
            switch (path) {
              case 'defectjudge':
                return (<DefectJudge data={this.props.drtm}
                  getDefectJudgeById={this.props.getDefectJudgeById}
                  submitJudge={this.props.submitJudge}
                  getDefectDetailById={this.props.getDefectDetailById} />)
              case 'currentalarm':
                return (<CurrentAlarm data={this.props.drtm}
                  getCurrentAlarm={this.props.getCurrentAlarm} />)
              case 'alarmhistory':
                return (<AlarmHistory token={this.props.auth.token} data={this.props.drtm} />)
              case 'criteriamanager':
                return (<CriteriaManager
                  data={this.props.drtm}
                  getCriteriaManagerDetail={this.props.getCriteriaManagerDetail}
                  criteriaManagerUpdate={this.props.criteriaManagerUpdate}
                  criteriaManagerAdd={this.props.criteriaManagerAdd}
                  />)
              case 'alarmrate':
                return (<AlarmRate />)
              default:
            }
          })()
        }
      </div>
    )
  }
}

DRTM.propTypes = {
  auth: React.PropTypes.object.isRequired,
  drtm: React.PropTypes.object.isRequired,
  getCriteriaManagerDetail: React.PropTypes.func.isRequired,
  getDefectJudgeById: React.PropTypes.func.isRequired,
  submitJudge: React.PropTypes.func.isRequired,
  getCurrentAlarm: React.PropTypes.func.isRequired,
  criteriaManagerUpdate: React.PropTypes.func.isRequired,
  criteriaManagerAdd: React.PropTypes.func.isRequired,
  getDefectDetailById: React.PropTypes.func.isRequired
  // getAlarmDetailById: React.PropTypes.func.isRequired
}

export default DRTM
