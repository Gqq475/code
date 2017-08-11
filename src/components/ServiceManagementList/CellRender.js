import React from 'react'
import classes from './ServiceManagementList.scss'

type Props = {
  value: String,
  data: Object
};

export class CellRender extends React.Component {
  props: Props;

  render () {
    console.log('value,', this.props.value, this.props.data)
    switch (this.props.value) {
      case 'none':
      case 'destroyed':
        // status idle
        return (<div className={classes.cn}>
          <div style={{'background': '#9B9B9B'}} className={classes.cell}>{'Idle'}</div>
        </div>)
      case 'initing':
      case 'inited':
      case 'starting':
        // status creating or confirm the create/edit button to trigger
        // should not enable create/edit button in specific service
        return (<div className={classes.cn}>
          <div style={{'background': '#7ED321'}} className={classes.cell}>{'Creating'}</div>
        </div>)
      case 'feeding':
      case 'feeded':
        // status in progress or confirm the load button to trigger
        // should not enable feed button in specific service
        return (<div className={classes.cn}>
          <div style={{'background': '#F5A623'}} className={classes.cell}>{'In progress'}</div>
          {this.props.data['progress']
            ? (<div className={`${classes.cell} ${classes.progress}`}>{this.props.data.progress}</div>)
            : (<div className={`${classes.cell} ${classes.progress}`}>0%</div>)
          }
        </div>)
      case 'destroying':
        // status in destroying or confirm the destroy button to trigger
        // should not enable destroy button in specific service
        return (<div className={classes.cn}>
          <div style={{'background': '#D0021B'}} className={classes.cell}>{'Destroying'}</div>
        </div>)
      case 'started':
      default:
        // status ready
        return (<div className={classes.cn}>
          <div style={{'background': '#4A90E2'}} className={classes.cell}>{'Ready'}</div>
        </div>)
    }
  }
}

export default CellRender
