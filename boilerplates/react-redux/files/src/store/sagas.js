import appSagas from 'app/sagas';
import counterSagas from 'counter/sagas';

export default function* sagas() {
  yield* appSagas();
  yield* counterSagas();
}
