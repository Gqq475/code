import React from 'react'
import classes from './EchartsFilter.scss'
import DatePicker2 from 'components/DatePicker2'
import AvailableFilters from 'components/AvailableFilters'
import { Button } from '@blueprintjs/core'
import { dateHOC } from '../../Utils'
import { assign } from 'lodash'

const formatDate = (date) => date.format('YYYY-MM-DD HH:mm:ss')

type Props = {
  dateStart: String,
  dateEnd: String,
  data: Object,
  getEchartsLeftMenu: Function,
  getHandlingPath: Function,
  getEquipmentPort: Function,
  getSTK: Function,
  getFromTo: Function
};
export class EchartsFilter extends React.Component {
  props: Props;

  componentWillMount () {
    this.state = {
      // start: new Date(2017, 0, 1),
      // end: new Date(),
      product_code: 'SV509-CF',
      operation_code: '2100',
      line_code: 'PIPR01',
      sub_eq_code: 'PIN02'
    }
    this.props.getEchartsLeftMenu()
    this.handClick = this.handClick.bind(this)
    this.handClick()
  }

  // componentWillReceiveProps (nextProps) {
  //   if (this.props.data && this.props.data.echartsLeftMenu && this.props.data.echartsLeftMenu.result) {
  //     this.setState({
  //       product_code: this.state.product_code || this.props.data.echartsLeftMenu.result.product_code[0],
  //       operation_code: this.state.operation_code || this.props.data.echartsLeftMenu.result.operation_code[0],
  //       line_code: this.state.line_code || this.props.data.echartsLeftMenu.result.line_code[0],
  //       sub_eq_code: this.state.sub_eq_code || this.props.data.echartsLeftMenu.result.sub_eq_code[0]
  //     })
  //   }
  // }

  handClick () {
    const tmp = assign({}, {
      start_time: formatDate(this.props.dateStart),
      end_time: formatDate(this.props.dateEnd)
    }, this.state)

    this.props.getHandlingPath(tmp)
    this.props.getEquipmentPort(tmp)
    this.props.getSTK(tmp)
    this.props.getFromTo(tmp)
  }

  substrString (date) {
    let dateTime = date
    if (date < 10 && date > 0) {
      dateTime = date.substr(1, 1)
    }
    return dateTime
  }

  render () {
    return (
      <div className={classes['EchartsLeftMenu-container']}>
        <DatePicker2 {...this.props} />
        <AvailableFilters
          {...this.state}
          that={this}
          productArr={this.props.data &&
            this.props.data.echartsLeftMenu && this.props.data.echartsLeftMenu.result.product_code}
          operationArr={this.props.data &&
            this.props.data.echartsLeftMenu && this.props.data.echartsLeftMenu.result.operation_code}
          lineIDArr={this.props.data &&
            this.props.data.echartsLeftMenu && this.props.data.echartsLeftMenu.result.line_code}
          subEntityArr={this.props.data &&
            this.props.data.echartsLeftMenu && this.props.data.echartsLeftMenu.result.sub_eq_code}
          />
        <Button className={classes['btn-submit']} onClick={this.handClick}>
          查询
        </Button>
      </div>
    )
  }
}

export default dateHOC(props => <EchartsFilter {...props} />)
