import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from '@reducers';
import rootSagas from '@sagas';

/**
 * Redux Setting
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['home', 'wishlist', 'list'],
  timeout: 100000,
};
const sagaMiddleware = createSagaMiddleware();

let middleware = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
sagaMiddleware.run(rootSagas);
const persistor = persistStore(store);

export {store, persistor};
