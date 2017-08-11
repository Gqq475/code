import React from 'react'
import {AlarmNotifyDialog} from 'components/AlarmNotifyDialog/AlarmNotifyDialog'

describe('(Component) AlarmNotifyDialog', () => {
  it('render normally', () => {
    const data = {
      'notifyDialogIsOpen': false,
      'id': 1,
      'alarmType': 'warning',
      'reporter': 'admin',
      'token': 'ejfdsjlfd'
    }
    const wrapper = shallow(
      <AlarmNotifyDialog {...data} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
