import React from 'react'
import {AutoDefectJudgeZone} from 'components/AutoDefectJudgeZone/AutoDefectJudgeZone'
import Svg from 'components/AutoDefectJudgeZone/Svg'
describe('(Component) AutoDefectJudgeZone', () => {
  it('render normally', () => {
    const data = {
      result: {
        judgeresults: [
          {
            noData: 'no'
          }
        ],
        pageNO: 1,
        totalNum: 0,
        totalPage: 0
      }
    }

    // Function 使用 jest.fn()， 用這個而不用 () => {}
    // 的原因是， jest.fn () 可以記錄這個 function 被呼叫了幾次，
    // 範例如下：
    const handlePageClick = jest.fn()
    // console.log(handlePageClick.mock.calls.length); // =>  0
    const wrapper = shallow(<AutoDefectJudgeZone
      data={data}
      handlePageClick={handlePageClick}
      />
    )
    // AutoDefectJudgeZone 有呼叫過 handlePageClick，所以呼叫次數會變一次，如下
    // console.log(handlePageClick.mock.calls.length); // =>  1

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
describe('(Component) Svg', () => {
  it('render normally', () => {
    const data = {
      info: {
        x: 123,
        y: 60,
        width: 100,
        height: 100,
        proportion: 243
      }
    }
    const wrapper = shallow(
      <Svg {...data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
