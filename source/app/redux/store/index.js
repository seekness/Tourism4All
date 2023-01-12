import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from '@reducers';
import rootSagas from '@sagas';

/**
 * Redux Setting
 */

const sagaMiddleware = createSagaMiddleware();

let middleware = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleware));
export const persist = persistStore(store);

sagaMiddleware.run(rootSagas);
