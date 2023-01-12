import {actionTypes} from '@actions';

const initialState = {
  data: null,
  pagination: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_WISHLIST:
      return {
        ...state,
        data: action.data,
        pagination: action.pagination,
      };

    case actionTypes.RESET_WISHLIST:
      return initialState;

    default:
      return state;
  }
};
