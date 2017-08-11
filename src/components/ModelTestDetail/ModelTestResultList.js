import React from 'react'
import Table from 'components/ModelTestResultList/Table'
// import Utils from '../../Utils.js'

type Props = {
  data: Object,
  id: Number,
  getModelResultList: Function
};

const field = {
  'Id': 'id',
  'Defect Id': 'defectId',
  'Image_name': 'imageName',
  'Path': 'path',
  'Defect_name': 'defectName',
  'Judge_name': 'judgeName',
  'Confidence': 'confidence',
  'Error': 'result'
}

export class ModelTestResultList extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.state = {
      rows: '0'
    }
  }

  componentDidMount () {
    this.props.getModelResultList(this.props.id)
    // console.log('id', this.props.id)
  }

  componentWillReceiveProps (nextProps) {
    // console.log('nextProps', nextProps)
    if (nextProps.id !== this.props.id) {
      this.setState({
        id: nextProps.id
      })
      this.props.getModelResultList(nextProps.id)
    }
  }

  handleSelect (rows) {
    this.setState({ rows })
  }

  render () {
    return (
      <div>
        {
          this.props.data &&
          <Table
            default={0}
            field={field}
            data={this.props.data}
            handleClick={this.handleSelect} />
        }
      </div>
    )
  }
}

export default ModelTestResultList
