import React from 'react'
import { FeedImgDialog } from 'components/ServiceManagementList/FeedImgDialog'

describe('(Component) FeedImgDialog', () => {
  it('render normally', () => {
    const wrapper = shallow(
      <FeedImgDialog />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
