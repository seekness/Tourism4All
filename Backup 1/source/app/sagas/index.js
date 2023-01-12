import {all} from 'redux-saga/effects';
import authSagas from './auth';
import configSagas from './config';
import withlistSagas from './wishlist';
import homeSagas from './home';
import productSagas from './product';
import listSagas from './list';
import searchSagas from './search';

export default function* rootSaga() {
  yield all([
    authSagas(),
    configSagas(),
    homeSagas(),
    withlistSagas(),
    productSagas(),
    listSagas(),
    searchSagas(),
  ]);
}
