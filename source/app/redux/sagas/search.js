import {all, call, debounce, put, select} from 'redux-saga/effects';
import {actionTypes} from '@actions';
import {searchSelect, settingSelect} from '@selectors';
import api from '@api';
import {PaginationModel, ProductModel} from '@models';

/**
 * on handle load search
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoad(action) {
  try {
    yield put({
      type: actionTypes.SAVE_SEARCH,
      data: Array.from({length: 10}, (v, i) => {
        return {};
      }),
    });
    const setting = yield select(settingSelect);
    const response = yield call(api.getListing, {
      s: action.params?.keyword,
      page: 1,
      per_page: setting.perPage,
    });
    if (response.success) {
      const data = response.data.map(item => {
        return ProductModel.fromJson({json: item, setting});
      });
      const pagination = PaginationModel.fromJson(response.pagination);
      yield put({type: actionTypes.SAVE_SEARCH, data, pagination});
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
 * on load more search
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoadMore(action) {
  try {
    const setting = yield select(settingSelect);
    const search = yield select(searchSelect);
    const response = yield call(api.getListing, {
      s: action.params?.keyword,
      page: search.pagination.page + 1,
      per_page: setting.perPage,
    });
    if (response.success) {
      const data = response.data.map(item => {
        return ProductModel.fromJson({json: item, setting});
      });
      const pagination = PaginationModel.fromJson(response.pagination);
      yield put({
        type: actionTypes.SAVE_SEARCH,
        data: [...search.data, ...data],
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

function* watchSearch() {
  yield debounce(500, actionTypes.LOAD_SEARCH, onLoad);
}

function* watchLoadMore() {
  yield debounce(250, actionTypes.LOAD_MORE_SEARCH, onLoadMore);
}

export default function* searchSagas() {
  yield all([watchSearch(), watchLoadMore()]);
}
