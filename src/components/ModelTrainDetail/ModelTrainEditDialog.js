import React from 'react'
import classes from './Dialog.scss'
import { Button, Dialog } from '@blueprintjs/core'

type Props = {
  id: String,
  isOpen: boolean,
  toggleDialog: Function,
  product: Object,
  operation: Object,
  lineID: Object,
  subEntity: Object,
  productArr: Array,
  operationArr: Array,
  lineIDArr: Array,
  subEntityArr: Array,
  updateModelTrainList: Function
};

export class ModelTrainEditDialog extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.state = {
      product: '',
      operation: '',
      lineID: '',
      subEntity: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (type) {
    return (e) => {
      this.setState({ [type]: e.target.value })
    }
  }
  handleSubmit () {
    this.props.toggleDialog(this.state)
    this.props.updateModelTrainList(this.props.id, this.state)
  }

  render () {
    return (
      <div className={classes['Dialog-container']}>
        <Dialog
          isOpen={this.props.isOpen}
          onClose={this.props.toggleDialog}
          className={classes.dialog}
        >
          <div className={classes.header}>
            <h6 className={classes.headerTitle}>编辑</h6>
          </div>
          <div className={classes.dialogBody}>
            <br />
            <section style={{width: '50%', marginLeft: '10%', margin: '0 auto'}}>
              <label className={`pt-label pt-inline ${classes.filter}`}>
                {_.PRODUCTID}
                <div className='pt-select'>
                  {
                    (this.props.productArr) ? (
                      <select className={classes.select} onChange={this.handleChange('product_code')}>
                        {this.props.productArr.map((item, i) => {
                          return <option key={i} value={item}>{item}</option>
                        })}
                      </select>
                    ) : (
                      <select className={classes.select} onChange={this.handleChange('product')}>
                        <option value='请选择' defaultValue={this.props.product === ''}>请选择</option>
                        <option value='SV509-CF' defaultValue={this.props.product === 'SV509-CF'}>SV509-CF</option>
                        <option value='JV508-CG' defaultValue={this.props.product === 'JV508-CG'}>JV508-CG</option>
                        <option value='GV507-DF' defaultValue={this.props.product === 'GV507-DF'}>GV507-DF</option>
                        <option value='NV506-HF' defaultValue={this.props.product === 'NV506-HF'}>NV506-HF</option>
                        <option value='8V505-BF' defaultValue={this.props.product === '8V505-BF'}>8V505-BF</option>
                      </select>
                    )
                   }
                </div>
              </label>
              <label className={`pt-label pt-inline ${classes.filter}`}>
                {_.OPERATIONID}
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
                          <option value='请选择' defaultValue={this.props.operation === ''}>请选择</option>
                          <option value='2100' defaultValue={this.props.operation === '2100'}>2100</option>
                          <option value='3100' defaultValue={this.props.operation === '3100'}>3100</option>
                          <option value='4100' defaultValue={this.props.operation === '4100'}>4100</option>
                          <option value='5100' defaultValue={this.props.operation === '5100'}>5100</option>
                        </select>
                      )
                    }
                  })()}
                </div>
              </label>
              <label className={`pt-label pt-inline ${classes.filter}`}>
                {_.LINEID}
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
                          <option value='请选择' defaultValue={this.props.lineID === ''}>请选择</option>
                          <option value='PIPR01' defaultValue={this.props.lineID === 'PIPR01'}>PIPR01</option>
                          <option value='KIHR02' defaultValue={this.props.lineID === 'KIHR02'}>KIHR02</option>
                          <option value='YIHR10' defaultValue={this.props.lineID === 'YIHR10'}>YIHR10</option>
                          <option value='LIPK90' defaultValue={this.props.lineID === 'LIPK90'}>LIPK90</option>
                        </select>
                      )
                    }
                  })()}
                </div>
              </label>
              <label className={`pt-label pt-inline ${classes.filter}`}>
                {_.SUBENTITY}
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
                          <option value='请选择' defaultValue={this.props.subEntity === ''}>请选择</option>
                          <option value='PIN01' defaultValue={this.props.subEntity === 'PIN01'}>PIN01</option>
                          <option value='PIN02' defaultValue={this.props.subEntity === 'PIN02'}>PIN02</option>
                          <option value='PIN03' defaultValue={this.props.subEntity === 'PIN03'}>PIN03</option>
                          <option value='PIN04' defaultValue={this.props.subEntity === 'PIN04'}>PIN04</option>
                        </select>)
                    }
                  })()}
                </div>
              </label>
            </section>
            <div className={classes.btnGroup}>
              <Button className={classes.btnCancel} onClick={this.props.toggleDialog}>
                {_.CANCEL}
              </Button>
              <Button className={`pt-button pt-intent-primary ${classes.btnEdit}`} onClick={this.handleSubmit}>
               Save
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default ModelTrainEditDialog
