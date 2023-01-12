import {actionTypes} from '@actions';
import {LOAD_REQUEST_BOOKING_LIST, ORDER} from './actionTypes';

export const onLoad = (params, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_BOOKING_LIST,
    params,
    callback,
  };
};

export const onLoadRequest = (params, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_REQUEST_BOOKING_LIST,
    params,
    callback,
  };
};

export const onLoadMore = (params, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_MORE_BOOKING_LIST,
    params,
    callback,
  };
};

export const onLoadMoreRequest = (params, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_MORE_REQUEST_BOOKING_LIST,
    params,
    callback,
  };
};

export const onResetList = (callback = () => {}) => {
  return {
    type: actionTypes.RESET_BOOKING_LIST,
    callback,
  };
};

export const onLoadDetail = (item, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_DETAIL_BOOKING,
    item,
    callback,
  };
};

export const onCancel = (item, callback = () => {}) => {
  return {
    type: actionTypes.CANCEL_BOOKING,
    item,
    callback,
  };
};

export const init = (item, callback = () => {}) => {
  return {
    type: actionTypes.INIT_BOOKING,
    item,
    callback,
  };
};

export const calcPrice = (params, callback = () => {}) => {
  return {
    type: actionTypes.CALC_PRICE,
    params,
    callback,
  };
};

export const order = (params, callback = () => {}) => {
  return {
    type: actionTypes.ORDER,
    params,
    callback,
  };
};
