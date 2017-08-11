import React from 'react'
import { DetailCenter } from 'components/CriteriaManagerZone/DetailCenter'

describe('(Component) DetailCenter', () => {
  it('render normally', () => {
    const data = {
      'ooc': '1',
      'oos': '2'
    }
    const wrapper = shallow(
      <DetailCenter data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
