import { connect } from 'react-redux'
import {
  getDefectByLotId,
  getDefectByGlassId,
  resetDM,
  getEchartsLeftMenu,
  getHandlingPath,
  getEquipmentPort,
  getSTK,
  getFromTo,
  getTop5Data,
  getDefectDetail
} from '../modules/QCA'

import QCA from 'components/QCA'

const mapActionCreators = {
  getDefectByLotId,
  getDefectByGlassId,
  resetDM,
  getEchartsLeftMenu,
  getHandlingPath,
  getEquipmentPort,
  getSTK,
  getFromTo,
  getTop5Data,
  getDefectDetail
}

const mapStateToProps = (state) => ({
  qca: state.qca
})

export default connect(mapStateToProps, mapActionCreators)(QCA)
