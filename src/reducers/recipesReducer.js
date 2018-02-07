import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function recipesReducer(state = initialState.recipes, action) {
  switch (action.type) {
    case types.LOAD_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: action.data.Recipe_list,
        page: action.data.page,
        total_pages: action.data.total_pages,
        has_next: action.data.has_next,
        has_prev: action.data.has_prev,
        previous_page: action.data.previous_page,
        next_page: action.data.next_page,
      };
    case types.LOAD_RECIPES_FAIL:
      return {
        ...state,
        message: action.message,
        recipes: [],
      };
    case types.LOAD_RECIPE_SUCCESS:
      return {
        ...state,
        recipe: action.recipeData,
      };
    case types.LOAD_RECIPE_FAIL:
      return {
        ...state,
        message: action.error,
      };
    case types.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: state.recipes,
      };
    case types.ADD_RECIPE_FAIL:
      return {
        ...state,
        message: action.message,
      };
    case types.UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: state.recipes,
      };
    case types.UPDATE_RECIPE_FAIL:
      return {
        ...state,
        message: action.message,
      };
    case types.DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: state.recipes,
      };
    case types.DELETE_RECIPE_FAIL:
      return {
        ...state,
        message: action.message,
      };
    case types.LOAD_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.reviews,
      };
    case types.LOAD_REVIEWS_FAIL:
      return {
        ...state,
        message: action.placeholder,
      };
    case types.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        review: action.review,
        message: action.message,
      };
    case types.UPVOTE_SUCCESS:
      return {
        ...state,
        message: action.message,
      };
    case types.UPVOTE_FAIL:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
}
