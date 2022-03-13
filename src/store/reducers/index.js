import {combineReducers} from 'redux';

import baseSlice from './baseSlice';
import baseReducer from './baseReducer'; // Traditional reducer implementation

const rootReducer = combineReducers({
  baseSlice,
  baseReducer,
});

export default rootReducer;
