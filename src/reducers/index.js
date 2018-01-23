import {combineReducers} from 'redux'
import message from './registerReducer'

const rootReducer = combineReducers({
  message:message
});

export default rootReducer;