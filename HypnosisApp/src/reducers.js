import { combineReducers } from 'redux'

import {
  SUBMIT_SURVEY, SUBMIT_FEEDBACK, RESET_STORE
} from './actions';

function surveys(state = [], action) {
  switch (action.type) {
    case SUBMIT_SURVEY:
      return [...state, action.payload];
    default:
      return state
  }
}

function feedbacks(state = [], action) {
  switch (action.type) {
    case SUBMIT_FEEDBACK:
      return [
        ...state,
        {
          timestamp: action.timestamp,
          contact: action.contact,
          content: action.content
        }
      ]
    default:
      return state
  }
}


const appReducers = combineReducers({
  surveys,
  feedbacks
})

const initialState = appReducers({}, {})

export default rootReducer = (state = {}, action) => {
  if (action.type === RESET_STORE){
    state = initialState
    console.warn("State reset")
  }
  return appReducers(state, action)
}