import * as actionTypes from './actionTypes';

export const onLogin = (params, callback = () => {}) => {
  return {
    type: actionTypes.LOGIN,
    params,
    callback,
  };
};

export const onEditProfile = (params, callback = () => {}) => {
  return {
    type: actionTypes.ON_UPDATE_PROFILE,
    params,
    callback,
  };
};

export const onLogout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const onValid = (callback = () => {}) => {
  return {
    type: actionTypes.VALID_TOTEN,
    callback,
  };
};
