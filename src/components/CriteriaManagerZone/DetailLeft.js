import React from 'react'
import classes from './CriteriaManagerZone.scss'
// import {  } from '@blueprintjs/core'

type Props = {
  data: Object
}

export class DetailLeft extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange () {

  }

  render () {
    let { data } = this.props
    return (
      <div className={classes['left-container']}>
        <section className={classes.title}>1. Product</section>
        <section>
          <label className='pt-label'>
            Product
            <div className='pt-select'>
              <select
                onChange={this.handleChange('productName')}>
                <option value='SV509-CF'>SV509-CF</option>
                <option value='JV508-CG'>JV508-CG</option>
                <option value='GV507-DF'>GV507-DF</option>
                <option value='NV506-HF'>NV506-HF</option>
                <option value='8V505-BF'>8V505-BF</option>
              </select>
            </div>
          </label>
        </section>
        <section>
          <label className='pt-label'>
            Operation
            <div className='pt-select'>
              <select
                onChange={this.handleChange('operationName')}>
                <option value='2100'>2100</option>
                <option value='3100'>3100</option>
                <option value='4100'>4100</option>
                <option value='5100'>5100</option>
                <option value='6100'>6100</option>
              </select>
            </div>
          </label>
        </section>
        <section>
          <label className='pt-label'>
            LINE ID
            <div className='pt-select'>
              <select
                onChange={this.handleChange('lineIDName')}>
                <option value='PIPR01'>PIPR01</option>
                <option value='KIHR02'>KIHR02</option>
                <option value='YIHR10'>YIHR10</option>
                <option value='LIPK90'>LIPK90</option>
                <option value='OIPK01'>OIPK01</option>
              </select>
            </div>
          </label>
        </section>
        <section>
          <label className='pt-label'>
            Sub entity
            <div className='pt-select'>
              <select
                onChange={this.handleChange('subEntityName')}>
                <option value='PIN01'>PIN01</option>
                <option value='PIN02'>PIN02</option>
                <option value='PIN03'>PIN03</option>
                <option value='PIN04'>PIN04</option>
                <option value='PIN05'>PIN05</option>
              </select>
            </div>
          </label>
        </section>
        <section>
          <label className='pt-label'>
            Outliner
            <input className='pt-input'
              type='text'
              placeholder=''
              dir='auto'
              defaultValue={data.outliner}
              onChange={this.handleChange('outliner')} />
          </label>
        </section>
      </div>
    )
  }
}

export default DetailLeft
