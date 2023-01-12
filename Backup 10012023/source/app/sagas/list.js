import {all, put, takeEvery} from 'redux-saga/effects';
import * as actionTypes from '@actions/actionTypes';
import * as api from '@api';
import {ProductModel, PaginationModel} from '@models';

function* loadList(action) {
  try {
    const params = {};
    if (action.filter?.category) {
      params['category'] = action.filter.category.map(item => item.id);
    }
    if (action.filter?.feature) {
      params['feature'] = action.filter.feature.map(item => item.id);
    }
    if (action.filter?.area) {
      params['location'] = action.filter.area.id;
    }
    if (action.filter?.minPrice) {
      params['price_min'] = action.filter.minPrice;
    }
    if (action.filter?.maxPrice) {
      params['price_max'] = action.filter.maxPrice;
    }
    if (action.filter?.color) {
      params['color'] = action.filter.color;
    }
    if (action.filter?.perPage) {
      params['per_page'] = action.filter.perPage;
    }
    if (action.page) {
      params['page'] = action.page;
    }
    if (action.filter?.sort) {
      params['orderby'] = action.filter.sort.field;
      params['order'] = action.filter.sort.value;
    }
    const response = yield api.getListProduct(params);
    if (response.success) {
      const list = response.data.map?.(item => {
        return new ProductModel(item);
      });
      const pagination = new PaginationModel(response.pagination);
      yield put({
        type: actionTypes.SAVE_LIST,
        list,
        pagination,
      });
    }
    action.callback?.(response);
  } catch (error) {
    console.log('loadList', error);
    action.callback?.(error.response ?? error.message);
  }
}

function* watchLoadList() {
  yield takeEvery(actionTypes.LOAD_LIST, loadList);
}

export default function* authSagas() {
  yield all([watchLoadList()]);
}
