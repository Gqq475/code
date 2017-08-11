import React from 'react'
import { ModelTrain } from 'components/ModelTrain/ModelTrain'

describe('(Component) ModelTrain', () => {
  it('render normally', () => {
    const data = {
      'modelTrainList': [
        {
          defectTypeCount: 1,
          eqCode: 'TestEqCode',
          id: 317
        },
        {
          defectTypeCount: 5,
          eqCode: 'TestEqCode',
          id: 3
        }
      ]
    }
    const wrapper = shallow(
      <ModelTrain data={data} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
