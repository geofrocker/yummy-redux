import * as types from './actionTypes';
import url, { http } from '../config';
import { beginAjaxCall } from './ajaxStatusActions';

export function registerSuccess(message) {
  return { type: types.REGISTER_SUCCESS, message };
}
export function registerFails(message) {
  return { type: types.REGISTER_FAIL, message };
}

export function register(userData) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.post(`${url}auth/register`, userData)
      .then((response) => {
        dispatch(registerSuccess(response.data.Message));
      }).catch((xhr) => {
        // console.log(xhr)
        dispatch(registerFails(xhr));
        throw (xhr);
      });
  };
}
