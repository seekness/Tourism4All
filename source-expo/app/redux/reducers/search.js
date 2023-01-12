import {actionTypes} from '@actions';

const initialState = {
  data: [],
  history: null,
  pagination: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_SEARCH:
      return {
        ...state,
        data: action.data,
        pagination: action.pagination,
      };

    case actionTypes.RESET_SEARCH:
      return initialState;

    default:
      return state;
  }
};
