import {all, put, call, takeEvery, select} from 'redux-saga/effects';
import {actionTypes} from '@actions';
import api from '@api';
import {CategoryModel, ProductModel} from '@models';
import {settingSelect} from '@selectors';

/**
 * on handle load discovery list
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoad(action) {
  try {
    const setting = yield select(settingSelect);
    const response = yield call(api.getDiscovery);
    if (response.success) {
      const data = response.data.map(item => {
        return {
          category: CategoryModel.fromJson(item),
          list: (item.posts ?? []).map(post => {
            return ProductModel.fromJson({json: post, setting});
          }),
        };
      });
      yield put({type: actionTypes.SAVE_DISCOVERY, data});
    }
    action?.callback?.({
      success: response.success,
      message: response.message,
    });
  } catch (error) {
    action?.callback?.({
      success: false,
      message: error.message,
    });
  }
}

function* watchLoad() {
  yield takeEvery(actionTypes.LOAD_DISCOVERY, onLoad);
}

export default function* discoverySagas() {
  yield all([watchLoad()]);
}
