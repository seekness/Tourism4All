import {actionTypes} from '@actions';

export const onLoad = (callback = () => {}) => {
  return {
    type: actionTypes.LOAD_DISCOVERY,
    callback,
  };
};
