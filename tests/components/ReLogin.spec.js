import React from 'react'
import { ReLogin } from 'components/ReLogin/ReLogin'

describe('(Component) ReLogin', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <ReLogin />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
