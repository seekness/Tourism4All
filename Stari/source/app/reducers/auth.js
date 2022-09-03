import * as actionTypes from '@actions/actionTypes';
const initialState = {
  user: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: {
          ...action.user,
          token: state.user.token,
        },
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
