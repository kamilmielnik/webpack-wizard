import { takeEvery, put } from 'redux-saga/effects';
import { INITIALIZE_APP } from 'app/state';
import { initialize } from 'counter/state';

const INITIAL_COUNTER_VALUE = 10;

export default function* counterSagas() {
  yield takeEvery(INITIALIZE_APP, whenAppInitialized);
}

function* whenAppInitialized() {
  yield put(initialize(INITIAL_COUNTER_VALUE));
}
