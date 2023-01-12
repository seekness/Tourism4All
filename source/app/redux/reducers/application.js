import {actionTypes} from '@actions';

const initialState = {
  domain: null,
  theme: null,
  font: null,
  force_dark: null,
  language: null,
  setting: null,
  device: null,
  onboard: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_THEME:
      return {
        ...state,
        theme: action?.theme,
      };

    case actionTypes.CHANGE_FONT:
      return {
        ...state,
        font: action?.font,
      };

    case actionTypes.FORCE_APPEARANCE:
      return {
        ...state,
        force_dark: action?.force_dark,
      };

    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action?.language,
      };

    case actionTypes.SAVE_DOMAIN:
      return {
        ...state,
        domain: action?.domain,
      };

    case actionTypes.SAVE_DEVICE_INFO:
      return {
        ...state,
        device: {
          ...state.device,
          ...action?.device,
        },
      };

    case actionTypes.SAVE_SETTING:
      return {
        ...state,
        setting: {
          ...state.setting,
          ...action?.setting,
        },
      };

    case actionTypes.SAVE_ONBOARD:
      return {
        ...state,
        onboard: action.onboard,
      };

    case actionTypes.CHANGE_LISTING_STYLE:
      return {
        ...state,
        listing: action.style,
      };
    default:
      return state;
  }
};
