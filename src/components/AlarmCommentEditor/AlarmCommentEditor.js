import React from 'react'
import classes from './AlarmCommentEditor.scss'
import { connect } from 'react-redux'
import { compose, withState } from 'recompose'
import OurToaster from 'components/OurToaster'

const qca = __QCA__

type Props = {
  id: Number,
  content: String,
  token: String,
  btnIsDisabled: Boolean,
  onSubmitNewComment: Function
};

export class AlarmCommentEditor extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.onChangeComment = this.onChangeComment.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      text: this.props.content
    }
  }

  onChangeComment () {
    let newComment = document.getElementById('commentTA').value
    // this.props.disableBtn(true)

    fetch(`${qca}/alarm/updateAlarm`, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.props.id,
        comments: newComment
      }),
      headers: {
        'Authorization': this.props.token
      }
    })
    .then(response => response.json())
    .then(json => {
      if (json.code === 200000) {
        // 成功
        this.props.onSubmitNewComment(newComment)
      } else {
        OurToaster.show({ message: '意见更新失败!' })
        // this.props.disableBtn(false)
      }
    })
    .catch(() => {
      OurToaster.show({ message: '意见更新失败!' })
      // this.props.disableBtn(false)
    })
  }

  componentWillUnmount () {

  }

  handleChange (e) {
    this.setState({ text: e.target.value })
  }

  render () {
    return (
      <div className={classes['AlarmCommentEditor-container']}>
        <label className={classes.textLabel}>意见</label>
        <textarea id='commentTA' dir='auto'
          className={`pt-input ${classes.textarea}`}
          value={this.state.text} onChange={this.handleChange} />
        <div className={classes.button}>
          <button
            type='button'
            disabled={this.props.btnIsDisabled}
            onClick={this.onChangeComment}
            className='pt-button pt-minimal pt-icon-confirm' />
        </div>
      </div>
    )
  }
}

export default compose(
  connect((state) => ({
    token: state.auth.token
  })),
  withState('btnIsDisabled', 'disableBtn', false)
)(AlarmCommentEditor)
