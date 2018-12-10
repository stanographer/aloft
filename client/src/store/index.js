import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from '../actions/localStorage';
import { throttle } from 'lodash';

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(throttle(() => {
    saveState({
      aloft_localstorage: store.getState().aloft_localstorage
    });
  })
);

export default store;
