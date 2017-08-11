import React from 'react'
import classes from './Dashboard.scss'

type Props = {

};
export class Dashboard extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      url: ''
    }
  }

  componentWillMount () {
    let url = 'http://bi-proxy.cloud.k2data.com.cn/1.0.0/workbooks/' +
      '226d5a98-783c-4152-8efe-f9a041dcf1f8/views/97393edd-559b-4e8d-a108-15fdce20b764'
    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        this.setState({ url: data.result.contentUrl })
      })
  }

  render () {
    return (
      <div className={classes['Dashboard-container']}>
        {
          <iframe className={classes.iframe} src={this.state.url} />
      }
      </div>
    )
  }
}

export default Dashboard
