import Actions from '../actions';
import _ from 'lodash';

const Actions = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
};


const initialState = {
  data: [],
  error: null,
  fetching: false,
};

// Traditional reducer implementation
export default function baseReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.FETCH_REQUEST:
      return {...state, fetching: true};
    case Actions.FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.data,
      };
    case Actions.FETCH_FAIL:
      return {...state, fetching: false, error: action.message};
    default:
      return state;
  }
}
