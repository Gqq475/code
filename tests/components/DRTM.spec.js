import React from 'react'
import { DRTM } from 'components/DRTM/DRTM'

describe('(Component) DRTM', () => {
  it('render normally if path of params is defectjudge', () => {
    const getCriteriaManagerDetail = jest.fn()
    const getDefectJudgeById = jest.fn()
    const submitJudge = jest.fn()
    const getCurrentAlarm = jest.fn()
    const criteriaManagerUpdate = jest.fn()
    const criteriaManagerAdd = jest.fn()
    const getDefectDetailById = jest.fn()
    const data = {
      drtm: {
        a: {
          a: '23'
        },
        b: {
          b: '23'
        }
      },
      params: {
        'path': 'defectjudge'
      },
      auth: {
        'token': 'autodefefdsfsdfdsctjudge'
      }
    }
    const wrapper = shallow(
      <DRTM {...data}
        getCriteriaManagerDetail={getCriteriaManagerDetail}
        getDefectJudgeById={getDefectJudgeById}
        submitJudge={submitJudge}
        getCurrentAlarm={getCurrentAlarm}
        criteriaManagerAdd={criteriaManagerAdd}
        criteriaManagerUpdate={criteriaManagerUpdate}
        getDefectDetailById={getDefectDetailById}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally if path of params is currentalarm', () => {
    const getCriteriaManagerDetail = jest.fn()
    const getDefectJudgeById = jest.fn()
    const submitJudge = jest.fn()
    const getCurrentAlarm = jest.fn()
    const criteriaManagerUpdate = jest.fn()
    const criteriaManagerAdd = jest.fn()
    const getDefectDetailById = jest.fn()
    const data = {
      drtm: {
        a: {
          a: '23'
        },
        b: {
          b: '23'
        }
      },
      params: {
        'path': 'currentalarm'
      },
      auth: {
        'token': 'autodefefdsfsdfdsctjudge'
      }
    }
    const wrapper = shallow(
      <DRTM {...data}
        getCriteriaManagerDetail={getCriteriaManagerDetail}
        getDefectJudgeById={getDefectJudgeById}
        submitJudge={submitJudge}
        getCurrentAlarm={getCurrentAlarm}
        criteriaManagerAdd={criteriaManagerAdd}
        criteriaManagerUpdate={criteriaManagerUpdate}
        getDefectDetailById={getDefectDetailById}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally if path of params is alarmhistory', () => {
    const getCriteriaManagerDetail = jest.fn()
    const getDefectJudgeById = jest.fn()
    const submitJudge = jest.fn()
    const getCurrentAlarm = jest.fn()
    const criteriaManagerUpdate = jest.fn()
    const criteriaManagerAdd = jest.fn()
    const getDefectDetailById = jest.fn()
    const data = {
      drtm: {
        a: {
          a: '23'
        },
        b: {
          b: '23'
        }
      },
      params: {
        'path': 'alarmhistory'
      },
      auth: {
        'token': 'autodefefdsfsdfdsctjudge'
      }
    }
    const wrapper = shallow(
      <DRTM {...data}
        getCriteriaManagerDetail={getCriteriaManagerDetail}
        getDefectJudgeById={getDefectJudgeById}
        submitJudge={submitJudge}
        getCurrentAlarm={getCurrentAlarm}
        criteriaManagerAdd={criteriaManagerAdd}
        criteriaManagerUpdate={criteriaManagerUpdate}
        getDefectDetailById={getDefectDetailById}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally if path of params is criteriamanager', () => {
    const getCriteriaManagerDetail = jest.fn()
    const getDefectJudgeById = jest.fn()
    const submitJudge = jest.fn()
    const getCurrentAlarm = jest.fn()
    const criteriaManagerUpdate = jest.fn()
    const criteriaManagerAdd = jest.fn()
    const getDefectDetailById = jest.fn()
    const data = {
      drtm: {
        a: {
          a: '23'
        },
        b: {
          b: '23'
        }
      },
      params: {
        'path': 'criteriamanager'
      },
      auth: {
        'token': 'autodefefdsfsdfdsctjudge'
      }
    }
    const wrapper = shallow(
      <DRTM {...data}
        getCriteriaManagerDetail={getCriteriaManagerDetail}
        getDefectJudgeById={getDefectJudgeById}
        submitJudge={submitJudge}
        getCurrentAlarm={getCurrentAlarm}
        criteriaManagerAdd={criteriaManagerAdd}
        criteriaManagerUpdate={criteriaManagerUpdate}
        getDefectDetailById={getDefectDetailById}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally if path of params is alarmrate', () => {
    const getCriteriaManagerDetail = jest.fn()
    const getDefectJudgeById = jest.fn()
    const submitJudge = jest.fn()
    const getCurrentAlarm = jest.fn()
    const criteriaManagerUpdate = jest.fn()
    const criteriaManagerAdd = jest.fn()
    const getDefectDetailById = jest.fn()
    const data = {
      drtm: {
        a: {
          a: '23'
        },
        b: {
          b: '23'
        }
      },
      params: {
        'path': 'alarmrate'
      },
      auth: {
        'token': 'autodefefdsfsdfdsctjudge'
      }
    }
    const wrapper = shallow(
      <DRTM {...data}
        getCriteriaManagerDetail={getCriteriaManagerDetail}
        getDefectJudgeById={getDefectJudgeById}
        submitJudge={submitJudge}
        getCurrentAlarm={getCurrentAlarm}
        criteriaManagerAdd={criteriaManagerAdd}
        criteriaManagerUpdate={criteriaManagerUpdate}
        getDefectDetailById={getDefectDetailById}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
