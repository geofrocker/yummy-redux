import { combineReducers } from 'redux';
import auth from './authReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import recipes from './recipesReducer';
import categories from './/categoriesReducer';

const rootReducer = combineReducers({
  categories,
  recipes,
  auth,
  ajaxCallsInProgress,
});

export default rootReducer;
