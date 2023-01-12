import {all, call, debounce, takeEvery} from 'redux-saga/effects';
import {actionTypes} from '@actions';
import api from '@api';
import {CategoryModel} from '@models';

/**
 * on handle load category list
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoad(action) {
  try {
    const params = {};
    if (action.item) {
      params.category_id = action.item?.id;
    }
    const response = yield call(api.getCategory, params);
    if (response.success) {
      let data = (response.data ?? []).map(item => {
        return CategoryModel.fromJson(item);
      });
      if (action.keyword) {
        data = data.filter(item =>
          item.title.toUpperCase().includes(action.keyword.toUpperCase()),
        );
      }

      action?.callback?.({
        success: true,
        data,
      });
    }
  } catch (error) {
    action?.callback?.({
      success: false,
      message: error.message,
    });
  }
}

/**
 * load location category
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoadLocation(action) {
  try {
    const response = yield call(api.getLocation, {parent_id: action.item?.id});
    if (response.success) {
      const data = (response.data ?? []).map(item => {
        return CategoryModel.fromJson(item);
      });
      action?.callback?.({
        data,
        success: response.success,
        message: response.message,
      });
    }
  } catch (error) {
    action?.callback?.({
      success: false,
      message: error.message,
    });
  }
}

function* watchList() {
  yield debounce(500, actionTypes.LOAD_CATEGORY_LIST, onLoad);
}

function* watchLoadLocation() {
  yield takeEvery(actionTypes.LOAD_LOCATION, onLoadLocation);
}

export default function* categorySagas() {
  yield all([watchList(), watchLoadLocation()]);
}
