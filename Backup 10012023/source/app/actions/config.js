import * as actionTypes from './actionTypes';

export const onSetup = (domain, user, callback) => {
  return {
    type: actionTypes.SETUP_CONFIG,
    domain,
    user,
    callback,
  };
};
