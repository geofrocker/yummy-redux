import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import initialState from '../reducers/initialState';
import * as registerActions from '../actions/registerActions';
import * as loginActions from '../actions/loginActions';
import * as recipesActions from '../actions/recipesActions';
import * as categoryActions from '../actions/categoriesAction';
import configureStore from '../store/configureStore';

describe('Store', () => {
  it('should handle registering users', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'You are now registered';

    const action = registerActions.registerSuccess(message);
    store.dispatch(action);
    const actual = store.getState().auth.message;
    const expected = 'You are now registered';
    expect(actual).toEqual(expected);
  });

  it('should handle failed registration', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'user registration failed';

    const action = registerActions.registerFails(message);
    store.dispatch(action);
    const actual = store.getState().auth.message;
    const expected = 'user registration failed';
    expect(actual).toEqual(expected);
  });

  it('should handle successful login', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'user are now logged in';

    const action = loginActions.loginSuccess(message);
    store.dispatch(action);
    const actual = store.getState().auth.message;
    const expected = 'user are now logged in';
    expect(actual).toEqual(expected);
  });

  it('should handle failed login', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'login not successful';

    const action = loginActions.loginFails(message);
    store.dispatch(action);
    const actual = store.getState().auth.message;
    const expected = 'login not successful';
    expect(actual).toEqual(expected);
  });

  it('should return all recipes on success', () => {
    const store = createStore(rootReducer, initialState);
    const data = {
      Recipe_list: {
        title: 'Lorem Ipsum',
      },
      page: 1,
      total_pages: 1,
      has_next: false,
      has_prev: false,
      previous_page: '',
      next_page: '',
    };

    const action = recipesActions.loadRecipesSuccess(data);
    store.dispatch(action);
    const actual = store.getState().recipes.recipes;
    const expected = { title: 'Lorem Ipsum' };
    expect(actual).toEqual(expected);
  });

  it('should return message on load recipes fail', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'No recipes available';

    const action = recipesActions.loadRecipesFail(message);
    store.dispatch(action);
    const actual = store.getState().recipes.message;
    const expected = 'No recipes available';
    expect(actual).toEqual(expected);
  });

  it('should load a single recipe', () => {
    const store = createStore(rootReducer, initialState);
    const recipeData = { title: 'Lorem Ipsum' };

    const action = recipesActions.loadRecipeSuccess(recipeData);
    store.dispatch(action);
    const actual = store.getState().recipes.recipe;
    const expected = { title: 'Lorem Ipsum' };
    expect(actual).toEqual(expected);
  });

  it('should return a message when loading recipes fails', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'Recipe not found';
    const action = recipesActions.loadRecipeFail(message);
    store.dispatch(action);
    const actual = store.getState().recipes.message;
    const expected = 'Recipe not found';
    expect(actual).toEqual(expected);
  });

  it('should return all recipes in the state after adding recipes', () => {
    const store = createStore(rootReducer, initialState);
    const action = recipesActions.addRecipeSuccess();
    store.dispatch(action);
    const actual = store.getState().recipes.recipes;
    const expected = [];
    expect(actual).toEqual(expected);
  });

  it('should return message if adding recipes fail', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'Recipe Not Created';
    const action = recipesActions.addRecipeFail(message);
    store.dispatch(action);
    const actual = store.getState().recipes.message;
    const expected = 'Recipe Not Created';
    expect(actual).toEqual(expected);
  });

  it('should return previous state if updating recipe succeeds', () => {
    const store = createStore(rootReducer, initialState);
    const action = recipesActions.updateRecipeSuccess();
    store.dispatch(action);
    const actual = store.getState().recipes.recipes;
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('should return message if updating recipe fails', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'Recipe update failed';
    const action = recipesActions.updateRecipeFail(message);
    store.dispatch(action);
    const actual = store.getState().recipes.message;
    const expected = 'Recipe update failed';
    expect(actual).toEqual(expected);
  });

  it('should return previous state if deleting recipe succeeds', () => {
    const store = createStore(rootReducer, initialState);
    const action = recipesActions.deleteRecipeSuccess();
    store.dispatch(action);
    const actual = store.getState().recipes.recipes;
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('should return message if deleting recipe fails', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'Recipe deletion failed';
    const action = recipesActions.deleteRecipeFail(message);
    store.dispatch(action);
    const actual = store.getState().recipes.message;
    const expected = 'Recipe deletion failed';
    expect(actual).toEqual(expected);
  });

  it('should load a reviews', () => {
    const store = createStore(rootReducer, initialState);
    const reviews = { content: 'Lorem Ipsum' };

    const action = recipesActions.loadReviewsSuccess(reviews);
    store.dispatch(action);
    const actual = store.getState().recipes.reviews;
    const expected = { content: 'Lorem Ipsum' };
    expect(actual).toEqual(expected);
  });

  it('should return a message when loading reviews fails', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'No reviews found';
    const action = recipesActions.loadReviewsFail(message);
    store.dispatch(action);
    const actual = store.getState().recipes.message;
    const expected = 'No reviews found';
    expect(actual).toEqual(expected);
  });

  it('should create reviews', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'No reviews found';
    const review = { content: 'Awesome recipe' };
    const action = recipesActions.createReviewSuccess(review, message);
    store.dispatch(action);
    const actual1 = store.getState().recipes.review;
    const actual2 = store.getState().recipes.message;
    const expected1 = { content: 'Awesome recipe' };
    const expected2 = 'No reviews found';
    expect(actual1).toEqual(expected1);
    expect(actual2).toEqual(expected2);
  });

  it('should return message if upvoting succedds', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'Thank you for voting';
    const action = recipesActions.upvoteRecipeSuccess(message);
    store.dispatch(action);
    const actual = store.getState().recipes.message;
    const expected = 'Thank you for voting';
    expect(actual).toEqual(expected);
  });
  it('should return message if upvoting fails', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'You have already voted';
    const action = recipesActions.upvoteRecipeFail(message);
    store.dispatch(action);
    const actual = store.getState().recipes.message;
    const expected = 'You have already voted';
    expect(actual).toEqual(expected);
  });

  it('should return all categories on success', () => {
    const store = createStore(rootReducer, initialState);
    const data = {
      Category_list: {
        name: 'Lorem Ipsum',
      },
      page: 1,
      total_pages: 1,
      has_next: false,
      has_prev: false,
      previous_page: '',
      next_page: '',
    };

    const action = categoryActions.loadCategoriesSuccess(data);
    store.dispatch(action);
    const actual = store.getState().categories.categories;
    const expected = { name: 'Lorem Ipsum' };
    expect(actual).toEqual(expected);
  });

  it('should return message on load categories fail', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'No categories available';

    const action = recipesActions.loadCategoriesFail(message);
    store.dispatch(action);
    const actual = store.getState().categories.message;
    const expected = 'No categories available';
    expect(actual).toEqual(expected);
  });

  it('should load a single category', () => {
    const store = createStore(rootReducer, initialState);
    const data = { name: 'Lorem' };

    const action = categoryActions.loadCategorySuccess(data);
    store.dispatch(action);
    const actual = store.getState().categories.category;
    const expected = { name: 'Lorem' };
    expect(actual).toEqual(expected);
  });

  it('should return a message when loading category fails', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'Category not found';
    const action = categoryActions.loadCategoryFail(message);
    store.dispatch(action);
    const actual = store.getState().categories.message;
    const expected = 'Category not found';
    expect(actual).toEqual(expected);
  });

  it('should return previous state if adding category succeeds', () => {
    const store = createStore(rootReducer, initialState);
    const action = categoryActions.addCategorySuccess();
    store.dispatch(action);
    const actual = store.getState().categories.categories;
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('should return message if adding category fails', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'Category creation failed';
    const action = categoryActions.addCategoryFail(message);
    store.dispatch(action);
    const actual = store.getState().categories.message;
    const expected = 'Category creation failed';
    expect(actual).toEqual(expected);
  });

  it('should return previous state if updating category succeeds', () => {
    const store = createStore(rootReducer, initialState);
    const action = categoryActions.updateCategorySuccess();
    store.dispatch(action);
    const actual = store.getState().categories.categories;
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('should return message if updating category fails', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'Category update failed';
    const action = categoryActions.updateCategoryFail(message);
    store.dispatch(action);
    const actual = store.getState().categories.message;
    const expected = 'Category update failed';
    expect(actual).toEqual(expected);
  });

  it('should return previous state if deleting category succeeds', () => {
    const store = createStore(rootReducer, initialState);
    const action = categoryActions.deleteCategorySuccess();
    store.dispatch(action);
    const actual = store.getState().categories.categories;
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('should return message if deleting category fails', () => {
    const store = createStore(rootReducer, initialState);
    const message = 'Category deletion failed';
    const action = categoryActions.deleteCategoryFail(message);
    store.dispatch(action);
    const actual = store.getState().categories.message;
    const expected = 'Category deletion failed';
    expect(actual).toEqual(expected);
  });
});
