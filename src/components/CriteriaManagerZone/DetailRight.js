import React from 'react'
import classes from './CriteriaManagerZone.scss'
import { Radio } from '@blueprintjs/core'

type Props = {
  data: Object
}

export class DetailRight extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.handleTimeConditionRChange = this.handleTimeConditionRChange.bind(this)
    this.state = {
      timeCondPieceType: 1
    }
  }

  handleTimeConditionRChange () {
  }

  render () {
    return (
      <div className={classes['right-container']}>
        <div className={classes.title}>
          3. Time condition
        </div>
        <Radio label='单片超过（无时间限定）'
          defaultChecked={this.state.timeCondPieceType === '1'}
          name='condition'
          value='1'
          onChange={this.handleTimeConditionRChange('1')} />
        <Radio label='时间区间内设定'
          name='condition'
          value='2'
          defaultChecked={this.state.timeCondPieceType === '2'}
          onChange={this.handleTimeConditionRChange('2')} />
        <div className={classes['time-group-container']}>
          <div className='pt-control-group'>
            <div className='pt-select'>
              <select>
                <option value='1'>固定区间总和</option>
                <option value='2'>固定区间平均</option>
                <option value='3'>移动区间总和</option>
                <option value='4'>移动区间平均</option>
              </select>
            </div>
            <div className={`pt-input-group ${classes['time-input']}`}>
              <input className='pt-input' />
            </div>
          </div>
          <span className={classes['time-input-text']}>分钟</span>
        </div>
        <div className={classes['time-group-container']}>
          <span className={classes['time-input-text']}>最少</span>
          <div className='pt-control-group'>
            <div className='pt-select'>
              <select>
                <option value='1'>连续片数</option>
                <option value='2'>累积片数</option>
                <option value='3'>平均片数</option>
              </select>
            </div>
            <div className={`pt-input-group ${classes['time-input']}`}>
              <input className='pt-input' />
            </div>
          </div>
          <span className={classes['time-input-text']}>片</span>
        </div>
      </div>
    )
  }
}

export default DetailRight
