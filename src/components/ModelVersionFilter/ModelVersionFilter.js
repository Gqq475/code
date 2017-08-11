import React from 'react'
import classes from './ModelVersionFilter.scss'
import ModelOption from 'components/ModelOption'
import { Button } from '@blueprintjs/core'

type Props = {
getModelList: Function
};

export class ModelVersionFilter extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      // start: new Date(2017, 0, 1),
      // end: new Date(),
      product: '',
      operation: '',
      lineID: '',
      subEntity: '',
      pageNo: 1,
      // // Must set 1 to get total count
      pageSize: 1
      // sortBy: 'id',
      // order: 'asc'
    }
  }

  handleClick () {
    console.log(this.state)
    this.props.getModelList(this.state)
  }

  componentDidMount () {
    this.props.getModelList(this.state)
  }

  render () {
    return (
      <div className={classes['ModelVersionFilter-container']}>
        <ModelOption {...this.state} that={this} />
        <Button className={classes['btn-submit']} onClick={this.handleClick}>
          查询
        </Button>
      </div>
    )
  }
}

export default ModelVersionFilter
