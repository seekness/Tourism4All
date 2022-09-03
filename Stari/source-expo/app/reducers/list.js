import * as actionTypes from '@actions/actionTypes';
const initialState = {
  list: [],
  pagination: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SAVE_LIST:
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
    case actionTypes.ON_UPDATE_LIST:
      const exist = state.list.some(item => item.id === action.item.id);
      if (exist) {
        return {
          ...state,
          list: state.list.map(item => {
            if (item.id === action.item.id) {
              return action.item;
            }
            return item;
          }),
        };
      }
      break;

    default:
      return state;
  }
};
