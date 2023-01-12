import {all, call, debounce, put, select, takeEvery} from 'redux-saga/effects';
import {actionTypes} from '@actions';
import api from '@api';
import {
  BookingDailyStyleModel,
  BookingHourlyStyleModel,
  BookingModel,
  BookingPaymentModel,
  BookingSlotStyleModel,
  BookingStandardStyleModel,
  BookingTableStyleModel,
  PaginationModel,
  SortModel,
} from '@models';
import {bookingSelect, settingSelect} from '@selectors';

/**
 * on handle load booking
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoad(action) {
  try {
    const params = {};
    if (action.params?.sort) {
      params.orderby = action.params.sort.field;
      params.order = action.params.sort.value;
    }
    if (action.params?.status) {
      params.post_status = action.params.status.value;
    }
    const setting = yield select(settingSelect);
    const response = yield call(
      api.getBookingList,
      {
        s: action.params?.keyword,
        page: 1,
        per_page: setting.perPage,
        ...params,
      },
      action.params?.loading,
    );
    if (response.success) {
      const data = response.data.map(item => {
        return BookingModel.fromJson(item);
      });
      const sortOptions = response.attr?.sort.map(item => {
        return SortModel.fromJson(item);
      });
      const statusOptions = response.attr?.status.map(item => {
        return SortModel.fromJson(item);
      });
      const pagination = PaginationModel.fromJson(response.pagination);
      yield put({
        type: actionTypes.SAVE_BOOKING_LIST,
        data,
        pagination,
        sortOptions,
        statusOptions,
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
 * on handle load more booking
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoadMore(action) {
  try {
    const params = {};
    if (action.params?.sort) {
      params.orderby = action.params.sort.field;
      params.order = action.params.sort.value;
    }
    if (action.params?.status) {
      params.post_status = action.params.status.value;
    }
    const setting = yield select(settingSelect);
    const booking = yield select(bookingSelect);
    const response = yield call(
      api.getBookingList,
      {
        s: action.params?.keyword,
        page: booking.pagination.page + 1,
        per_page: setting.perPage,
        ...params,
      },
      action.params?.loading,
    );
    if (response.success) {
      const data = response.data.map(item => {
        return BookingModel.fromJson(item);
      });
      const sortOptions = response.attr?.sort.map(item => {
        return SortModel.fromJson(item);
      });
      const statusOptions = response.attr?.status.map(item => {
        return SortModel.fromJson(item);
      });
      const pagination = PaginationModel.fromJson(response.pagination);
      yield put({
        type: actionTypes.SAVE_BOOKING_LIST,
        data: [...booking.data, ...data],
        pagination,
        sortOptions,
        statusOptions,
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
 * on handle load booking request
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoadRequest(action) {
  try {
    const params = {};
    if (action.params?.sort) {
      params.orderby = action.params.sort.field;
      params.order = action.params.sort.value;
    }
    if (action.params?.status) {
      params.post_status = action.params.status.value;
    }
    const setting = yield select(settingSelect);
    const response = yield call(
      api.getRequestBookingList,
      {
        s: action.params?.keyword,
        page: 1,
        per_page: setting.perPage,
        ...params,
      },
      action.params?.loading,
    );
    if (response.success) {
      const data = response.data.map(item => {
        return BookingModel.fromJson(item);
      });
      const sortOptions = response.attr?.sort.map(item => {
        return SortModel.fromJson(item);
      });
      const statusOptions = response.attr?.status.map(item => {
        return SortModel.fromJson(item);
      });
      const pagination = PaginationModel.fromJson(response.pagination);
      yield put({
        type: actionTypes.SAVE_BOOKING_REQUEST_LIST,
        data,
        pagination,
        sortOptions,
        statusOptions,
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
 * on handle load more booking
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLoadMoreRequest(action) {
  try {
    const params = {};
    if (action.params?.sort) {
      params.orderby = action.params.sort.field;
      params.order = action.params.sort.value;
    }
    if (action.params?.status) {
      params.post_status = action.params.status.value;
    }
    const setting = yield select(settingSelect);
    const booking = yield select(bookingSelect);
    const response = yield call(
      api.getRequestBookingList,
      {
        s: action.params?.keyword,
        page: booking.pagination.page + 1,
        per_page: setting.perPage,
        ...params,
      },
      action.params?.loading,
    );
    if (response.success) {
      const data = response.data.map(item => {
        return BookingModel.fromJson(item);
      });
      const sortOptions = response.attr?.sort.map(item => {
        return SortModel.fromJson(item);
      });
      const statusOptions = response.attr?.status.map(item => {
        return SortModel.fromJson(item);
      });
      const pagination = PaginationModel.fromJson(response.pagination);
      yield put({
        type: actionTypes.SAVE_BOOKING_REQUEST_LIST,
        data: [...booking.data, ...data],
        pagination,
        sortOptions,
        statusOptions,
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
 * on handle load more booking
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onDetail(action) {
  try {
    const response = yield call(api.getBookingDetail, {id: action.item?.id});
    if (response.success) {
      const data = BookingModel.fromJson(response.data);
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

/**
 * on handle load more booking
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onCancel(action) {
  try {
    const response = yield call(api.cancelBooking, {id: action.item?.id});
    if (response.success) {
      yield put({
        type: actionTypes.LOAD_BOOKING_LIST,
        params: {},
      });
      const data = BookingModel.fromJson(response.data);
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

/**
 * on init booking form
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onInit(action) {
  try {
    const response = yield call(api.getBookingForm, {
      resource_id: action.item?.id,
    });
    let style;
    let payment;
    if (response.success) {
      switch (response.data.type) {
        case 'daily':
          style = BookingDailyStyleModel.fromJson(response.data);
          break;
        case 'hourly':
          style = BookingHourlyStyleModel.fromJson(response.data);
          break;
        case 'table':
          style = BookingTableStyleModel.fromJson(response.data);
          break;
        case 'slot':
          style = BookingSlotStyleModel.fromJson(response.data);
          break;

        default:
          style = BookingStandardStyleModel.fromJson(response.data);
      }
      payment = BookingPaymentModel.fromJson(response.payment);
    }
    action?.callback?.({
      style,
      payment,
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
 * on init booking form
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onCalcPrice(action) {
  try {
    const response = yield call(api.bookingCalcPrice, action.params);
    action?.callback?.({
      price: response.attr?.total_display,
      data: response.data,
      success: response.success,
      message: response.message ?? response.msg,
    });
  } catch (error) {
    action?.callback?.({
      success: false,
      message: error.message,
    });
  }
}

/**
 * on order booking
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onOrder(action) {
  try {
    const response = yield call(api.bookingOrder, action.params);
    if (response.success && response.payment) {
      const url = response.payment.url ?? response.payment.links?.[1]?.href;
      action?.callback?.({
        url,
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
  yield takeEvery(actionTypes.LOAD_BOOKING_LIST, onLoad);
}

function* watchLoadMore() {
  yield debounce(250, actionTypes.LOAD_MORE_BOOKING_LIST, onLoadMore);
}

function* watchRequestList() {
  yield takeEvery(actionTypes.LOAD_REQUEST_BOOKING_LIST, onLoadRequest);
}

function* watchLoadMoreRequest() {
  yield debounce(
    250,
    actionTypes.LOAD_MORE_REQUEST_BOOKING_LIST,
    onLoadMoreRequest,
  );
}

function* watchBookingDetail() {
  yield takeEvery(actionTypes.LOAD_DETAIL_BOOKING, onDetail);
}

function* watchBookingCancel() {
  yield takeEvery(actionTypes.CANCEL_BOOKING, onCancel);
}

function* watchInit() {
  yield takeEvery(actionTypes.INIT_BOOKING, onInit);
}

function* watchCalcPrice() {
  yield takeEvery(actionTypes.CALC_PRICE, onCalcPrice);
}

function* watchOrder() {
  yield takeEvery(actionTypes.ORDER, onOrder);
}

export default function* wishlistSagas() {
  yield all([
    watchList(),
    watchLoadMore(),
    watchRequestList(),
    watchLoadMoreRequest(),
    watchBookingDetail(),
    watchBookingCancel(),
    watchInit(),
    watchCalcPrice(),
    watchOrder(),
  ]);
}
