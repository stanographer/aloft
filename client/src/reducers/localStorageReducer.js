import initialState from './initialState';
import { FETCH_LOCALSTORAGE, RECEIVE_LOCALSTORAGE } from '../actions/actionTypes';

export default function localStorage(state = initialState.localStorageStuff, action) {
  let newState;

  switch (action.type) {
    case FETCH_LOCALSTORAGE:
      console.log('fetch localstorage action fired.');
      return action;
    case RECEIVE_LOCALSTORAGE:
      newState = action.localStorageStuff;
      console.log('receive localstorage action fired.');
      return newState;
    default:
      return state;
  }
}
