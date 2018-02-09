import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function categoriesReducer(state = initialState.categories, action) {
  switch (action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.data.Category_list,
        page: action.data.page,
        total_pages: action.data.total_pages,
        has_next: action.data.has_next,
        has_prev: action.data.has_prev,
        previous_page: action.data.previous_page,
        next_page: action.data.next_page,
      };
    case types.LOAD_CATEGORIES_FAIL:
      return {
        ...state,
        message: action.message,
        categories: [],
      };
    case types.LOAD_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.data,
      };
    case types.LOAD_CATEGORY_FAIL:
      return {
        ...state,
        message: action.message,
      };
    case types.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories,
      };
    case types.ADD_CATEGORY_FAIL:
      return {
        ...state,
        message: action.message,
      };
    case types.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories,
      };
    case types.UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        message: action.message,
      };
    case types.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories,
      };
    case types.DELETE_CATEGORY_FAIL:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
}
