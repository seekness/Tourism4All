import * as actionTypes from '@actions/actionTypes';
const initialState = {
  sliders: [],
  categories: [],
  locations: [],
  recents: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SAVE_HOME_DATA:
      return {
        ...state,
        sliders: action.sliders ?? [],
        categories: action.categories ?? [],
        locations: action.locations ?? [],
        recents: action.recents ?? [],
      };
    default:
      return state;
  }
};
