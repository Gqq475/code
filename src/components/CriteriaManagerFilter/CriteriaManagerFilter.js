import React from 'react'
import classes from './CriteriaManagerFilter.scss'
import AvailableFilters from 'components/AvailableFilters'
import DatePicker2 from 'components/DatePicker2'
import { Button } from '@blueprintjs/core'
import { dateHOC } from '../../Utils'
import { assign } from 'lodash'

const formatDate = (date) => date.format('YYYY-MM-DD HH:mm:ss')

type Props = {
  dateStart: String,
  dateEnd: String,
  getCriteriaManagerList: Function
};
export class CriteriaManagerFilter extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)

    this.state = {
      product: '',
      operation: '',
      lineID: '',
      subEntity: '',
      pageNo: 1,
      pageSize: 1,
      sortBy: 'id',
      order: 'asc'
    }
  }

  handleClick () {
    this.props.getCriteriaManagerList(assign({}, {
      dateStart: formatDate(this.props.dateStart),
      dateEnd: formatDate(this.props.dateEnd)
    }, this.state))
  }

  componentDidMount () {
    this.props.getCriteriaManagerList()
  }

  render () {
    return (
      <div className={classes['CriteriaManagerFilter-container']}>
        <DatePicker2 {...this.props} />
        <AvailableFilters {...this.state} that={this} />
        <Button className={classes['btn-submit']} onClick={this.handleClick}>
          查询
        </Button>
      </div>
    )
  }
}

export default dateHOC(props => <CriteriaManagerFilter {...props} />)
