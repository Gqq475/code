import moment from 'moment'
import { withState, withHandlers, compose } from 'recompose'
import { includes } from 'lodash'

exports.dateHOC = compose(
  withState('dateStart', 'setStart', moment().startOf('day')),
  withState('dateEnd', 'setEnd', moment().endOf('day')),
  withHandlers({
    handleStartDayChange: ({ dateStart, setStart }) => (date) => {
      let oldDate = moment(new Date(dateStart))
      let newDate = moment(new Date(date))
      setStart(newDate.set({
        hour: oldDate.get('hour'),
        minute: oldDate.get('minute')
      }))
    },
    handleEndDayChange: ({ dateEnd, setEnd }) => (date) => {
      let oldDate = moment(new Date(dateEnd))
      let newDate = moment(new Date(date))
      setEnd(newDate.set({
        hour: oldDate.get('hour'),
        minute: oldDate.get('minute')
      }))
    },
    handleStartTimeChange: ({ dateStart, setStart }) => (date) => {
      let oldDate = moment(new Date(dateStart))
      let newDate = moment(new Date(date))
      setStart(newDate.set({
        year: oldDate.get('year'),
        month: oldDate.get('month'),
        date: oldDate.get('date')
      }))
    },
    handleEndTimeChange: ({ dateEnd, setEnd }) => (date) => {
      let oldDate = moment(new Date(dateEnd))
      let newDate = moment(new Date(date))
      setEnd(newDate.set({
        year: oldDate.get('year'),
        month: oldDate.get('month'),
        date: oldDate.get('date')
      }))
    }
  })
)

exports.format = function (str, args) {
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] !== 'undefined'
        ? args[number]
        : match
  })
}

// For AG Grid only
exports.dataFormat = function (data, field) {
  let formatted = []
  data.map((d) => {
    let data = []
    Object.values(field).map(f => {
      d[f] = this.formatDate(d[f])
      data[f] = d[f] || (d[f] === false ? 'FALSE' : '-')
    })
    formatted.push(data)
  })
  return formatted
}

exports.formatDate = function (d) {
  // The same logic with Table
  if (+d && new Date(+d).getTime() > 140000000) {
    let date = new Date(d).toISOString()
    return `${date.substr(0, 10)} ${date.substr(11, 8)}`
  } else {
    return d
  }
}

exports.identifyRole = (userRole) => {
  if (includes(userRole, 2) || includes(userRole, 3)) {
    return 'admin'
  } else if (includes(userRole, 4)) {
    return 'user'
  } else {
    return 'guest-only'
  }
}
