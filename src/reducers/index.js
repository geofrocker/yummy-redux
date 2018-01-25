import {combineReducers} from 'redux'
import registerMessage from './registerReducer'
import loginMessage from './loginReducer'
import publicRecipes from './publicRecipesReducer'

const rootReducer = combineReducers({
  registerMessage:registerMessage,
  loginMessage:loginMessage,
  publicRecipes:publicRecipes

});

export default rootReducer;