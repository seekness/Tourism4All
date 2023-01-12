import {actionTypes} from '@actions';

export const onLogin = (params, callback = () => {}) => {
  return {
    type: actionTypes.LOGIN,
    params,
    callback,
  };
};

export const onRegister = (params, callback = () => {}) => {
  return {
    type: actionTypes.REGISTER,
    params,
    callback,
  };
};

export const onForgot = (params, callback = () => {}) => {
  return {
    type: actionTypes.FORGOT,
    params,
    callback,
  };
};

export const onLogout = (callback = () => {}) => {
  return {
    type: actionTypes.LOGOUT,
    callback,
  };
};

export const onDeactivate = (callback = () => {}) => {
  return {
    type: actionTypes.DEACTIVATE,
    callback,
  };
};

export const onExpire = (callback = () => {}) => {
  return {
    type: actionTypes.EXPIRE_TOKEN,
    callback,
  };
};

export const onEditProfile = (params, callback = () => {}) => {
  return {
    type: actionTypes.EDIT_PROFILE,
    params,
    callback,
  };
};

export const onChangePassword = (params, callback = () => {}) => {
  return {
    type: actionTypes.CHANGE_PASSWORD,
    params,
    callback,
  };
};
