import { createAction, handleActions } from 'redux-actions';

export const INITIALIZE = 'counter/initialize';
export const INCREMENT = 'counter/increment';
export const DECREMENT = 'counter/decrement';

export const initialize = createAction(INITIALIZE, (value) => value);
export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

const initialState = 0;

export default handleActions({
  [INITIALIZE]: (state, { payload: value }) => value,
  [INCREMENT]: (state) => state + 1,
  [DECREMENT]: (state) => state - 1
}, initialState);
