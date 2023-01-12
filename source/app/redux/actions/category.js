import {actionTypes} from '@actions';

export const onLoad = (item, keyword, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_CATEGORY_LIST,
    item,
    keyword,
    callback,
  };
};

export const onLoadLocation = (item, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_LOCATION,
    item,
    callback,
  };
};
