import {actionTypes} from '@actions';

export const onLoad = (item, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_REVIEW,
    item,
    callback,
  };
};

export const onAdd = (params, callback = () => {}) => {
  return {
    type: actionTypes.ADD_REVIEW,
    params,
    callback,
  };
};

export const onReset = (callback = () => {}) => {
  return {
    type: actionTypes.RESET_REVIEW,
    callback,
  };
};

export const onLoadAuthor = (params, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_AUTHOR_REVIEW,
    params,
    callback,
  };
};
