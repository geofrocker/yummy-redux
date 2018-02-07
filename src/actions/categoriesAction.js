import * as types from './actionTypes';
import { http } from '../config';
import { beginAjaxCall } from './ajaxStatusActions';

export function loadCategoriesSuccess(data) {
  return { type: types.LOAD_CATEGORIES_SUCCESS, data };
}
export function loadCategoriesFail(message) {
  return { type: types.LOAD_CATEGORIES_FAIL, message };
}

export function loadCategories(categoriesUrl) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.get(categoriesUrl)
      .then((response) => {
        dispatch(loadCategoriesSuccess(response.data));
      }).catch((xhr) => {
        dispatch(loadCategoriesFail(xhr.response.data.message));
      });
  };
}

