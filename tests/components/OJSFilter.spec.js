import React from 'react'
import OJSFilter from 'components/OJSFilter/OJSFilter'

describe('(Component) OJSFilter', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <OJSFilter />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
