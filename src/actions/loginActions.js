import * as types from './actionTypes';
import url, { http } from '../config';
import { beginAjaxCall } from './ajaxStatusActions';

export function loginFails(message) {
  return { type: types.LOGIN_FAIL, message };
}
export function loginSuccess(message) {
  return { type: types.LOGIN_SUCCESS, message };
}

export function login(userData) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.post(`${url}auth/login`, userData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('user', response.data.username);
        dispatch(loginSuccess(response.data.token));
      }).catch((xhr) => {
        dispatch(loginFails(xhr));
        throw (xhr);
      });
  };
}
