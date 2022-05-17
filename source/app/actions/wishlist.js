import * as actionTypes from './actionTypes';

export const onLoad = (params, callback = () => {}) => {
  return {
    type: actionTypes.GET_WISHLIST,
    params,
    callback,
  };
};

export const onDelete = (params, callback = () => {}) => {
  return {
    type: actionTypes.DELETE_WISHLIST,
    params,
    callback,
  };
};

export const onSave = (params, like, callback = () => {}) => {
  return {
    type: actionTypes.ON_LIKE,
    params,
    like,
    callback,
  };
};

export const onUpdate = item => {
  return {
    type: actionTypes.ON_UPDATE_WISHLIST,
    item,
  };
};
