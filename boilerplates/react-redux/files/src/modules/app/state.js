import { createAction, handleActions } from 'redux-actions';

export const INITIALIZE_APP = 'app/initialize-app';

export const initializeApp = createAction(INITIALIZE_APP);

const initialState = {
  isInitialized: false
};

export default handleActions({
  [INITIALIZE_APP]: (state) => ({ ...state, isInitialized: true })
}, initialState);
