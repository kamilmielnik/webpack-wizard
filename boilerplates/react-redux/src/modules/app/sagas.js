import { takeLatest } from 'redux-saga/effects';
import { INITIALIZE_APP } from 'app/state';

export default function* appSagas() {
  yield takeLatest(INITIALIZE_APP, onInitialize);
}

function* onInitialize() {
  console.log('App initialized');
}
