import {actionTypes} from '@actions';

export const onLoad = (callback = () => {}) => {
  return {
    type: actionTypes.LOAD_WISHLIST,
    callback,
  };
};

export const onAdd = (item, callback = () => {}) => {
  return {
    type: actionTypes.ADD_WISHLIST,
    item,
    callback,
  };
};

export const onDeleted = (item, callback = () => {}) => {
  return {
    type: actionTypes.DELETE_WISHLIST,
    item,
    callback,
  };
};

export const onClear = (callback = () => {}) => {
  return {
    type: actionTypes.CLEAR_WISHLIST,
    callback,
  };
};

export const onLoadMore = (callback = () => {}) => {
  return {
    type: actionTypes.LOAD_MORE_WISHLIST,
    callback,
  };
};
