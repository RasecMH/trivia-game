import { LOGIN, SCORE } from '../Actions/actionTypes';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, ...action.value };
  case SCORE:
    return {
      ...state,
      score: state.score + action.value,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}

export default loginReducer;
