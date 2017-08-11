import React from 'react'
import classes from './ModelTrainFilter.scss'
import DatePicker2 from 'components/DatePicker2'
import AvailableFilters from 'components/AvailableFilters'
import { Button } from '@blueprintjs/core'
import { dateHOC } from '../../Utils'

const formatDate = (date) => date.format('YYYY-MM-DD HH:mm:ss')

type Props = {
  getModelTrainList: Function,
  dateStart: String,
  dateEnd: String
};
export class ModelTrainFilter extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeStartReliability = this.handleChangeStartReliability.bind(this)
    this.filterData = this.filterData.bind(this)
    this.state = {
      product: '',
      operation: '',
      lineID: '',
      subEntity: '',
      reliabilitys: [0, 100],
      pageNo: 1,
      // Must set 1 to get total count
      pageSize: 1,
      sortBy: 'id',
      order: 'asc'
    }
  }

  filterData () {
    const filterData = {}
    const stateKeys = Object.keys(this.state)
    const stateValues = Object.values(this.state)

    stateKeys.forEach((key, i) => {
      let value = stateValues[i]
      if (value && key === 'reliability') {
        value = (parseInt(value) / 100)
        value === 1 && (value = '')
      }
      value && (filterData[key] = value)
    })

    return filterData
  }

  handleClick () {
    this.props.getModelTrainList({
      dateStart: formatDate(this.props.dateStart),
      dateEnd: formatDate(this.props.dateEnd)
    })
  }

  componentDidMount () {
    this.props.getModelTrainList({
      dateStart: formatDate(this.props.dateStart),
      dateEnd: formatDate(this.props.dateEnd)
    })
  }

  handleChange (type) {
    return (e) => {
      this.setState({ [type]: e.target.value })
    }
  }

  handleChangeStartReliability () {
    return (reliabilitys) => {
      this.setState({reliabilitys})
    }
  }

  render () {
    return (
      <div className={classes['ModelTrainFilter-container']}>
        <DatePicker2 {...this.props} />
        <AvailableFilters {...this.state} that={this} />
        <Button className={classes['btn-submit']} onClick={this.handleClick}>
          查询
        </Button>
      </div>
    )
  }
}

export default dateHOC(props => <ModelTrainFilter {...props} />)
