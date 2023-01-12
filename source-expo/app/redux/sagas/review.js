import {all, call, put, takeEvery, select} from 'redux-saga/effects';
import {actionTypes} from '@actions';
import api from '@api';
import {CommentModel, PaginationModel, RateSummaryModel} from '@models';
import {settingSelect} from '@selectors';

/**
 * on handle load review
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoad(action) {
  try {
    const response = yield call(api.getReview, {post_id: action.item?.id});
    if (response.success) {
      const data = response.data.map(item => {
        return CommentModel.fromJson(item);
      });
      const summary = RateSummaryModel.fromJson(response.attr?.rating);
      yield put({type: actionTypes.SAVE_REVIEW, data, summary});
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
function* onAdd(action) {
  try {
    const response = yield call(api.saveReview, action.params);
    const success = response.code == null;
    if (success) {
      yield put({
        type: actionTypes.LOAD_REVIEW,
        item: {id: action.params.post},
      });
    }
    action?.callback?.({
      success,
      message: response.message ?? 'update_success',
    });
  } catch (error) {
    action?.callback?.({
      success: false,
      message: error.message,
    });
  }
}

/**
 * on handle load author review
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoadAuthor(action) {
  try {
    const params = {};
    if (action.params?.sort) {
      params.orderby = action.params.sort.field;
      params.order = action.params.sort.value;
    }
    const setting = yield select(settingSelect);
    const response = yield call(api.getAuthorReview, {
      user_id: action.params?.author?.id,
      page: action.params?.page ?? 1,
      per_page: setting.perPage,
      s: action.params?.keyword,
      ...params,
    });
    if (response.success) {
      const data = response.data.map(item => {
        return CommentModel.fromJson(item);
      });
      const pagination = PaginationModel.fromJson(response.pagination);
      action?.callback?.({
        data,
        pagination,
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

function* watchLoad() {
  yield takeEvery(actionTypes.LOAD_REVIEW, onLoad);
}

function* watchAdd() {
  yield takeEvery(actionTypes.ADD_REVIEW, onAdd);
}

function* watchLoadAuthor() {
  yield takeEvery(actionTypes.LOAD_AUTHOR_REVIEW, onLoadAuthor);
}

export default function* reviewSagas() {
  yield all([watchLoad(), watchAdd(), watchLoadAuthor()]);
}
