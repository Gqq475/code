import React from 'react'
import classes from './AlarmHistory.scss'
import HistoryTable from 'components/Table'
import AlarmDetail from 'components/AlarmDetail'

type Props = {
  data: Object,
  token: String
};

const field = {
  [_.ID]: 'id',
  [_.STATUS]: 'status',
  [_.ALARMTYPE]: 'type',
  [_.ALARMLEVEL]: 'level',
  [_.PRODUCTID]: 'productCode',
  [_.LINEID]: 'lineCode',
  [_.OPERATIONID]: 'operationCode',
  [_.SUBENTITY]: 'subEqCode',
  [_.OOC]: 'ooc',
  [_.OOS]: 'oos',
  [_.REAL]: 'realValue',
  [_.LASTUPDATE]: 'updateTime'
}

export class AlarmHistory extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.updateSelected = this.updateSelected.bind(this)
    this.state = {
      id: 0
    }
  }

  updateSelected (id) {
    if (id !== this.state.id) {
      this.setState({ id })
    }
  }

  render () {
    return (
      <div className={classes['AlarmHistory-container']}>
        {
          this.props.data.alarmHistory &&
            <HistoryTable
              field={field}
              data={this.props.data.alarmHistory}
              handleClick={this.updateSelected} />
        }
        <AlarmDetail
          token={this.props.token}
          data={this.props.data.alarmHistory}
          id={this.state.id}
          />
      </div>
    )
  }
}

export default AlarmHistory
