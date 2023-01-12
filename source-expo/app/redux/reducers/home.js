import {actionTypes} from '@actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_HOME:
      return {
        ...state,
        ...action?.home,
      };

    default:
      return state;
  }
};
