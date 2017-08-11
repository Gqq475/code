import React from 'react'
import { assign } from 'lodash'
import { connect } from 'react-redux'
import classes from './AlarmDetail.scss'
import AlarmCommentEditor from 'components/AlarmCommentEditor'
import AlarmNotifyDialog from 'components/AlarmNotifyDialog'
import Utils from '../../Utils.js'

type Props = {
  data: Object,
  id: number,
  token: String,
  userRole: Array
};

export class TextField {
  constructor (key, value) {
    this.key = key
    this.value = value
  }

  getRender (btn) {
    return (
      <div className={classes.textField}>
        <div className={classes.key}>
          {this.key}
        </div>
        <div className={classes.value}>
          {this.value}
          {btn}
        </div>
      </div>
    )
  }
}

export class AlarmDetail extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.findById = this.findById.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onSubmitNewComment = this.onSubmitNewComment.bind(this)
    this.toggleNotifyDialog = this.toggleNotifyDialog.bind(this)
    this.state = {
      editing: false,
      newComment: '',
      notifyDialogIsOpen: false
    }
  }

  findById (id) {
    return this.props.data[id]
  }

  onEdit () {
    this.setState(assign({}, this.state, {
      editing: !this.state.editing
    }))
  }

  onSubmitNewComment (comment) {
    this.setState(assign({}, this.state, {
      editing: !this.state.editing,
      newComment: comment
    }))
  }

  toggleNotifyDialog () {
    this.setState(assign({}, this.state, {
      notifyDialogIsOpen: !this.state.notifyDialogIsOpen
    }))
  }

  checkIfUpdateNewComment (selectedData) {
    if (this.state.newComment !== '') {
      selectedData['comments'] = this.state.newComment
      this.state.newComment = ''
    }

    return selectedData
  }

  componentWillUpdate () {
    this.state.editing = false
  }

  render () {
    let selectedData
    let createTime
    let calDuration
    let lastUpdate
    if (this.props.data && this.props.data.length) {
      selectedData = this.findById(this.props.id)
      selectedData = this.checkIfUpdateNewComment(selectedData)

      createTime = Utils.formatDate(selectedData['createTime'])
      calDuration = `${Utils.formatDate(selectedData['calStartTime'])} -
        ${Utils.formatDate(selectedData['calEndTime'])}`
      lastUpdate = Utils.formatDate(selectedData['updateTime'])
    }
    return (
      <div className={`pt-card pt-elevation-2 ${classes['AlarmDetail-container']}`}>
        {
        selectedData && (
          <section>
            <section className={classes.header}>告警详情</section>
            <div className={classes.content}>
              <div className={classes.left}>
                {new TextField(_.ID, selectedData['id']).getRender()}
                {new TextField(_.ALARMTYPE, selectedData['type']).getRender()}
                {new TextField(_.ALARMLEVEL, selectedData['level']).getRender()}
                {new TextField(_.STATUS, selectedData['status']).getRender()}
                {new TextField(_.CREATETIME, createTime).getRender()}
              </div>
              <div className={classes.center}>
                {new TextField(_.PRODUCTID, selectedData['productCode']).getRender()}
                {new TextField(_.LINEID, selectedData['lineCode']).getRender()}
                {new TextField(_.OPERATIONID, selectedData['operationCode']).getRender()}
                {new TextField(_.SUBENTITY, selectedData['subEqCode']).getRender()}
                {new TextField(_.REAL, selectedData['realValue']).getRender()}
                {new TextField('计算时间', calDuration).getRender()}
                {new TextField(_.OOC, selectedData['ooc']).getRender()}
                {new TextField(_.OOS, selectedData['oos']).getRender()}
              </div>
              <div className={classes.right}>
                {new TextField(_.UPDATEBY, selectedData['updateBy']).getRender()}
                {new TextField(_.LASTUPDATE, lastUpdate).getRender()}
                {
                  (Utils.identifyRole(this.props.userRole) !== 'guest-only') ? (
                    <div>
                      {!this.state.editing && new TextField('意见',
                          selectedData['comments']).getRender(
                            <button onClick={this.onEdit}
                              className={`pt-button pt-minimal pt-icon-edit ${classes.editBtn}`} />
                        )}
                      {this.state.editing && (
                        <AlarmCommentEditor
                          id={selectedData['id']}
                          onSubmitNewComment={this.onSubmitNewComment}
                          content={selectedData['comments']} />
                        )}
                      {
                        <button
                          type='button'
                          style={{
                            display: 'block',
                            margin: '0 auto'
                          }}
                          className='pt-button pt-large pt-intent-primary'
                          onClick={this.toggleNotifyDialog}
                          >Notify</button>
                      }
                      <AlarmNotifyDialog
                        token={this.props.token}
                        id={selectedData.id}
                        alarmType={selectedData.type}
                        notifyDialogIsOpen={this.state.notifyDialogIsOpen}
                        toggleNotifyDialog={this.toggleNotifyDialog} />
                    </div>
                  ) : (
                    <div className={classes.textField}>
                      <div className={classes.key}>
                        {'意见'}
                      </div>
                      <div className={classes.value}>
                        {selectedData['comments']}
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </section>
        )
      }
      </div>
    )
  }
}

export default connect(
  (state) => ({
    userRole: state.auth.userRole
  })
)(AlarmDetail)
