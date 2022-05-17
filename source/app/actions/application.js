import * as actionTypes from './actionTypes';

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

export const forceTheme = force_dark => {
  return {
    type: actionTypes.FORCE_APPEARANCE,
    force_dark,
  };
};

export const changeLanguge = language => {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
    language,
  };
};
