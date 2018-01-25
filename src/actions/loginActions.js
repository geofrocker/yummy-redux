import * as types from './actionTypes'
import  url, { http } from '../config'

export function loginFails(message){
  return{ type: types.LOGIN_FAILS, loginMessage:message}
}

export function login(userData){
  return function(dispatch){
    return http.post(url+'auth/login',userData)
        .then((response)=>{
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('isLoggedIn',true)
          localStorage.setItem('user', response.data.username)
      }).catch(xhr => {
        dispatch(loginFails(xhr.response.data.error));
      });
  }
}