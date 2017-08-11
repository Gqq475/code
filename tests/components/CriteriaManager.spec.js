import React from 'react'
import { CriteriaManager } from 'components/CriteriaManager/CriteriaManager'

describe('(Component) CriteriaManager', () => {
  it('render normally if criteriaManager and criteriaManagerDetail were not empty', () => {
    const data = {
      // cmTemplate: 'http://172.22.35.188:50080/api/criteria/condition?page_no={0}&page_size={1}&sort_by={2}&order={3}'
      criteriaManager: {
        result: {
          enabled: 1,
          id1ooc: 1.34,
          oos: 3.22,
          summary: 'V509-mn8-o5-5123',
          updateBy: 'unknown',
          updateTime: 'Jun 8, 2017 5:41:39 AM'
        }
      },
      criteriaManagerDetail: {
        result: {
          enabled: 1,
          id1ooc: 1.34,
          oos: 3.22,
          summary: 'V509-mn8-o5-5123',
          updateBy: 'unknown',
          updateTime: 'Jun 8, 2017 5:41:39 AM'
        }
      }
    }
    const wrapper = shallow(
      <CriteriaManager data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render normally if criteriaManager and criteriaManagerDetail were empty', () => {
    const data = {
      // cmTemplate: 'http://172.22.35.188:50080/api/criteria/condition?page_no={0}&page_size={1}&sort_by={2}&order={3}'
      criteriaManager: {},
      criteriaManagerDetail: {}
    }
    const wrapper = shallow(
      <CriteriaManager data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
