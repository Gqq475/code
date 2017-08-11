import React from 'react'
import classes from './ModelTestFilter.scss'
import DatePicker2 from 'components/DatePicker2'
import AvailableFilters from 'components/AvailableFilters'
import { Button, RangeSlider } from '@blueprintjs/core'
import { dateHOC } from '../../Utils'
import { assign } from 'lodash'

const formatDate = (date) => date.format('YYYY-MM-DD HH:mm:ss')

type Props = {
  // data: Object,
  getModelList: Function,
  dateStart: String,
  dateEnd: String
};
export class ModelTestFilter extends React.Component {
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
    this.props.getModelList(assign({}, {
      dateStart: formatDate(this.props.dateStart),
      dateEnd: formatDate(this.props.dateEnd)
    }, this.state))
  }

  componentDidMount () {
    this.props.getModelList(assign({}, {
      dateStart: formatDate(this.props.dateStart),
      dateEnd: formatDate(this.props.dateEnd)
    }, this.state))
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
      <div className={classes['ModelTestFilter-container']}>
        <DatePicker2 {...this.props} />
        <AvailableFilters {...this.state} that={this} />
        <label className={`pt-label pt-inline ${classes.filter}`}>
          <span className={classes.reliability}>{_.RELIABILITY}</span>
          <div className={classes.reliabilitys}>
            <RangeSlider
              min={0}
              max={100}
              stepSize={1}
              labelStepSize={20}
              onChange={this.handleChangeStartReliability()}
              value={this.state.reliabilitys}
            />
          </div>
        </label>
        <Button className={classes['btn-submit']} onClick={this.handleClick}>
          查询
        </Button>
      </div>
    )
  }
}

export default dateHOC(props => <ModelTestFilter {...props} />)
