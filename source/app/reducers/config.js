import * as actionTypes from '@actions/actionTypes';

const initialState = {
  url: null,
  setting: null,
  device: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SAVE_URL:
      return {
        ...state,
        url: action.url,
      };
    case actionTypes.SAVE_SETTING:
      return {
        ...state,
        setting: action.setting,
      };
    case actionTypes.SAVE_DEVICE_INFO:
      return {
        ...state,
        device: action.device,
      };
    case actionTypes.SAVE_DEVICE_TOKEN:
      return {
        ...state,
        device: {
          ...state.device,
          token: action.token,
        },
      };
    default:
      return state;
  }
};
