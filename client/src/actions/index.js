import * as types from '../constants/types';

export const updateStyle = (style) => ({
  type: types.UPDATE_STYLE,
  payload: style
});

export const resetStyle = () => ({
  type: types.RESET_STYLE,
  payload: ''
});

