import {useReducer} from 'react'
import {produce} from 'immer' // import produce from immer if you want to directly mutate state inside your reducer!
import Card from '../components/Card'
import Button from '../components/Button'

const INCREMENT_COUNT = 'increment-count'
const DECREMENT_COUNT = 'decrement-count'
const SET_VALUE_TO_ADD = 'set-value-to-add'
const ADD_VALUE_TO_COUNT = 'add-value-to-count'

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      // We can directly mutate state because we are using the immer library!
      state.count = state.count + 1
      // Always return at the end of each case
      return
    case DECREMENT_COUNT:
      return {
        ...state,
        count: state.count - 1,
      }
    case SET_VALUE_TO_ADD:
      return {
        ...state,
        valueToAdd: action.payload,
      }
    case ADD_VALUE_TO_COUNT:
      return {
        ...state,
        count: state.count + state.valueToAdd,
        valueToAdd: 0,
      }
    default:
      return state
  }
  // if (action.type === INCREMENT_COUNT) {
  //   return {
  //     ...state,
  //     count: state.count + 1,
  //   }
  // }
  // if (action.type === DECREMENT_COUNT) {
  //   return {
  //     ...state,
  //     count: state.count - 1,
  //   }
  // }
  // if (action.type === SET_VALUE_TO_ADD) {
  //   return {
  //     ...state,
  //     valueToAdd: action.payload,
  //   }
  // }
  // if (action.type === ADD_VALUE_TO_COUNT) {
  //   return {
  //     ...state,
  //     count: state.count + state.valueToAdd,
  //     valueToAdd: 0,
  //   }
  // }
  // return state
}

export default function CounterPage({initialCount}) {
  // const [count, setCount] = useState(initialCount)
  // const [valueToAdd, setValueToAdd] = useState(0)
  // To use immer we have to wrap our reducer with immer produce
  const [state, dispatch] = useReducer(produce(reducer), {
    count: initialCount,
    valueToAdd: 0,
  })

  const increment = () => {
    // setCount(count + 1)
    dispatch({type: INCREMENT_COUNT})
  }

  const decrement = () => {
    // setCount(count - 1)
    dispatch({type: DECREMENT_COUNT})
  }

  const handleChange = (event) => {
    const value = parseInt(event.target.value) || 0
    // setValueToAdd(value)
    dispatch({type: SET_VALUE_TO_ADD, payload: value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // setCount(count + valueToAdd)
    // setValueToAdd(0)
    dispatch({type: ADD_VALUE_TO_COUNT})
  }

  return (
    <Card className="m-4">
      <h1 className="text-xl mb-4">Count is currently: {state.count}</h1>
      <div className="flex flex-row">
        <Button success outline rounded onClick={increment}>
          Increment
        </Button>
        <Button danger outline rounded onClick={decrement}>
          Decrement
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Add a custom amount to the count</label>
        <input
          value={state.valueToAdd || ''}
          onChange={handleChange}
          type="number"
          className="p-1 m-4 bg-slate-50 border border-slate-300"
        />
        <Button primary outline rounded>
          Add Custom Amount
        </Button>
      </form>
    </Card>
  )
}
