import React from 'react'
import classes from './Echarts.scss'
import { TabList, TabPanel, Tabs, Tab } from '@blueprintjs/core'
import EchartsHandlingPath from 'components/EchartsHandlingPath'
import EchartsEquipmentPort from 'components/EchartsEquipmentPort'
import EchartsSTK from 'components/EchartsgSTK'
import EchartsGetFromTo from 'components/EchartsGetFromTo'

type Props = {
  data: Obejct,
  getHandlingPath: Fucntion,
  getEquipmentPort: Fucntion,
  getSTK: Fucntion,
  getFromTo: Fucntion
};

export class Echarts extends React.Component {
  props: Props;

  render () {
    return (
      <div className={classes['Echarts-container']}>
        <Tabs>
          <TabList>
            <Tab>搬运路径共通性分析</Tab>
            <Tab>设备端口共通性分析</Tab>
            <Tab>STK共通性分析</Tab>
            <Tab>起讫点共通性分析</Tab>
          </TabList>
          <TabPanel>
            <EchartsHandlingPath data={this.props.data} getHandlingPath={this.props.getHandlingPath} />
          </TabPanel>
          <TabPanel>
            <EchartsEquipmentPort data={this.props.data} getEquipmentPort={this.props.getEquipmentPort} />
          </TabPanel>
          <TabPanel>
            <EchartsSTK data={this.props.data} getSTK={this.props.getSTK} />
          </TabPanel>
          <TabPanel>
            <EchartsGetFromTo data={this.props.data} getFromTo={this.props.getFromTo} />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default Echarts
