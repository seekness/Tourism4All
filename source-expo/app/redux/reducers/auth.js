import {actionTypes} from '@actions';
const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action?.type) {
    case actionTypes.SAVE_USER:
      return {
        ...state,
        user: {...state.user, ...action.user},
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
