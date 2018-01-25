import * as types from '../actions/actionTypes'
import initialState from './initialState'
export default function loginReducer(state = initialState, action){
  switch(action.type){
    case types.LOGIN_FAILS:
      return action.loginMessage
    default:
      return state;

  }
}