import {actionTypes} from '@actions';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_DISCOVERY:
      return action.data;

    default:
      return state;
  }
};
