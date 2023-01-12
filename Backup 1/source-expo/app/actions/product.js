import * as actionTypes from './actionTypes';

export const onLoadProduct = (params, callback = () => {}) => {
  return {
    type: actionTypes.FETCH_PRODUCT_DETAIL,
    params,
    callback,
  };
};

export const onLoadReview = (params, callback = () => {}) => {
  return {
    type: actionTypes.GET_COMMENT,
    params,
    callback,
  };
};

export const onFeekBack = (params, callback = () => {}) => {
  return {
    type: actionTypes.SAVE_COMMENT,
    params,
    callback,
  };
};

export const onFetchCategory = (params, callback = () => {}) => {
  return {
    type: actionTypes.GET_CATEGORY,
    params,
    callback,
  };
};
