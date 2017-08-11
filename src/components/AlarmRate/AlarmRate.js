import React from 'react'
import classes from './AlarmRate.scss'
import { connect } from 'react-redux'

type Props = {
  token: String
};

export class AlarmRate extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.state = {
      url: ''
    }
  }

  componentDidMount () {
    let url = 'https://bi-proxy.cloud.k2data.com.cn/1.0.0/workbooks/' +
      '690abb9f-9700-403e-8f70-3ce37573d453/views/a647abb3-793a-48e9-ba9d-9a7961291420'

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': this.props.token
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ url: data.result.contentUrl })
    })
    .catch(err => console.log(err))
  }

  render () {
    return (
      <div className={classes['AlarmRate-container']}>
        {
          <iframe className={classes.iframe} src={this.state.url} />
        }
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
)(AlarmRate)
