import React from 'react'
import QCAFilter from 'components/QCAFilter/QCAFilter'

describe('(Component) QCAFilter', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <QCAFilter />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
