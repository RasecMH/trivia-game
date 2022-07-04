import { combineReducers } from 'redux';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  player: loginReducer,
});

export default rootReducer;
