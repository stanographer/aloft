// import React from 'react';
// import { createStore, combineReducers } from 'redux';
// import reducers from '../../src/reducers/reducers';
//
// export const store = createStore(
//   combineReducers({
//     state: reducers
//   })
// );

import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
  );
}