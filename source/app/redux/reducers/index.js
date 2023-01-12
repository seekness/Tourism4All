import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {actionTypes} from '@actions';

import authReducer from './auth';
import applicationReducer from './application';
import homeReducer from './home';
import discoveryReducer from './discovery';
import wishlistReducer from './wishlist';
import searchReducer from './search';
import listingReducer from './listing';
import reviewReducer from './review';
import bookingReducer from './booking';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['application', 'auth'],
  timeout: 10000,
};

const appReducer = combineReducers({
  auth: authReducer,
  application: applicationReducer,
  home: homeReducer,
  discovery: discoveryReducer,
  wishlist: wishlistReducer,
  search: searchReducer,
  listing: listingReducer,
  review: reviewReducer,
  booking: bookingReducer,
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.CLEAR_REDUCER) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);
