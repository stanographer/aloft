import { combineReducers } from 'redux';
import localStorageReducer from './localStorageReducer';

const rootReducer = combineReducers({
  localStorageReducer
});

export default rootReducer;
