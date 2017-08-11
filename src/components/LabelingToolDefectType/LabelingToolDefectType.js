import React from 'react'
import classes from './LabelingToolDefectType.scss'
import { TabList, TabPanel, Tabs, Tab } from '@blueprintjs/core'
import DefectType from './DefectType'
import { isEmpty } from 'lodash'

type Props = {
  data: Object,
  getDefectTypeList: Function,
  isDialog: Boolean
};
export class LabelingToolDefectType extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      TFT: {},
      CF: {},
      Cell: {},
      Module: {}
    }
  }

  componentWillMount () {
    this.props.getDefectTypeList()
  }

  render () {
    return (
      <div className={classes['LabelingToolDefectType-container']}>
        {
          !isEmpty(this.props.data.defectTypeList) &&
            <Tabs key={'vertical'}>
              <TabList className={classes.tabs}>
                <Tab>TFT</Tab>
                <Tab>CF</Tab>
                <Tab>Cell</Tab>
                <Tab>Module</Tab>
              </TabList>
              <TabPanel className={classes.twoTab}>
                <DefectType
                  isDialog={this.props.isDialog}
                  data={this.props.data.defectTypeList.TFT} />
              </TabPanel>
              <TabPanel className={classes.twoTab}>
                <DefectType
                  isDialog={this.props.isDialog}
                  data={this.props.data.defectTypeList.CF} />
              </TabPanel>
              <TabPanel className={classes.twoTab}>
                <DefectType
                  isDialog={this.props.isDialog}
                  data={this.props.data.defectTypeList.Cell} />
              </TabPanel>
              <TabPanel className={classes.twoTab}>
                <DefectType
                  isDialog={this.props.isDialog}
                  data={this.props.data.defectTypeList.Module} />
              </TabPanel>
            </Tabs>
        }
      </div>
    )
  }
}

export default LabelingToolDefectType
