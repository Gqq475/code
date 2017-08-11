import React from 'react'
import { Navbar } from 'components/Navbar/Navbar'

describe('(Component) Navbar', () => {
  it('render normally if path is qca', () => {
    const props = {
      route: {
        path: 'qca(/:path)'
      }
    }
    const wrapper = shallow(
      <Navbar {...props} />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally if path is ojs', () => {
    const props = {
      route: {
        path: 'ojs(/:path)'
      }
    }
    const wrapper = shallow(
      <Navbar {...props} />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally if path is drtm', () => {
    const props = {
      route: {
        path: 'drtm(/:path)'
      }
    }
    const wrapper = shallow(
      <Navbar {...props} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
