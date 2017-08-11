import React from 'react'
import classes from './LoadingContainer.scss'
import { Intent, ProgressBar } from '@blueprintjs/core'

type Props = {
  content: String
};
export class LoadingContainer extends React.Component {
  props: Props;

  render () {
    let content = this.props.content ? this.props.content : _.LOADING
    return (
      <div className={classes['LoadingContainer-container']}>
        <label className={classes['waitingIndicatorTxt']}>{content}</label>
        <ProgressBar className={classes['waitingIndicator']} intent={Intent.PRIMARY} />
      </div>
    )
  }
}

export default LoadingContainer
