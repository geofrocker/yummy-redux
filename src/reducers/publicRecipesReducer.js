import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function publicRecipesReducer(state = initialState.publicRecipes, action){
  switch(action.type){
    case types.LOAD_PUBLIC_RECIPES_SUCCESS:
      return action.publicRecipes
  
    default:
      return state;

  }
}