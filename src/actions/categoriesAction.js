import * as types from './actionTypes';
import url, { http } from '../config';
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

export function loadCategorySuccess(data) {
  return { type: types.LOAD_CATEGORY_SUCCESS, data };
}
export function loadCategoryFail(message) {
  return { type: types.LOAD_CATEGORY_FAIL, message };
}

export function loadCategory(categoryUrl) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.get(categoryUrl)
      .then((response) => {
        dispatch(loadCategorySuccess(response.data.Category_Item));
      }).catch((xhr) => {
        dispatch(loadCategoryFail(xhr.response.data.message));
      });
  };
}

export function addCategorySuccess() {
  return { type: types.ADD_CATEGORY_SUCCESS };
}
export function addCategoryFail(message) {
  return { type: types.ADD_CATEGORY_FAIL, message };
}

export function addCategory(localurl, catData) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.post(localurl, catData)
      .then((response) => {
        dispatch(addCategorySuccess());
      }).catch((xhr) => {
        dispatch(addCategoryFail(xhr.response.data.Message));
        throw (xhr);
      });
  };
}

export function updateCategorySuccess() {
  return { type: types.UPDATE_CATEGORY_SUCCESS };
}
export function updateCategoryFail(message) {
  return { type: types.UPDATE_CATEGORY_FAIL, message };
}

export function updateCategory(id, catData) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.put(`${url}category/${id}`, catData)
      .then((response) => {
        dispatch(updateCategorySuccess());
      }).catch((xhr) => {
        dispatch(updateCategoryFail(xhr.response.data.Message));
        throw (xhr);
      });
  };
}

export function deleteCategorySuccess() {
  return { type: types.DELETE_CATEGORY_SUCCESS };
}
export function deleteCategoryFail(message) {
  return { type: types.DELETE_CATEGORY_FAIL, message };
}

export function deleteCategory(id) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.delete(`${url}category/${id}`)
      .then((response) => {
        dispatch(deleteCategorySuccess());
      }).catch((xhr) => {
        dispatch(deleteCategoryFail(xhr.response.data.Message));
        throw (xhr);
      });
  };
}
