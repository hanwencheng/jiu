import { createStore, combineReducers, applyMiddleware } from 'redux'
import { receiptReducer } from './receiptReducer'

const logger = store => next => action => {
  console.group(action.type)
  // console.info('dispatching', action);
  let result = next(action)
  // console.log('next state', store.getState());
  console.groupEnd()
  return result
}

const enableBatching = reducer => {
  return function batchingReducer(state, action) {
    switch (action.type) {
      case 'BATCH_ACTIONS':
        return action.actions.reduce(batchingReducer, state)
      default:
        return reducer(state, action)
    }
  }
}

const reducers = combineReducers({
  receipt: receiptReducer,
})

export const store = createStore(
  enableBatching(reducers),
  applyMiddleware(logger)
)
