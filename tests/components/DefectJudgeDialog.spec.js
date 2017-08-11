import React from 'react'
import DefectJudgeDialog from 'components/DefectJudgeDialog/DefectJudgeDialog'
import {shallow} from 'enzyme'
import { Dialog } from '@blueprintjs/core'

describe('(Component) DefectJudgeDialog', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<DefectJudgeDialog />)
  })

  it('should exist', () => {
    expect(_wrapper.find(Dialog)).toHaveLength(1)
  })
})
