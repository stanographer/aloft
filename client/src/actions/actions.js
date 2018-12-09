import * as types from './actionTypes';

const localStorageValues = () => {
  return {
    backgroundColor: localStorage.hasOwnProperty('backgroundColor')
      ? localStorage.getItem('backgroundColor')
      : '#262A38',
    fontSize: localStorage.hasOwnProperty('fontSize')
      ? localStorage.getItem('fontSize')
      : '3em',
    fontFamily: localStorage.hasOwnProperty('fontFamily')
      ? localStorage.getItem('fontFamily')
      : 'Cousine, sans-serif',
    lineHeight: localStorage.hasOwnProperty('lineHeight')
      ? localStorage.getItem('lineHeight')
      : '1.5em',
    color: localStorage.hasOwnProperty('color')
      ? localStorage.getItem('color')
      : '#F2F2F2'
  };
};

export function receiveLocalStorageValues(json) {
  return { type: types.RECEIVE_LOCALSTORAGE, localStorageStuff: json.stuff };
}

export function fetchFromLocalStorage() {
  return dispatch => {
    return localStorageValues()
      .then(response => response.json())
      .then(json => dispatch(receiveLocalStorageValues(json)));
  };
}
