import {combineReducers} from 'redux';

import baseReducer from './baseReducer'; // Traditional reducer implementation
import base from './baseSlice'; // Slice template
import story from './storySlice';

const rootReducer = combineReducers({
  story
});

export default rootReducer;
