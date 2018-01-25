import * as types from './actionTypes'
import  url, { http } from '../config'

export function registerSuccess(message, status){
  return{ type: types.REGISTER_SUCCESS, registerMessage:message,status}
}
export function registerFails(message){
  return{ type: types.REGISTER_FAILS, registerMessage:message}
}

export function register(userData){
  return function(dispatch){
    return http.post(url+'auth/register',userData)
        .then((response)=>{
          dispatch(registerSuccess(response.data.Message, response.data.status));
      }).catch(xhr => {
        dispatch(registerFails(xhr.response.data.Message));
      });
  }
}