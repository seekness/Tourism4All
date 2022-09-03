import * as actionTypes from '@actions/actionTypes';
const initialState = {
  list: [],
  pagination: null,
  history: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.ON_SAVE_SEARCH:
      if (action.pagination.page > 1) {
        return {
          ...state,
          list: state.list.concat(action.list),
          pagination: action.pagination,
        };
      }
      return {
        ...state,
        list: action.list,
        pagination: action.pagination,
      };
    case actionTypes.ON_SAVE_HISTORY:
      const exist = state.history.some(item => item.id === action.item.id);
      if (!exist) {
        return {
          ...state,
          history: state.history.concat(action.item),
        };
      }
      return state;
    case actionTypes.ON_CLEAR_HISTORY:
      return {
        ...state,
        history: [],
      };
    default:
      return state;
  }
};
