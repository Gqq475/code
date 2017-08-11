export const COUNTER_INCREMENT = '<%= pascalEntityName %>.COUNTER_INCREMENT'

export function increment (data) {
  return {
    type: COUNTER_INCREMENT,
    data
  }
}

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter))
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  increment,
  doubleAsync
}

const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => {
    return Object.assign({}, state, {
      'stateName': state.date
    })
  }
}

const initialState = {}
export default function <%= pascalEntityName%>Reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
