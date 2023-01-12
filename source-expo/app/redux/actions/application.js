import {actionTypes} from '@actions';

export const start = (callback = () => {}) => {
  return {
    type: actionTypes.START_APPLICATION,
    callback,
  };
};

export const changeTheme = theme => {
  return {
    type: actionTypes.CHANGE_THEME,
    theme,
  };
};

export const changeFont = font => {
  return {
    type: actionTypes.CHANGE_FONT,
    font,
  };
};

export const changeDarkMode = force_dark => {
  return {
    type: actionTypes.FORCE_APPEARANCE,
    force_dark,
  };
};

export const changeListingStyle = style => {
  return {
    type: actionTypes.CHANGE_LISTING_STYLE,
    style,
  };
};

export const changeLanguage = language => {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
    language,
  };
};

export const changeDomain = (domain, callback = () => {}) => {
  return {
    type: actionTypes.CHANGE_DOMAIN,
    domain,
    callback,
  };
};

export const clearStorage = () => {
  return {
    type: actionTypes.CLEAR_REDUCER,
  };
};
