import React from 'react'
import classes from './CriteriaManagerZone.scss'
import { Switch, Slider, Button } from '@blueprintjs/core'
import Left from './DetailLeft'
import Center from './DetailCenter'
import Right from './DetailRight'

type Props = {
  data: Object
};

export class CriteriaManagerZone extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSliderChange = this.handleSliderChange.bind(this)
    this.handleEnabledChange = this.handleEnabledChange.bind(this)
    this.state = {
      alarmLevel: 3
    }
  }

  handleChange (type, e) {
    // const { pageDetail } = this.state
    // console.log('pageDetail', e.target.value)
    // pageDetail[type] = e.target.value
    // console.log(pageDetail)
    // this.setState = {
    //   pageDetail: pageDetail
    // }
  }

  handleEnabledChange () {
    // const { pageDetail } = this.state
    // pageDetail['enabled'] = !pageDetail['enabled']
    // this.setState({
    //   pageDetail: pageDetail
    // })
  }

  handleSliderChange (value) {
    this.setState({ alarmLevel: value })
  }

  render () {
    let { data } = this.props
    return (
      <div className={classes['CriteriaManagerZone-container']}>
        <span className={classes['header']}>
          <div className={classes.info}>
            <span>规则详情</span>
            <strong>ID {data.id}</strong>
          </div>
          <div>
            <Button className='pt-intent-primary'
              onClick={this.handleEditChange}>编辑</Button>
          </div>
        </span>
        <section className={classes.top}>
          <div className={classes['enabled-container']}>
            <Switch className='pt-large'
              label='启用'
              defaultChecked={data ? data.enabled : false}
              onChange={this.handleEnabledChange} />
          </div>
          <div className={classes['slider-container']}>
            <span>{_.ALARMLEVEL} </span>
            <Slider
              min={1}
              max={9}
              labelStepSize={1}
              onChange={this.handleSliderChange}
              value={this.state.alarmLevel} />
          </div>
          <div className={classes['alarmAmount']}>
            <strong>10</strong> 告警
          </div>
        </section>
        <div className={classes.content}>
          <Left data={data} />
          <Center data={data} />
          <Right data={data} />
        </div>
      </div>
    )
  }
}

export default CriteriaManagerZone
