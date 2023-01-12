import {all, call, debounce, put, select, takeEvery} from 'redux-saga/effects';
import {actionTypes} from '@actions';
import api from '@api';
import {PaginationModel, ProductModel} from '@models';
import {settingSelect, wishlistSelect} from '@selectors';

/**
 * on handle load wishlist
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoad(action) {
  try {
    const setting = yield select(settingSelect);
    const response = yield call(api.getWishList, {
      page: 1,
      per_page: setting.perPage,
    });
    if (response.success) {
      const data = response.data.map(item => {
        return ProductModel.fromJson({json: item, setting});
      });
      const pagination = PaginationModel.fromJson(response.pagination);
      yield put({type: actionTypes.SAVE_WISHLIST, data, pagination});
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
 * on handle load more wishlist
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoadMore(action) {
  try {
    const setting = yield select(settingSelect);
    const wishlist = yield select(wishlistSelect);
    const response = yield call(api.getWishList, {
      page: wishlist.pagination.page + 1,
      per_page: setting.perPage,
    });
    if (response.success) {
      const data = response.data.map(item => {
        return ProductModel.fromJson({json: item, setting});
      });
      const pagination = PaginationModel.fromJson(response.pagination);
      yield put({
        type: actionTypes.SAVE_WISHLIST,
        data: [...wishlist.data, ...data],
        pagination,
      });
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
 * on handle add wishlist
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onAdd(action) {
  try {
    const response = yield call(api.addWishList, {post_id: action.item?.id});
    if (response.success) {
      yield put({type: actionTypes.LOAD_WISHLIST});
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
 * on handle clear wishlist
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onClear(action) {
  try {
    const response = yield call(api.clearWishList);
    if (response.success) {
      yield put({type: actionTypes.SAVE_WISHLIST, data: [], pagination: {}});
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
 * on handle delete wishlist
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onDelete(action) {
  try {
    const response = yield call(api.removeWishList, {post_id: action.item?.id});
    if (response.success) {
      yield put({type: actionTypes.LOAD_WISHLIST});
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

function* watchList() {
  yield takeEvery(actionTypes.LOAD_WISHLIST, onLoad);
}

function* watchAdd() {
  yield takeEvery(actionTypes.ADD_WISHLIST, onAdd);
}

function* watchClear() {
  yield takeEvery(actionTypes.CLEAR_WISHLIST, onClear);
}

function* watchDelete() {
  yield takeEvery(actionTypes.DELETE_WISHLIST, onDelete);
}

function* watchLoadMore() {
  yield debounce(250, actionTypes.LOAD_MORE_WISHLIST, onLoadMore);
}

export default function* wishlistSagas() {
  yield all([
    watchList(),
    watchAdd(),
    watchClear(),
    watchDelete(),
    watchLoadMore(),
  ]);
}
