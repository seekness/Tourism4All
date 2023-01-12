import {actionTypes} from '@actions';

export const onSearch = (params, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_SEARCH,
    params,
    callback,
  };
};

export const onLoadMore = (params, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_MORE_SEARCH,
    params,
    callback,
  };
};

export const onReset = (callback = () => {}) => {
  return {
    type: actionTypes.RESET_SEARCH,
    callback,
  };
};
