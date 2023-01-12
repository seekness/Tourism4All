import {all, call, put, select, takeEvery} from 'redux-saga/effects';
import {actionTypes} from '@actions';
import api from '@api';
import {CategoryModel, ProductModel} from '@models';
import {homeSelect, settingSelect} from '@selectors';

/**
 * on handle load home
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoad(action) {
  try {
    const setting = yield select(settingSelect);
    const response = yield call(api.getHome);
    if (response.success) {
      const banner = response.data?.sliders ?? [];
      const category = (response.data?.categories ?? []).map(item => {
        return CategoryModel.fromJson(item);
      });
      const location = (response.data?.locations ?? []).map(item => {
        return CategoryModel.fromJson(item);
      });
      const recent = (response.data?.recent_posts ?? []).map(item => {
        return ProductModel.fromJson({json: item, setting});
      });
      const home = {
        banner,
        category,
        location,
        recent,
      };
      yield put({type: actionTypes.SAVE_HOME, home});
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

/**
 * on handle add review
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onAddReview(action) {
  try {
    const home = yield select(homeSelect);
    const exist = home?.recent?.some?.(item => item.id === action.params?.post);
    if (exist) {
      yield put({
        type: actionTypes.LOAD_HOME,
      });
    }
  } catch (error) {
    action?.callback?.({
      success: false,
      message: error.message,
    });
  }
}

function* watchLoad() {
  yield takeEvery(actionTypes.LOAD_HOME, onLoad);
}

function* watchReview() {
  yield takeEvery(actionTypes.ADD_REVIEW, onAddReview);
}

export default function* homeSagas() {
  yield all([watchLoad(), watchReview()]);
}
