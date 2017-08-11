import React from 'react'
import { SubNav } from 'components/SubNav/SubNav'

describe('(Component) SubNav', () => {
  it('render normally', () => {
    const props = {
      'location': 'SADJ',
      'params': {
        'path': 'autodefectjudge'
      }
    }
    const wrapper = shallow(
      <SubNav {...props} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
