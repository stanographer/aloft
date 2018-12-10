import * as types from '../constants/types';
import defaultState from '../reducers/defaultState';

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.UPDATE_STYLE:
      return Object.assign({}, state, {
        aloft_localstorage: {
          style: {
            ...state.aloft_localstorage.style,
            [action.payload.id]: action.payload.value
          }
        }
      });
    case types.RESET_STYLE:
      return Object.assign({}, state, {
        aloft_localstorage: {
          style: defaultState.aloft_localstorage.style
        }
      });
    default:
      return state;
  }
};

export default rootReducer;
