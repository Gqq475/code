import React from 'react'
import Table from 'components/ModelTestResultList/Table'

type Props = {
  modelResultList: Object
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

  handleSelect (rows) {
    this.setState({ rows })
  }

  render () {
    return (
      <div>
        {
          this.props.modelResultList &&
          <Table
            default={0}
            field={field}
            data={this.props.modelResultList}
            handleClick={this.handleSelect} />
        }
      </div>
    )
  }
}

export default ModelTestResultList
