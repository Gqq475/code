import React from 'react'
import { AlarmCommentEditor } from 'components/AlarmCommentEditor/AlarmCommentEditor'

describe('(Component) AlarmCommentEditor', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <AlarmCommentEditor />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
