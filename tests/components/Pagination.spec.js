import React from 'react'
import Pagination from 'components/Pagination/Pagination'

describe('(Component) Pagination', () => {
  it('render totalpage>5 normally', () => {
    const goPrev = jest.fn()
    const goNext = jest.fn()
    const pageClick = jest.fn()
    const switchChange = jest.fn()
    const data = {
      current: 1,
      total: 20,
      totalPage: 20
    }
    const wrapper = shallow(
      <Pagination {...data}
        goPrev={goPrev}
        goNext={goNext}
        pageClick={pageClick}
        switchChange={switchChange}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render totalpage<5 normally', () => {
    const goPrev = jest.fn()
    const goNext = jest.fn()
    const pageClick = jest.fn()
    const switchChange = jest.fn()
    const data = {
      current: 1,
      total: 3,
      totalPage: 3
    }
    const wrapper = shallow(
      <Pagination {...data}
        goPrev={goPrev}
        goNext={goNext}
        pageClick={pageClick}
        switchChange={switchChange}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
