import * as types from '../actions/actionTypes'
import initialState from './initialState'
export default function registerReducer(state = initialState, action){
  switch(action.type){
    case types.REGISTER_SUCCESS:
      return {
        message:  action.message,
        status: action.status
      }
    case types.REGISTER_FAILS:
      return {
        message:action.message
      }
    default:
      return state;

  }
}