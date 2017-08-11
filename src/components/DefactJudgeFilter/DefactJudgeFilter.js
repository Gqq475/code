import React from 'react'
import classes from './DefactJudgeFilter.scss'
import DatePicker2 from 'components/DatePicker2'
import AvailableFilters from 'components/AvailableFilters'
import { Button } from '@blueprintjs/core'
import { dateHOC } from '../../Utils'
import { assign } from 'lodash'

const formatDate = (date) => date.format('YYYY-MM-DD HH:mm:ss')

type Props = {
  getDefectJudgeList: Function,
  dateStart: String,
  dateEnd: String
}

export class DefactJudgeFilter extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      product: '',
      operation: '',
      lineID: '',
      subEntity: '',
      pageNo: 1,
      // Must set 1 to get total count
      pageSize: 1,
      sortBy: 'id',
      order: 'asc'
    }
  }

  handleClick () {
    this.props.getDefectJudgeList(assign({}, this.state, {
      start_time: formatDate(this.props.dateStart),
      end_time: formatDate(this.props.dateEnd)
    }))
  }

  componentDidMount () {
    this.props.getDefectJudgeList(assign({}, this.state, {
      start_time: formatDate(this.props.dateStart),
      end_time: formatDate(this.props.dateEnd)
    }))
  }

  render () {
    return (
      <div className={classes['DefactJudgeFilter-container']}>
        <DatePicker2 {...this.props} />
        <AvailableFilters {...this.state} that={this} />
        <Button className={classes['btn-submit']} onClick={this.handleClick}>
          查询
        </Button>
      </div>
    )
  }
}

export default dateHOC(props => <DefactJudgeFilter {...props} />)
