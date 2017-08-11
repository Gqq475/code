import React from 'react'
import ModelDetail from 'components/ModelDetail/ModelDetail'

describe('(Component) ModelDetail', () => {
  it('render normally', () => {
    const data = {
      'id': 3
    }
    const wrapper = shallow(
      <ModelDetail data={data} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
