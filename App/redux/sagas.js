import {fork, all} from 'redux-saga/effects';
import authSagas from './auth/saga';
import deliverySagas from './Delivery/saga';
import nonAuthSagas from './nonAuth/saga';

export default function* rootSaga() {
  yield all([fork(authSagas), fork(nonAuthSagas), fork(deliverySagas)]);
}
