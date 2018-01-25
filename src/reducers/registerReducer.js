import * as types from '../actions/actionTypes'
import initialState from './initialState'
export default function registerReducer(state = initialState, action){
  switch(action.type){
    case types.REGISTER_SUCCESS:
      return {
        registerMessage:  action.registerMessage,
        status: action.status
      }
    case types.REGISTER_FAILS:
      return {
        registerMessage:action.registerMessage
      }
    default:
      return state;

  }
}