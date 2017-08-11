import React from 'react'
import classes from './DefectMap.scss'
import { TabList, TabPanel, Tabs, Tab } from '@blueprintjs/core'
import ByLotPanel from 'components/ByLotPanel'
import ByGlassPanel from 'components/ByGlassPanel'
import LoadingContainer from 'components/LoadingContainer'

const SCROLL_BAR_VISIBLE = 'visible'
const SCROLL_BAR_HIDDEN = 'hidden'

type Props = {
  data: Obejct,
  resetDM: Function,
  getDefectByLotId: Function,
  getDefectByGlassId: Function
};

export class DefectMap extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.ss_g = true
    this.ss_l = true
    this.toggleSS = this.toggleSS.bind(this)
    this.accessSS = this.accessSS.bind(this)
  }

  toggleSS (isLot, isSS) {
    if (isLot) {
      this.ss_l = isSS
    } else {
      this.ss_g = isSS
    }
  }

  accessSS (isLot) {
    if (isLot) {
      return this.ss_l
    } else {
      return this.ss_g
    }
  }

  componentDidUpdate () {
    if (this.props.data.dmloading) {
      document.body.style.overflow = SCROLL_BAR_HIDDEN
    } else {
      document.body.style.overflow = SCROLL_BAR_VISIBLE
    }
  }

  componentWillUnmount () {
    document.body.style.overflow = SCROLL_BAR_VISIBLE
  }

  render () {
    return (
      <div className={classes['DefectMap-container']}>
        {this.props.data.dmloading && <LoadingContainer />}
        <Tabs>
          <TabList>
            <Tab>ByGlass</Tab>
            <Tab>ByLot</Tab>
          </TabList>
          <TabPanel>
            <ByGlassPanel
              data={this.props.data}
              accessSS={this.accessSS}
              toggleSS={this.toggleSS}
              reloadAGgrid={this.props.data.reloadAGgrid}
              resetDM={this.props.resetDM}
              getDefectByGlassId={this.props.getDefectByGlassId} />
          </TabPanel>
          <TabPanel>
            <ByLotPanel
              data={this.props.data}
              accessSS={this.accessSS}
              toggleSS={this.toggleSS}
              reloadAGgrid={this.props.data.reloadAGgrid}
              resetDM={this.props.resetDM}
              getDefectByLotId={this.props.getDefectByLotId} />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default DefectMap
