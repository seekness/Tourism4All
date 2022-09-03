import {all, put, takeEvery} from 'redux-saga/effects';
import * as actionTypes from '@actions/actionTypes';
import * as api from '@api';
import {ProductModel, CategoryModel} from '@models';

function* fetchHome(action) {
  try {
    const response = yield api.getHome(action.params);
    if (response.success) {
      yield put({
        type: actionTypes.SAVE_HOME_DATA,
        sliders: response.data?.sliders,
        categories: response.data?.categories?.map?.(item => {
          return new CategoryModel(item);
        }),
        locations: response.data?.locations?.map?.(item => {
          return new CategoryModel(item);
        }),
        recents: response.data?.recent_posts?.map?.(item => {
          return new ProductModel(item);
        }),
      });
    }
    action.callback?.(response);
  } catch (error) {
    console.log('fetchHome', error);
    action.callback?.(error.response ?? error.message);
  }
}

function* watchLoadHome() {
  yield takeEvery(actionTypes.FETCH_HOME, fetchHome);
}

export default function* authSagas() {
  yield all([watchLoadHome()]);
}
