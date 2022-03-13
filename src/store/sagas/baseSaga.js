import {call, put, takeLatest} from 'redux-saga/effects';
import Actions from '../actions';
import {fetchTopStoriesApi} from '../api/Api';

function* fetchTopStories(action) {
  try {
    const data = yield call(fetchTopStoriesApi, action);
    yield put({type: Actions.FETCH_SUCCESS, data: data});
  } catch (e) {
    yield put({type: Actions.FETCH_FAIL, message: e.message});
  }
}

/*
  Alternatively you may use takeLatest.
  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export default function* baseSaga() {
  yield takeLatest(Actions.FETCH_REQUEST, fetchTopStories);
}
