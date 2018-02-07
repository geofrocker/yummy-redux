import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function registerReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      return {
        ...state.message,
        message: action.message,
      };
    case types.REGISTER_FAIL:
      return {
        ...state.message,
        message: action.message,
      };
    default:
      return state;
  }
}
