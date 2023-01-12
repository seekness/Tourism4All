import * as actionTypes from './actionTypes';

export const onLoadList = (filter, page, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_LIST,
    filter,
    page,
    callback,
  };
};

export const onUpdate = item => {
  return {
    type: actionTypes.ON_UPDATE_LIST,
    item,
  };
};
