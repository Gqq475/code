import React from 'react'
import classes from './CreateServiceDialog.scss'
import DialogFilter from 'components/DialogFilter'
import { connect } from 'react-redux'
const qca = __QCA__

type Props = {
 data: Object,
 isOpen: boolean,
 toggleDialog: Function,
 getModel: Function,
 getCreateService: Function,
 dataList: Object,
 token: String
};
export class CreateServiceDialog extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getKernelIds = this.getKernelIds.bind(this)
    this.kernelIdFilter = this.kernelIdFilter.bind(this)
    this.loadingKernelIds = false
    this.state = {
      name: '',
      modelId: undefined,
      isChanged: false,
      kernelIds: [],
      kernelId: undefined
    }
  }

  handleSubmit () {
    var tmp = {
      name: this.state.name,
      deviceId: '1',
      modelId: this.state.modelId,
      dataSource: '/image/T00B351BP/',
      description: 'Test',
      kernelId: this.state.kernelId
    }
    this.props.getCreateService(tmp)
    this.props.toggleDialog()
    this.setState({
      isChanged: false
    })
  }

  kernelIdFilter () {
    let kernelIds = []
    let propKernelIds = []
    let resultKernelIds = this.state.kernelIds
    // data filter
    this.props.dataList &&
    this.props.dataList.length &&
    this.props.dataList.forEach((item) => {
      propKernelIds.push(item.kernelId)
    })
    if (propKernelIds.length) {
      resultKernelIds.forEach((kernelId) => {
        !propKernelIds.includes(+kernelId) && kernelIds.push(+kernelId)
      })
    } else {
      kernelIds = resultKernelIds
    }

    return kernelIds
  }

  getKernelIds () {
    this.loadingKernelIds = true
    fetch(`${qca}/ojs/service/kernels`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': this.props.token
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.loadingKernelIds = false
      if (data.code === 200000) {
        this.setState({
          kernelIds: data.result
        })
      } else {
        console.log('kernelId 获取失败')
      }
    })
  }

  componentWillMount () {
    this.props.getModel()
    this.getKernelIds()
  }

  render () {
    return (
      <div className={classes['CreateServiceDialog-container']}>
        <DialogFilter
          DialogTitle='Create Service'
          DialogID=''
          DialogName=''
          DialogBtnContent='Create'
          isOpen={this.props.isOpen}
          toggleDialog={this.props.toggleDialog}
          handleSubmit={this.handleSubmit}
          getModel={this.props.getModel}
          data={this.props.data}
          getCreateService={this.props.getCreateService}
          isChanged={this.state.isChanged}
          that={this}
          modelId={this.state.modelId}
          kernelIds={this.kernelIdFilter()}
          kernelId={this.state.kernelId}
          loadingKernelIds={this.loadingKernelIds} />
      </div>
    )
  }
}
export default connect(
  (state) => ({
    token: state.auth.token
  }),
  (dispatch, state) => {
    return {
      dispatch
    }
  }
)(CreateServiceDialog)
