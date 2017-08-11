import React from 'react'
import classes from './ModelOption.scss'
// import { Menu, MenuItem, Popover, Position } from '@blueprintjs/core'

type Props = {
  productArr: Array,
  operationArr: Array,
  lineIDArr: Array,
  subEntityArr: Array,
  that: Object
};
export class ModelOption extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (type) {
    return (e) => {
      this.props.that.setState({ [type]: e.target.value })
    }
  }

  render () {
    return (
      <div className={classes['ModelOption-container']}>
        <section className={classes.header}>
          <span className='pt-icon-standard pt-icon-search' /> 查询条件
        </section>
        <section>
          <label className={`pt-label pt-inline ${classes.filter}`}>
            产品
            <div className='pt-select'>
              {(() => {
                if (this.props.productArr) {
                  return (
                    <select className={classes.select} onChange={this.handleChange('product_code')}>
                      {this.props.productArr.map((item, i) => {
                        return <option key={i} value={item}>{item}</option>
                      })}
                    </select>
                  )
                } else {
                  return (
                    <select className={classes.select}
                      onChange={this.handleChange('product')}>
                      <option value=''>请选择</option>
                      <option value='SV509-CF'>SV509-CF</option>
                      <option value='JV508-CG'>JV508-CG</option>
                      <option value='GV507-DF'>GV507-DF</option>
                      <option value='NV506-HF'>NV506-HF</option>
                      <option value='8V505-BF'>8V505-BF</option>
                    </select>
                  )
                }
              })()}
            </div>
          </label>
          <label className={`pt-label pt-inline ${classes.filter}`}>
            站点
            <div className='pt-select'>
              {(() => {
                if (this.props.operationArr) {
                  return (
                    <select className={classes.select} onChange={this.handleChange('operation_code')}>
                      {this.props.operationArr.map((item, i) => {
                        return <option key={i} value={item}>{item}</option>
                      })}
                    </select>
                  )
                } else {
                  return (
                    <select className={classes.select} onChange={this.handleChange('operation')}>
                      <option value=''>请选择</option>
                      <option value='2100'>2100</option>
                      <option value='3100'>3100</option>
                      <option value='4100'>4100</option>
                      <option value='5100'>5100</option>
                    </select>
                  )
                }
              })()}
            </div>
          </label>
          <label className={`pt-label pt-inline ${classes.filter}`}>
            线别
            <div className='pt-select'>
              {(() => {
                if (this.props.lineIDArr) {
                  return (
                    <select className={classes.select} onChange={this.handleChange('line_code')}>
                      {this.props.lineIDArr.map((item, i) => {
                        return <option key={i} value={item}>{item}</option>
                      })}
                    </select>
                  )
                } else {
                  return (
                    <select className={classes.select} onChange={this.handleChange('lineID')}>
                      <option value=''>请选择</option>
                      <option value='PIPR01'>PIPR01</option>
                      <option value='KIHR02'>KIHR02</option>
                      <option value='YIHR10'>YIHR10</option>
                      <option value='LIPK90'>LIPK90</option>
                    </select>
                  )
                }
              })()}
            </div>
          </label>
          <label className={`pt-label pt-inline ${classes.filter}`}>
            机台
            <div className='pt-select'>
              {(() => {
                if (this.props.subEntityArr) {
                  return (
                    <select className={classes.select} onChange={this.handleChange('sub_eq_code')}>
                      {this.props.subEntityArr.map((item, i) => {
                        return <option key={i} value={item}>{item}</option>
                      })}
                    </select>)
                } else {
                  return (
                    <select className={classes.select} onChange={this.handleChange('subEntity')}>
                      <option value=''>请选择</option>
                      <option value='PIN01'>PIN01</option>
                      <option value='PIN02'>PIN02</option>
                      <option value='PIN03'>PIN03</option>
                      <option value='PIN04'>PIN04</option>
                    </select>)
                }
              })()}
            </div>
          </label>
        </section>
      </div>
    )
  }
}

export default ModelOption
