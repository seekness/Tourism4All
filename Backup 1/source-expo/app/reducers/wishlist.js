import * as actionTypes from '@actions/actionTypes';
const initialState = {
  list: null,
  pagination: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SAVE_WISHLIST:
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

    case actionTypes.ON_UPDATE_WISHLIST:
      const exist = state.list.some(item => item.id === action.item.id);
      if (exist) {
        return {
          ...state,
          list: state.list.filter(item => {
            return item.id !== action.item.id;
          }),
        };
      }
      return {
        ...state,
        list: state.list.concat(action.item),
      };
    default:
      return state;
  }
};
