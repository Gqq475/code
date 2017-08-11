import React from 'react'
import classes from './ServiceManagement.scss'
import SMList from 'components/ServiceManagementList'
import SMEdit from 'components/ServiceManagementEdit'

type Props = {
  data: Obejct,
  getModel: Function,
  getCreateService: Function,
  getServiceDetail: Function
};
export class ServiceManagement extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.setDetail = this.setDetail.bind(this)

    this.state = {
      detailData: {},
      statusType: {
        none: 'idle',
        destroyed: 'idle',
        initing: 'creating',
        inited: 'creating',
        starting: 'creating',
        started: 'ready',
        feeded: 'ready',
        feeding: 'in Progress',
        destroying: 'destroying'
      }
    }
  }

  setDetail (data) {
    this.setState({
      detailData: data
    })
  }

  render () {
    return (
      <div className={classes['ServiceManagement-container']}>
        <SMList
          setDetail={this.setDetail}
          statusType={this.state.statusType}
          getModel={this.props.getModel}
          data={this.props.data}
          getCreateService={this.props.getCreateService}
        />
        <SMEdit
          statusType={this.state.statusType}
          data={this.state.detailData}
          ojsData={this.props.data}
          getModel={this.props.getModel}
          getServiceDetail={this.props.getServiceDetail}
        />
      </div>
    )
  }
}

export default ServiceManagement
