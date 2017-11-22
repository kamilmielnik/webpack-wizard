import { combineReducers } from 'redux';
import app from 'app/state';
import counter from 'counter/state';

export default combineReducers({
  app,
  counter
});
