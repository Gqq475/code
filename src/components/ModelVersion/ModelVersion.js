import React from 'react'
import classes from './ModelVersion.scss'
import ModelList from 'components/ModelList'
import ModelDetail from 'components/ModelDetail'
type Props = {
  data: Object,
};
export class ModelVersion extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      detailData: {}
    }
    this.setDetail = this.setDetail.bind(this)
  }

  setDetail (data) {
    this.setState({
      detailData: data
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      detailData: {}
    })
  }

  render () {
    return (
      <div className={classes['ModelVersion-container']}>
        <ModelList
          data={this.props.data}
          setDetail={this.setDetail}
        />
        {
          <ModelDetail
            data={this.state.detailData} />
        }
      </div>
    )
  }
}

export default ModelVersion
