import defaultState from '../reducers/defaultState';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('aloft_localstorage');

    if (serializedState === null) {
      return defaultState;
    }
    return JSON.parse(serializedState);

  } catch (err) {
    return defaultState;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('aloft_localstorage', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
