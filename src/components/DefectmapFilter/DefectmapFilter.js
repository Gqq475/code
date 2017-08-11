import React from 'react'
import classes from './DefectmapFilter.scss'
import DatePicker2 from 'components/DatePicker2'
import AvailableFilters from 'components/AvailableFilters'
import { Button } from '@blueprintjs/core'
import { dateHOC } from '../../Utils'
import { assign } from 'lodash'

const formatDate = (date) => date.format('YYYY-MM-DD HH:mm:ss')

type Props = {
  getLots: Function,
  getGlasses: Function,
  dateStart: String,
  dateEnd: String
}
export class DefectmapFilter extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      product: 'SV509-CF',
      operation: '2100',
      lineID: 'PIPR01',
      subEntity: 'PIN01',
      pageNo: 1,
      // Must set 1 to get total count
      pageSize: 1,
      sortBy: 'id',
      order: 'asc'
    }
  }

  handleClick () {
    this.props.getLots(assign({}, this.state, {
      start_time: formatDate(this.props.dateStart),
      end_time: formatDate(this.props.dateEnd)
    }))
    this.props.getGlasses(assign({}, this.state, {
      start_time: formatDate(this.props.dateStart),
      end_time: formatDate(this.props.dateEnd)
    }))
  }

  componentDidMount () {
    this.handleClick()
  }

  render () {
    return (
      <div className={classes['DefectmapFilter-container']}>
        <DatePicker2 {...this.props} />
        <AvailableFilters {...this.state} that={this} />
        <Button className={classes['btn-submit']} onClick={this.handleClick}>
          查询
        </Button>
      </div>
    )
  }
}

export default dateHOC(props => <DefectmapFilter {...props} />)
