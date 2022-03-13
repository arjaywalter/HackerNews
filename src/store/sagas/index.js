import {all, call} from 'redux-saga/effects';
import baseSaga from './baseSaga';

// Traditioinal redux saga implementation
export default function* rootSaga() {
  yield all([call(baseSaga)]);
  // code after all-effect
}
