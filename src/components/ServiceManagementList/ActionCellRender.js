import React from 'react'
import FeedImgDialog from './FeedImgDialog'
import DestroySrvDialog from './DestroySrvDialog'
import DeleteDialog from './DeleteDialog'
import classes from './ServiceManagementList.scss'
import OurToaster from 'components/OurToaster'
import { connect } from 'react-redux'
const qca = __QCA__

type Props = {
  value:String,
  data: Object,
  api: Object,
  token: String
};

export class ActionCellRender extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.onSetDataSrc = this.onSetDataSrc.bind(this)
    this.onDestroy = this.onDestroy.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.state = {
      isFeedBtnOpen: false,
      isDestroyBtnOpen: false,
      isDeleteBtnOpen: false
    }
  }

  onPause () {
    console.log('执行暂停')
    fetch(`${qca}/ojs/kernel/stopFeed`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': this.props.token
        },
        method: 'POST',
        body: JSON.stringify({'kernelId': this.props.data.kernelId.toString()})
      }
    )
    .then(response => response.json())
    .then((data) => {
      if (data.code === 200000) {
        OurToaster.show({message: '暂停成功!'})
      } else {
        OurToaster.show({message: '暂停失败!'})
      }
    })
  }

  onSetDataSrc () {
    this.setState({
      isFeedBtnOpen: !this.state.isFeedBtnOpen
    })
  }

  onDestroy () {
    this.setState({
      isDestroyBtnOpen: !this.state.isDestroyBtnOpen
    })
  }

  onDelete () {
    this.setState({
      isDeleteBtnOpen: !this.state.isDeleteBtnOpen
    })
  }

  render () {
    switch (this.props.value) {
      case 'started':
        // status ready
        return <div className={classes.cn}>
          <button disabled className={'pt-button pt-minimal pt-icon-trash'} title='Delete' />
          <button disabled={false} onClick={this.onSetDataSrc}
            className={'pt-button pt-minimal pt-icon-document-open'}
            title='Feed image' />
          <button disabled={false} onClick={this.onDestroy}
            className={'pt-button pt-minimal pt-icon-delete'}
            title='Destroy' />
          <button disabled className={'pt-button pt-minimal pt-icon-history'} title='Log' />
          <FeedImgDialog id={this.props.data.id} deviceId={this.props.data.deviceId}
            kernelId={this.props.data.kernelId}
            modelId={this.props.data.modelId}
            isOpen={this.state.isFeedBtnOpen} toggleDialog={this.onSetDataSrc} />
          <DestroySrvDialog deviceId={this.props.data.deviceId}
            kernelId={this.props.data.kernelId}
            isOpen={this.state.isDestroyBtnOpen} toggleDialog={this.onDestroy} />
        </div>

      case 'feeding':
        return <div className={classes.cn}>
          <button disabled className={'pt-button pt-minimal pt-icon-trash'} title='Delete' />
          <button disabled={false}
            onClick={this.onPause}
            className={'pt-button pt-minimal pt-icon-pause'}
            title='Pause' />
          <button disabled={false} onClick={this.onDestroy}
            className={'pt-button pt-minimal pt-icon-delete'}
            title='Destroy' />
          <button disabled className={'pt-button pt-minimal pt-icon-history'} title='Log' />
          <FeedImgDialog id={this.props.data.id} deviceId={this.props.data.deviceId}
            kernelId={this.props.data.kernelId}
            modelId={this.props.data.modelId}
            isOpen={this.state.isFeedBtnOpen} toggleDialog={this.onSetDataSrc} />
          <DestroySrvDialog deviceId={this.props.data.deviceId}
            kernelId={this.props.data.kernelId}
            isOpen={this.state.isDestroyBtnOpen} toggleDialog={this.onDestroy} />
        </div>

      case 'none':
      case 'destroyed':
        return <div className={classes.cn}>
          <button disabled={false}
            className={'pt-button pt-minimal pt-icon-trash'}
            title='Delete'
            onClick={this.onDelete} />
          <button disabled onClick={this.onSetDataSrc}
            className={'pt-button pt-minimal pt-icon-document-open'}
            title='Feed image' />
          <button disabled onClick={this.onDestroy}
            className={'pt-button pt-minimal pt-icon-delete'}
            title='Destroy' />
          <button disabled className={'pt-button pt-minimal pt-icon-history'} title='Log' />
          <FeedImgDialog id={this.props.data.id} deviceId={this.props.data.deviceId}
            kernelId={this.props.data.kernelId}
            modelId={this.props.data.modelId}
            isOpen={this.state.isFeedBtnOpen} toggleDialog={this.onSetDataSrc} />
          <DestroySrvDialog deviceId={this.props.data.deviceId}
            kernelId={this.props.data.kernelId}
            isOpen={this.state.isDestroyBtnOpen} toggleDialog={this.onDestroy} />
          <DeleteDialog id={this.props.data.id} kernelId={this.props.data.kernelId}
            isOpen={this.state.isDeleteBtnOpen} toggleDialog={this.onDelete}
            api={this.props.api} />
        </div>

      default:
        return <div className={classes.cn}>
          <button disabled className={'pt-button pt-minimal pt-icon-trash'} title='Delete' />
          <button disabled onClick={this.onSetDataSrc}
            className={'pt-button pt-minimal pt-icon-document-open'}
            title='Feed image' />
          <button disabled onClick={this.onDestroy}
            className={'pt-button pt-minimal pt-icon-delete'}
            title='Destroy' />
          <button disabled className={'pt-button pt-minimal pt-icon-history'} title='Log' />
          <FeedImgDialog id={this.props.data.id} deviceId={this.props.data.deviceId}
            kernelId={this.props.data.kernelId}
            modelId={this.props.data.modelId}
            isOpen={this.state.isFeedBtnOpen} toggleDialog={this.onSetDataSrc} />
          <DestroySrvDialog deviceId={this.props.data.deviceId}
            kernelId={this.props.data.kernelId}
            isOpen={this.state.isDestroyBtnOpen} toggleDialog={this.onDestroy} />
        </div>
    }
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
)(ActionCellRender)
