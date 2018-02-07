import * as types from './actionTypes';
import url, { http } from '../config';
import { beginAjaxCall } from './ajaxStatusActions';

export function loadRecipesSuccess(data) {
  return { type: types.LOAD_RECIPES_SUCCESS, data };
}
export function loadRecipesFail(message) {
  return { type: types.LOAD_RECIPES_FAIL, message };
}

export function loadRecipes(recipesUrl) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.get(recipesUrl)
      .then((response) => {
        dispatch(loadRecipesSuccess(response.data));
      }).catch((xhr) => {
        dispatch(loadRecipesFail(xhr.response.data.message));
      });
  };
}

export function loadRecipeSuccess(recipeData) {
  return { type: types.LOAD_RECIPE_SUCCESS, recipeData };
}

export function loadRecipeFail(error) {
  return { type: types.LOAD_RECIPE_FAIL, error };
}

export function loadRecipe(recipeId) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.get(`${url}${recipeId}`).then((response) => {
      dispatch(loadRecipeSuccess(response.data.Recipe_Item));
    }).catch((xhr) => {
      dispatch(loadRecipeFail(xhr.response.data.message));
    });
  };
}

export function addRecipeSuccess() {
  return { type: types.ADD_RECIPE_SUCCESS };
}
export function addRecipeFail(message) {
  return { type: types.ADD_RECIPE_FAIL, message };
}

export function addRecipe(recipeData) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.post(url, recipeData)
      .then((response) => {
        dispatch(addRecipeSuccess());
      }).catch((xhr) => {
        dispatch(addRecipeFail(xhr.response.data.Message));
        throw (xhr);
      });
  };
}

export function updateRecipeSuccess() {
  return { type: types.UPDATE_RECIPE_SUCCESS };
}
export function updateRecipeFail(message) {
  return { type: types.UPDATE_RECIPE_FAIL, message };
}

export function updateRecipe(id, recipeData) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.put(`${url}${id}`, recipeData)
      .then((response) => {
        dispatch(updateRecipeSuccess());
      }).catch((xhr) => {
        dispatch(updateRecipeFail(xhr.response.data.Message));
        throw (xhr);
      });
  };
}

export function deleteRecipeSuccess() {
  return { type: types.DELETE_RECIPE_SUCCESS };
}
export function deleteRecipeFail(message) {
  return { type: types.DELETE_RECIPE_FAIL, message };
}

export function deleteRecipe(id) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.delete(`${url}${id}`)
      .then((response) => {
        dispatch(deleteRecipeSuccess());
      }).catch((xhr) => {
        dispatch(deleteRecipeFail(xhr.response.data.Message));
        throw (xhr);
      });
  };
}

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

export function loadReviewsSuccess(reviews) {
  return { type: types.LOAD_REVIEWS_SUCCESS, reviews };
}

export function loadReviewsFail(placeholder) {
  return { type: types.LOAD_REVIEWS_FAIL, placeholder };
}

export function loadReviews(recipeId) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.get(`${url}recipe/review/${recipeId}`).then((response) => {
      dispatch(loadReviewsSuccess(response.data.Review_list));
      dispatch(loadReviewsFail(false));
    }).catch((xhr) => {
      dispatch(loadReviewsFail(true));
    });
  };
}

export function createReviewSuccess(review, message) {
  return { type: types.CREATE_REVIEW_SUCCESS, review, message };
}

export function createReview(recipeId, content) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.post(`${url}recipe/review/${recipeId}`, content)
      .then((response) => {
        dispatch(createReviewSuccess(response.data.review, response.data.message));
      }).catch((xhr) => {
        throw xhr;
      });
  };
}
export function upvoteRecipeSuccess(message) {
  return { type: types.UPVOTE_SUCCESS, message };
}
export function upvoteRecipeFail(message) {
  return { type: types.UPVOTE_FAIL, message };
}

export function upvoteRecipe(recipeId) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return http.get(`${url}recipe/upvote/${recipeId}`)
      .then((response) => {
        dispatch(upvoteRecipeSuccess(response.data.message));
      }).catch((xhr) => {
        dispatch(upvoteRecipeFail(xhr.response.data.message));
        throw (xhr);
      });
  };
}

