import React from 'react'
import classes from './DefectCodeTabs.scss'
import { TabList, TabPanel, Tabs, Tab } from '@blueprintjs/core'

type Props = {
  handleSelectCode: Function
};
export class DefectCodeTabs extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (id) {
    return () => {
      this.props.handleSelectCode(id)
    }
  }

  render () {
    let def = [
      [
        ['TNPPR0', 'PH责PR残留']
      ],
      [
        ['TNWPR0', 'WET责PR残留'],
        ['TNPLR0', 'PH责LS残留'],
        ['TNSLR0', 'PVD责LS残留']
      ],
      [
        ['TNPLR0', 'PH责LS残留'],
        ['TNWLR0', 'WET责LS残留'],
        ['TNCSR0', 'Poly部责P-Si残留-key'],
        ['TNPSR0', 'PH责 P-Si残留-key'],
        ['TNPSR1', 'PH责 P-Si残留']
      ],
      [
        ['TNSGR0', 'PVD责 Gate残留-key'],
        ['TNSGR1', 'PVD责 Gate残留'],
        ['TNPGR0', 'PH责 Gate残留-key']
      ],
      [
        ['TNPGR0', 'PH责 Gate残留-key'],
        ['TNPGR1', 'PH责 Gate残留'],
        ['TNDGR0', 'DRY责 Gate残留-key'],
        ['TNDGR1', 'DRY责 Gate残留']
      ],
      [
        ['TNSDR0', 'PVD责 SD残留-key'],
        ['TNWPR0', 'WET责PR残留'],
        ['TNSDR1', 'PVD责 SD残留'],
        ['TNPDR0', 'PH责 SD残留-key']
      ]
    ]
    return (
      <div className={classes['DefectCodeTabs-container']}>
        <Tabs
          key={'vertical'}>
          <TabList className={classes.tabs}>
            <Tab>Unpack</Tab>
            <Tab>LS</Tab>
            <Tab>3L</Tab>
            <Tab>NCD</Tab>
            <Tab>NP</Tab>
            <Tab>GE</Tab>
          </TabList>
          {
            def.map((t, i) => {
              return (
                <TabPanel className={classes.tabPanels} key={i}>
                  {
                    t.map((l, j) => {
                      return (
                        <div key={j}
                          className={`${classes.panel}`}
                          onClick={this.handleClick(l[0])}>
                          <span>{l[0]}</span>
                          <span>{l[1]}</span>
                        </div>
                      )
                    })
                  }
                </TabPanel>
              )
            })
          }
        </Tabs>
      </div>
    )
  }
}

export default DefectCodeTabs
