import {actionTypes} from '@actions';
import {INIT_SUBMIT, INIT_SUBMIT_SETTING, LOAD_TAGS} from './actionTypes';

export const onLoad = (params, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_LISTING,
    params,
    callback,
  };
};

export const onLoadMore = (params, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_MORE_LISTING,
    params,
    callback,
  };
};

export const onReset = (callback = () => {}) => {
  return {
    type: actionTypes.RESET_LISTING,
    callback,
  };
};

export const onDetail = (item, callback = () => {}) => {
  return {
    type: actionTypes.LISTING_DETAIL,
    item,
    callback,
  };
};

export const onLoadAuthor = (params, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_AUTHOR_LISTING,
    params,
    callback,
  };
};

export const onDelete = (item, callback = () => {}) => {
  return {
    type: actionTypes.DELETE_LISTING_ITEM,
    item,
    callback,
  };
};

export const initSubmit = (item, callback = () => {}) => {
  return {
    type: actionTypes.INIT_SUBMIT_SETTING,
    item,
    callback,
  };
};

export const onSubmit = (params, callback = () => {}) => {
  return {
    type: actionTypes.SUBMIT,
    params,
    callback,
  };
};

export const loadTags = (keyword, callback = () => {}) => {
  return {
    type: actionTypes.LOAD_TAGS,
    keyword,
    callback,
  };
};
