import React from 'react'
import classes from './CriteriaManagerZone.scss'
import { Tabs, Tab, TabList, TabPanel, Checkbox } from '@blueprintjs/core'

type Props = {
  data: Object
};

export class DetailCenter extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDefectClick = this.handleDefectClick.bind(this)
    this.state = {
      qualityJson: {
        totalDefect: true,
        defectSize: false
      }
    }
  }

  handleDefectClick () {
  }

  handleChange () {
  }

  render () {
    let { data } = this.props

    const defectSize = ['SS', 'S', 'M', 'L', 'O']

    return (
      <div className={classes['center-container']}>
        <section className={classes.title}>2. Condition</section>
        <label className='pt-label pt-inline'>
          OOC
          <input className='pt-input'
            defaultValue={data.ooc}
            onChange={this.handleChange('OOC')} />
        </label>
        <label className='pt-label pt-inline'>
          OOS
          <input className='pt-input'
            defaultValue={data.oos}
            onChange={this.handleChange('OOS')} />
        </label>
        <Tabs>
          <TabList>
            <Tab>Defect</Tab>
            <Tab isDisabled={!false}>Burr</Tab>
            <Tab isDisabled={!false}>NG/RW Rate</Tab>
            <Tab isDisabled={!false}>LOI</Tab>
            <Tab isDisabled={!false}>CCD</Tab>
          </TabList>
          <TabPanel>
            <div className='pt-select'>
              <select>
                <option value='1'>扫边</option>
                <option value='2'>Common defect</option>
                <option value='3'>Cluster defect</option>
                <option value='4'>Mask defect</option>
                <option value='5'>定制化条件</option>
              </select>
            </div>
            <div className={classes['total-defect']}>
              <Checkbox
                defaultChecked={this.state.qualityJson.totalDefect}
                onChange={this.handleDefectClick('totalDefect')}>
                Total defect
              </Checkbox>
              <ul className={classes.ul}>
                <li className={classes['defect-size']}>
                  <Checkbox
                    defaultChecked={this.state.qualityJson.defectSize}
                    disabled={!this.state.qualityJson.totalDefect}
                    onChange={this.handleDefectClick('defectSize')}>
                    Defect size
                  </Checkbox>
                  <ul className={classes['ul']}>
                    {
                      defectSize.map((s, i) =>
                        <Checkbox
                          key={i}
                          className={`pt-inline ${classes['checkbox-group']}`}
                          disabled={!this.state.qualityJson.totalDefect}
                          defaultChecked={this.state.qualityJson[s]}
                          onChange={this.handleDefectClick(s)}>
                          {s}
                        </Checkbox>)
                    }
                  </ul>
                </li>
                <li>
                  <label className='pt-label'>
                    <Checkbox
                      disabled={!this.state.qualityJson.totalDefect}
                      checked={this.state.qualityJson.defectCode}
                      onChange={this.handleDefectClick('defectCode')}>
                      Defect Code (用逗号分隔)
                    </Checkbox>
                    <input
                      className='pt-input'
                      disabled={!this.state.qualityJson.totalDefect}
                      defaultValue={this.state.qualityJson.defectCodeValue}
                      onChange={this.handleDefectClick('defectCodeValue')} />
                  </label>
                </li>
                <li>
                  <label className='pt-label'>
                    <Checkbox
                      disabled={!this.state.qualityJson.totalDefect}
                      checked={this.state.qualityJson.judegDefectCode}
                      onChange={this.handleDefectClick('judegDefectCode')}>
                      Judge defect Code (用逗号分隔)
                    </Checkbox>
                    <input
                      className='pt-input'
                      disabled={!this.state.qualityJson.totalDefect ||
                        !this.state.qualityJson.judegDefectCode}
                      defaultValue={this.state.qualityJson.judegDefectCodeValue}
                      onChange={this.handleDefectClick('judegDefectCodeValue')} />
                  </label>
                </li>
              </ul>
            </div>
          </TabPanel>
          <TabPanel />
          <TabPanel />
          <TabPanel />
          <TabPanel />
        </Tabs>
      </div>
    )
  }
}

export default DetailCenter
