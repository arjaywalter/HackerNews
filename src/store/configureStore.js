import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middleware/logger';
import rootReducer from './reducers';
import rootSaga from './sagas';

import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = rootReducer;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middlewares = [loggerMiddleware, thunkMiddleware, sagaMiddleware];

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk, ...middlewares],
});

sagaMiddleware.run(rootSaga);

export default store;
