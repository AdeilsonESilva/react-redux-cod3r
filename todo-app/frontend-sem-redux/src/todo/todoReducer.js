export const INICIAL_STATE = {
  description: '',
  list: []
};

export default (state = INICIAL_STATE, action) => {
  console.log('action.type', action.type);
  console.log('action.payload', action.payload);
  let newState;
  switch (action.type) {
    case 'DESCRIPTION_CHANGED':
      newState = { ...state, description: action.payload };
      console.log('newState', newState);
      return newState;
    case 'TODO_SEARCHED':
      newState = { ...state, list: action.payload };
      console.log('newState', newState);
      return newState;
    case 'TODO_ADDED':
      return { ...state, description: '' };
    default:
      return state;
  }
}
;
