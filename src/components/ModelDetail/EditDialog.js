import React from 'react'
import classes from '../ModelList/Dialog.scss'
import { Button, Dialog } from '@blueprintjs/core'
// import OurToaster from 'components/OurToaster'
// const qca = __QCA__

type Props = {
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
  // that: Object
};

export class EditDialog extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (type) {
    return (e) => {
      this.setState({ [type]: e.target.value })
    }
  }
  handleSubmit () {
    // const url = `${qca}/ojs/service`
    // const delData = {}
    // delData.id = this.props.id.toString()
    // fetch(url, {
    //   method: 'DELETE',
    //   body: JSON.stringify(delData)
    // })
    // .then(response => response.json())
    // })

    // this.props.toggleDialog()
  }

  render () {
    return (
      <div className={classes['ModelList-container']}>
        <Dialog
          isOpen={this.props.isOpen}
          onClose={this.props.toggleDialog}
          className={classes.dialog}
        >
          <div className={classes.header}>
            <h6 className={classes.headerTitle}>Edit</h6>
          </div>
          <div className={classes.dialogBody}>
            <br />
            <section style={{width: '50%', marginLeft: '10%', margin: '0 auto'}}>
              <label className={`pt-label pt-inline ${classes.filter}`}>
                {_.PRODUCTID}
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
                          <option value='SV509-CF' selected={this.props.product === 'SV509-CF'}>SV509-CF</option>
                          <option value='JV508-CG' selected={this.props.product === 'JV508-CG'}>JV508-CG</option>
                          <option value='GV507-DF' selected={this.props.product === 'GV507-DF'}>GV507-DF</option>
                          <option value='NV506-HF' selected={this.props.product === 'NV506-HF'}>NV506-HF</option>
                          <option value='8V505-BF' selected={this.props.product === '8V505-BF'}>8V505-BF</option>
                        </select>
                      )
                    }
                  })()}
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
                          <option value='2100' selected={this.props.operation === '2100'}>2100</option>
                          <option value='3100' selected={this.props.operation === '3100'}>3100</option>
                          <option value='4100' selected={this.props.operation === '4100'}>4100</option>
                          <option value='5100' selected={this.props.operation === '5100'}>5100</option>
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
                          <option value='PIPR01' selected={this.props.lineID === 'PIPR01'}>PIPR01</option>
                          <option value='KIHR02' selected={this.props.lineID === 'KIHR02'}>KIHR02</option>
                          <option value='YIHR10' selected={this.props.lineID === 'YIHR10'}>YIHR10</option>
                          <option value='LIPK90' selected={this.props.lineID === 'LIPK90'}>LIPK90</option>
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
                          <option value='PIN01' selected={this.props.subEntity === 'PIN01'}>PIN01</option>
                          <option value='PIN02' selected={this.props.subEntity === 'PIN02'}>PIN02</option>
                          <option value='PIN03' selected={this.props.subEntity === 'PIN03'}>PIN03</option>
                          <option value='PIN04' selected={this.props.subEntity === 'PIN04'}>PIN04</option>
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

export default EditDialog
