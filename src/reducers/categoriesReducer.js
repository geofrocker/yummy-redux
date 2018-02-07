import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function categoriesReducer(state = initialState.categories, action) {
  switch (action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.data.Category_list,
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
    default:
      return state;
  }
}
