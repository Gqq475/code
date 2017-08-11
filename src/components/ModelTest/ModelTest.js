import React from 'react'
import classes from './ModelTest.scss'
import ModelTestList from 'components/ModelTestList'
import ModelTestDetail from 'components/ModelTestDetail'
import { assign } from 'lodash'

type Props = {
  data: Object,
  getModelResultList: Function,
  getModelTestFeed: Function
};

export class ModelTest extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      detailData: {}
    }
    this.setDetail = this.setDetail.bind(this)
  }

  setDetail (data) {
    this.setState(assign({}, this.state, {
      detailData: data
    }))
  }

  render () {
    return (
      <div className={classes['ModelTest-container']}>
        <ModelTestList
          setDetail={this.setDetail}
        />
        {
          <ModelTestDetail
            dataDetail={this.state.detailData}
            data={this.props.data}
            getModelTestFeed={this.props.getModelTestFeed}
            getModelResultList={this.props.getModelResultList} />
        }
      </div>
    )
  }
}

export default ModelTest
