import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.LOGIN_FAIL:
      return {
        ...state.message,
        message: action.message,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state.message,
        message: action.message,
      };
    default:
      return state;
  }
}
