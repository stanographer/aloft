let defaultState = {
  propOne: 'something',
  propTwo: 'something else'
};

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'EXAMPLE':
      return {
        ...state,
        propOne: 'new something'
      };
    case 'EXAMPLE_2':
      return {
        ...state,
        propTwo: 'new something 2'
      };
    default:
      return state;
  }
};

export default reducers;