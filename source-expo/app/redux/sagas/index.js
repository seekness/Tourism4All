import {all} from 'redux-saga/effects';
import authSagas from './auth';
import applicationSagas from './application';
import homeSagas from './home';
import discoverySagas from './discovery';
import wishlistSagas from './wishlist';
import categorySagas from './category';
import searchSagas from './search';
import listingSagas from './listing';
import reviewSagas from './review';
import bookingSagas from './booking';

export default function* rootSaga() {
  yield all([
    applicationSagas(),
    authSagas(),
    homeSagas(),
    discoverySagas(),
    wishlistSagas(),
    categorySagas(),
    searchSagas(),
    listingSagas(),
    reviewSagas(),
    bookingSagas(),
  ]);
}
