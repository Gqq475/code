import React from 'react'
import classes from './SubNav.scss'

type Props = {
  params: Object,
  location: String
}
export class SubNav extends React.Component {
  props: Props;

  render () {
    return (
      <div className={classes['SubNav-container']}>
        <div>
          <ul className={`pt-breadcrumbs ${classes.breadcrumbs}`}>
            <li><span className={`pt-breadcrumb ${classes.breadcrumbs}`}>{_.HOME}</span></li>
            <li><span className={`pt-breadcrumb ${classes.breadcrumbs}`}>{this.props.location}</span></li>
            <li>
              <span className={`pt-breadcrumb pt-breadcrumb-current ${classes.currentPage}`}>
                {{
                  currentalarm: _.CURRENTALARM,
                  alarmhistory: _.ALARMHISTORY,
                  criteriamanager: _.CRITERIAMANAGER,
                  defectjudge: _.DEFECTJUDGE,
                  base: _.通用功能,
                  defectmap: _.DEFECTMAP,
                  stk: _.搬运路径共通性分析,
                  dashboard: _.DASHBOARD,
                  alarmrate: _.ALARMRATE,
                  defectrate: _.DEFECTRATE分析,
                  echarts: 'echarts制图试用',
                  autodefectjudge: _.AUTODEFECTJUDGE,
                  servicemanagement: _.SERVICEMANAGEMENT,
                  cpk: _.制程能力推移图,
                  spc: '平均值-全距管制图',
                  labelingtool: '标记工具',
                  modelversion: '模型管理',
                  modeltest: '模型检测',
                  modeltrain: '模型训练'
                }[this.props.params.path]}
              </span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default SubNav
