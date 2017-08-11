import React from 'react'
import classes from './QCA.scss'
import DefectMap from 'components/DefectMap'
import STK from 'components/STK'
import Dashboard from 'components/Dashboard'
import Echarts from 'components/Echarts'

type Props = {
  params: Object
};

export class QCA extends React.Component {
  props: Props;

  render () {
    let path = this.props.params.path || 'defectmap'
    return (
      <div className={classes['DRTM-container']}>
        {
          (() => {
            switch (path) {
              case 'defectmap':
                return (<DefectMap data={this.props.qca}
                  resetDM={this.props.resetDM}
                  getDefectByLotId={this.props.getDefectByLotId}
                  getDefectByGlassId={this.props.getDefectByGlassId} />)
              case 'dashboard':
                return (<Dashboard />)
              case 'stk':
                return (<STK />)
              case 'echarts':
                return (<Echarts
                  data={this.props.qca}
                  getHandlingPath={this.props.getHandlingPath}
                  getEquipmentPort={this.props.getEquipmentPort}
                  getSTK={this.props.getSTK}
                  getFromTo={this.props.getFromTo}
                />)
              default:
                return null
            }
          })()
        }
      </div>
    )
  }
}

QCA.propTypes = {
  qca: React.PropTypes.object.isRequired,
  resetDM: React.PropTypes.func.isRequired,
  getDefectByLotId: React.PropTypes.func.isRequired,
  getDefectByGlassId: React.PropTypes.func.isRequired,
  getHandlingPath: React.PropTypes.func.isRequired,
  getEquipmentPort: React.PropTypes.func.isRequired,
  getSTK: React.PropTypes.func.isRequired,
  getFromTo: React.PropTypes.func.isRequired
}

export default QCA
