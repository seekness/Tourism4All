import {actionTypes} from '@actions';

const initialState = {
  data: null,
  summary: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_REVIEW:
      return {
        ...state,
        data: action.data,
        summary: action.summary,
      };

    case actionTypes.RESET_REVIEW:
      return initialState;

    default:
      return state;
  }
};
