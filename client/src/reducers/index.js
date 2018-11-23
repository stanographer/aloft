import { combineReducers } from 'redux';
import reducers from './reducers';

const rootReducer = combineReducers({
  state: reducers
});

export default rootReducer;