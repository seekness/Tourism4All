import {all, put, takeEvery} from 'redux-saga/effects';
import * as actionTypes from '@actions/actionTypes';
import * as api from '@api';
import {ProductModel, PaginationModel} from '@models';

function* onSearch(action) {
  try {
    const response = yield api.getListProduct(action.params);
    if (response.success) {
      const list = response.data.map?.(item => {
        return new ProductModel(item);
      });
      const pagination = new PaginationModel(response.pagination);
      yield put({
        type: actionTypes.ON_SAVE_SEARCH,
        list,
        pagination,
      });
    }
    action.callback?.(response);
  } catch (error) {
    console.log('onSearch', error);
    action.callback?.(error.response ?? error.message);
  }
}

function* watchSearch() {
  yield takeEvery(actionTypes.ON_SEARCH, onSearch);
}

export default function* authSagas() {
  yield all([watchSearch()]);
}
