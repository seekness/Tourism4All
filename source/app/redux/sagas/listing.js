import {all, call, debounce, put, select, takeEvery} from 'redux-saga/effects';
import {actionTypes} from '@actions';
import api from '@api';
import {PaginationModel, ProductModel, SubmitSettingModel} from '@models';
import {listingSelect, settingSelect} from '@selectors';
import {getCurrentLocation} from '@utils';

/**
 * on handle load listing
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoad(action) {
  try {
    let params = {};
    if (action.params?.filter) {
      params = yield action.params.filter.getParams();
    }
    const setting = yield select(settingSelect);
    const response = yield call(
      api.getListing,
      {
        page: 1,
        per_page: setting.perPage,
        ...params,
      },
      action.params?.loading,
    );
    if (response.success) {
      const data = response.data.map(item => {
        return ProductModel.fromJson({json: item, setting});
      });
      const pagination = PaginationModel.fromJson(response.pagination);
      yield put({type: actionTypes.SAVE_LISTING, data, pagination});
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
 * on handle load more listing
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoadMore(action) {
  try {
    const setting = yield select(settingSelect);
    const listing = yield select(listingSelect);
    const response = yield call(api.getListing, {
      page: listing.pagination.page + 1,
      per_page: setting.perPage,
    });
    if (response.success) {
      const data = response.data.map(item => {
        return ProductModel.fromJson({json: item, setting});
      });
      const pagination = PaginationModel.fromJson(response.pagination);
      yield put({
        type: actionTypes.SAVE_LISTING,
        data: [...listing.data, ...data],
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
 * on detail listing
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoadDetail(action) {
  try {
    const params = {id: action.item?.id};
    const setting = yield select(settingSelect);
    const result = yield getCurrentLocation();
    if (result) {
      params.latitude = result.latitude;
      params.longitude = result.longitude;
    }
    const response = yield call(api.getProduct, params);
    if (response.success) {
      const data = ProductModel.fromJson({json: response.data, setting});
      action?.callback?.({
        data: data,
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

/**
 * on wishlist change
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onWishListChange(action) {
  try {
    const listing = yield select(listingSelect);
    const exist = listing.data?.some?.(item => item.id === action.item?.id);
    if (exist) {
      yield put({
        type: actionTypes.SAVE_LISTING,
        data: listing.data.map(item => {
          if (item.id === action.item?.id) {
            return {...item, favorite: !action.item.favorite};
          }
          return item;
        }),
        pagination: listing.pagination,
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
 * on author listing
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onAuthorList(action) {
  try {
    let params = {};

    if (action.params?.filter) {
      params = yield action.params.filter.getParams();
    }
    if (action.params?.pending) {
      params.post_status = 'pending';
    }
    const setting = yield select(settingSelect);
    const response = yield call(
      api.getAuthorList,
      {
        page: action.params?.page ?? 1,
        user_id: action.params?.author?.id,
        per_page: setting.perPage,
        s: action.params?.keyword,
        ...params,
      },
      action.params?.loading,
    );
    if (response.success) {
      const data = response.data.map?.(item => {
        return ProductModel.fromJson({json: item, setting});
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

/**
 * on delete item
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onDeleteItem(action) {
  try {
    const response = yield call(api.deleteProduct, {post_id: action.item?.id});
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
 * on init submit
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onInitSubmit(action) {
  try {
    let setting;
    let product;
    let responseSetting;
    let responseProduct;
    if (action.item) {
      [responseSetting, responseProduct] = yield all([
        call(api.getSubmitSetting, {post_id: action.item?.id}),
        call(api.getProduct, {id: action.item?.id}),
      ]);
    } else {
      responseSetting = yield call(api.getSubmitSetting);
    }
    setting = SubmitSettingModel.fromJson(responseSetting);
    if (responseProduct?.success) {
      product = ProductModel.fromJson({json: responseProduct.data});
    }
    action?.callback?.({
      setting,
      product,
      success: !!setting,
    });
  } catch (error) {
    action?.callback?.({
      success: false,
      message: error.message,
    });
  }
}

/**
 * on submit/edit listing
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoadTags(action) {
  try {
    const response = yield call(api.getTags, {s: action.keyword});
    action?.callback?.({
      data: response.data,
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
 * on load tags submit
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onSubmit(action) {
  try {
    const params = {
      post_id: action.params.id,
      title: action.params.title,
      content: action.params.content,
      country: action.params.country?.id,
      state: action.params.state?.id,
      city: action.params.city?.id,
      address: action.params.address,
      zip_code: action.params.zipcode,
      phone: action.params.phone,
      fax: action.params.fax,
      email: action.params.email,
      website: action.params.website,
      color: action.params.color,
      icon: action.params.icon,
      status: action.params.status,
      date_establish: action.params.dateEstablish?.format('YYYY-MM-DD'),
      thumbnail: action.params.featureImage?.id,
      gallery: action.params.galleryImages?.map(item => item.id).join(','),
      booking_price: action.params.price,
      price_min: action.params.priceMin,
      price_max: action.params.priceMax,
      longitude: action.params.location?.longitude,
      latitude: action.params.location?.latitude,
      tags_input: action.params.tags?.join(','),
      booking_style: action.params.bookingStyle?.value,
    };
    for (let i = 0; i < action.params.categories?.length; i++) {
      const item = action.params.categories[i];
      params[`tax_input[listar_category][${i}]`] = item.id;
    }
    if (action.params?.openTime) {
      for (let i = 0; i < action.params?.openTime?.length; i++) {
        const item = action.params?.openTime[i];
        if (item.schedule) {
          for (let x = 0; x < item.schedule.length; x++) {
            const element = item.schedule[x];
            const d = item.dayOfWeek;
            params[`opening_hour[${d}][start][${x}]`] = element.start;
            params[`opening_hour[${d}][end][${x}]`] = element.end;
          }
        }
      }
    }
    for (let i = 0; i < action.params.facilities?.length; i++) {
      const item = action.params.facilities[i];
      params[`tax_input[listar_feature][${i}]`] = item.id;
    }
    if (action.params.socials) {
      Object.entries(action.params.socials).forEach(entry => {
        const [key, value] = entry;
        params[`social_network[${key}]`] = value;
      });
    }
    const response = yield call(api.submitListing, params);
    action?.callback?.({
      data: response.data,
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
  yield takeEvery(actionTypes.LOAD_LISTING, onLoad);
}

function* watchLoadMore() {
  yield debounce(500, actionTypes.LOAD_MORE_LISTING, onLoadMore);
}

function* watchDetail() {
  yield takeEvery(actionTypes.LISTING_DETAIL, onLoadDetail);
}

function* watchAddWishList() {
  yield takeEvery(actionTypes.ADD_WISHLIST, onWishListChange);
}

function* watchRemoveWishList() {
  yield takeEvery(actionTypes.DELETE_WISHLIST, onWishListChange);
}

function* watchAuthorList() {
  yield takeEvery(actionTypes.LOAD_AUTHOR_LISTING, onAuthorList);
}

function* watchDeleteItem() {
  yield takeEvery(actionTypes.DELETE_LISTING_ITEM, onDeleteItem);
}

function* watchInitSubmit() {
  yield takeEvery(actionTypes.INIT_SUBMIT_SETTING, onInitSubmit);
}

function* watchSubmit() {
  yield takeEvery(actionTypes.SUBMIT, onSubmit);
}

function* watchLoadTags() {
  yield takeEvery(actionTypes.LOAD_TAGS, onLoadTags);
}

export default function* listingSagas() {
  yield all([
    watchList(),
    watchLoadMore(),
    watchDetail(),
    watchAddWishList(),
    watchRemoveWishList(),
    watchAuthorList(),
    watchDeleteItem(),
    watchInitSubmit(),
    watchSubmit(),
    watchLoadTags(),
  ]);
}
