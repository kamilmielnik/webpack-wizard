import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';
import reducer from './reducer';
import sagas from './sagas';

const composer = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;
const createSagaMiddleware = typeof reduxSaga.default === 'function' ? reduxSaga.default : reduxSaga;
const sagaMiddleware = createSagaMiddleware();
const initialState = undefined;

export default (history) => {
  const store = createStore(reducer, initialState, createEnhancer(history));
  sagaMiddleware.run(sagas);
  enableHmrForReducers(store);
  return store;
};

const createEnhancer = (history) => compose(applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history)
));

const enableHmrForReducers = (store) => {
  if (module.hot) {
    const replaceReducer = () => store.replaceReducer(require('./reducer').default);
    module.hot.accept('./reducer', replaceReducer);
  }
};
