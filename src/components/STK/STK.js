import React from 'react'
import classes from './STK.scss'

type Props = {

};
export class STK extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.state = {
      url: ''
    }
  }

  componentWillMount () {
    let url = 'http://172.22.35.131:8080/workbooks/' +
      '74596612-9df5-42aa-b4ed-759c9213d184/views/296f2b3d-bf88-444f-8e9f-4775d3e3b2e7'
    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        this.setState({ url: data.result.contenturl })
      })
  }

  render () {
    return (
      <div className={classes['STK-container']}>
        {
          <iframe className={classes.iframe} src={this.state.url} />
        }
      </div>
    )
  }
}

export default STK
