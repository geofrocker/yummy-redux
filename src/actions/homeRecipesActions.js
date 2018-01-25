import * as types from './actionTypes'
import { http } from '../config'

export function loadPublicRecipesSuccess(publicRecipes){
  return{type: types.LOAD_PUBLIC_RECIPES_SUCCESS, publicRecipes}
}


export function loadPublicRecipes(recipesUrl){
  return function(dispatch){
    return http.get(recipesUrl)
        .then(response=>{
          dispatch(loadPublicRecipesSuccess(response.data));
      }).catch(error => {
        throw(error);
      });
  }
}