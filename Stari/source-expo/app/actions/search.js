import * as actionTypes from './actionTypes';

export const onSearch = (params, callback = () => {}) => {
  return {
    type: actionTypes.ON_SEARCH,
    params,
    callback,
  };
};

export const onSaveHistory = item => {
  return {
    type: actionTypes.ON_SAVE_HISTORY,
    item,
  };
};

export const onClear = () => {
  return {
    type: actionTypes.ON_CLEAR_HISTORY,
  };
};
